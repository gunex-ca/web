import { PutObjectCommand } from "@aws-sdk/client-s3";
import { and, eq, inArray } from "drizzle-orm";
import { NextResponse } from "next/server";
import { isPresent } from "ts-is-present";
import { v4 as uuidv4 } from "uuid";
import { z } from "zod/v4";
import { env } from "~/env";
import { CATEGORY } from "~/lib/categories";
import * as schema from "~/server/db/schema";
import {
  listing,
  listingExternal,
  listingImage,
} from "~/server/db/schema/listing";
import { takeFirst, takeFirstOrNull } from "~/server/db/utils";
import { s3 } from "~/server/s3";
import { syncListings } from "~/server/typesense/listings";
import { parseBody, request } from "../../middleware";

const externalListingUpsertSchema = z.object({
  subCategoryId: z.string().refine((id) => CATEGORY[id] != null, {
    message: "Invalid sub-category ID",
  }),
  title: z.string().max(255),
  description: z.string().optional(),
  price: z.number().optional(), // Will be converted to numeric
  properties: z.record(z.string(), z.any()).optional(),
  status: z
    .enum(["draft", "active", "sold", "archived", "removed"])
    .default("active"),
  createdAt: z.string().optional(),

  external: z.object({
    platform: z.literal("gunpost"),
    externalId: z.string(),
    url: z.string().max(2048).optional(),
    meta: z.record(z.string(), z.any()).optional(),
    imageUrls: z.array(z.url()).min(1).optional(),
    postalCode: z.string().optional(),
    sellerUsername: z.string().optional(),
    sellerRating: z.number().optional(),
    sellerReviews: z.number().optional(),
  }),
});

const externalListingUpsertPayload = z.array(externalListingUpsertSchema);

// Helper function to download image from URL
async function downloadImage(
  url: string,
): Promise<{ buffer: Buffer; contentType: string }> {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch image: ${response.statusText}`);
    }

    const contentType = response.headers.get("content-type") || "image/jpeg";

    // Validate content type
    const validTypes = ["image/jpeg", "image/png", "image/webp", "image/jpg"];
    if (!validTypes.some((type) => contentType.includes(type))) {
      throw new Error(`Invalid content type: ${contentType}`);
    }

    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    return { buffer, contentType };
  } catch (error) {
    throw new Error(
      `Failed to download image from ${url}: ${
        error instanceof Error ? error.message : "Unknown error"
      }`,
    );
  }
}

// Helper function to upload image to S3
async function uploadImageToS3(
  imageBuffer: Buffer,
  contentType: string,
  objectKey: string,
): Promise<void> {
  try {
    const command = new PutObjectCommand({
      Bucket: env.LISTING_IMAGES_BUCKET,
      Key: objectKey,
      Body: imageBuffer,
      ContentType: contentType,
      ACL: "public-read",
    });

    await s3.send(command);
  } catch (error) {
    throw new Error(
      `Failed to upload to S3: ${
        error instanceof Error ? error.message : "Unknown error"
      }`,
    );
  }
}

// Helper function to process images from URLs
async function processImages(
  externalUrl: string | undefined,
  imageUrls: string[],
  listingId: string,
  db: typeof import("~/server/db").db,
): Promise<Array<typeof listingImage.$inferSelect>> {
  const imageRecords: Array<typeof listingImage.$inferSelect> = [];

  // First, get existing images for this listing to avoid duplicates
  const existingImages = await db.query.listingImage.findMany({
    where: eq(listingImage.listingId, listingId),
  });

  // Create a set of existing image URLs for quick lookup
  const existingUrls = new Set(
    existingImages
      .map((img) => img.name)
      .filter((name) => name?.startsWith("url:"))
      .map((name) => (name as string).substring(4)), // Remove "url:" prefix
  );

  let currentSortOrder = existingImages.length; // Start from the next available sort order

  for (const [index, imageUrl] of imageUrls.entries()) {
    // Skip if this URL has already been processed
    if (existingUrls.has(imageUrl)) {
      console.log(`Skipping duplicate image URL: ${imageUrl}`);
      continue;
    }

    try {
      // Download the image
      const { buffer, contentType } = await downloadImage(imageUrl);

      // Generate unique ID and object key
      const imageId = uuidv4();
      const objectKey = `${env.NODE_ENV}/raw/${imageId}`;

      // Upload to S3
      await uploadImageToS3(buffer, contentType, objectKey);

      // Create database record with URL in alt field for duplicate detection
      const imageRecord = await db
        .insert(listingImage)
        .values({
          id: imageId,
          listingId: listingId,
          objectKey: objectKey,
          name: `url:${imageUrl}`, // Store URL for duplicate detection
          sortOrder: currentSortOrder,
          status: "uploaded",
        })
        .returning()
        .then(takeFirstOrNull);

      if (imageRecord) {
        imageRecords.push(imageRecord);
        existingUrls.add(imageUrl); // Add to set to avoid processing again in this batch
        currentSortOrder++; // Increment for next image
      }
    } catch (error) {
      console.log(`Failed to process image ${index + 1} from ${imageUrl}`);
      console.log(externalUrl);
      console.log(error.message);
      // Continue processing other images even if one fails
    }
  }

  return imageRecords;
}

// Type definitions for better readability
type ListingUpsertItem = z.infer<typeof externalListingUpsertSchema>;
type UpsertResult = {
  action: "created" | "updated" | "error";
  listing?: typeof listing.$inferSelect;
  externalListing?: typeof listingExternal.$inferSelect;
  images?: Array<typeof listingImage.$inferSelect>;
  error?: string;
  input?: ListingUpsertItem;
};
type DatabaseContext = typeof import("~/server/db").db;

// Helper function to find existing external listing
async function findExistingExternal(
  item: ListingUpsertItem,
  db: DatabaseContext,
) {
  return item.external.externalId
    ? await db.query.listingExternal.findFirst({
        where: and(
          eq(listingExternal.platform, item.external.platform),
          eq(listingExternal.externalId, item.external.externalId),
        ),
        with: {
          listing: true,
        },
      })
    : null;
}

// Helper function to update existing listing and external record
async function updateExistingListing(
  item: ListingUpsertItem,
  existingExternal: NonNullable<
    Awaited<ReturnType<typeof findExistingExternal>>
  >,
  db: DatabaseContext,
): Promise<{
  listing: typeof listing.$inferSelect;
  externalListing: typeof listingExternal.$inferSelect;
  images: Array<typeof listingImage.$inferSelect>;
}> {
  // Update existing listing
  const updatedListing = await db
    .update(listing)
    .set({
      title: item.title,
      description: item.description,
      price: item.price?.toString(),
      properties: item.properties,
      status: item.status,
      subCategoryId: item.subCategoryId,
      updatedAt: new Date(),
    })
    .where(eq(listing.id, existingExternal.listingId))
    .returning()
    .then(takeFirstOrNull);

  // Update external listing record
  const updatedExternalRecord = await db
    .update(listingExternal)
    .set({
      url: item.external.url,
      meta: item.external.meta,
      lastSyncedAt: new Date(),
    })
    .where(eq(listingExternal.id, existingExternal.id))
    .returning()
    .then(takeFirstOrNull);

  if (!updatedListing || !updatedExternalRecord) {
    throw new Error("Failed to update existing listing or external record");
  }

  // Process images if provided
  const images =
    item.external.imageUrls && item.external.imageUrls.length > 0
      ? await processImages(
          item.external.url,
          item.external.imageUrls,
          updatedListing.id,
          db,
        )
      : [];

  return {
    listing: updatedListing,
    externalListing: updatedExternalRecord,
    images,
  };
}

// Helper function to create new listing and external record
async function createNewListing(
  item: ListingUpsertItem,
  db: DatabaseContext,
): Promise<{
  listing: typeof listing.$inferSelect;
  externalListing: typeof listingExternal.$inferSelect;
  images: Array<typeof listingImage.$inferSelect>;
}> {
  // Create new listing
  const newListing = await db
    .insert(listing)
    .values({
      subCategoryId: item.subCategoryId,
      title: item.title,
      description: item.description,
      price:
        item.price !== undefined && item.price !== null
          ? item.price.toString()
          : "0",
      properties: item.properties,
      status: item.status,
      createdAt: item.createdAt ? new Date(item.createdAt) : new Date(),
      // displayOrdering: new Date(),
    })
    .returning()
    .then(takeFirst);

  if (!newListing) {
    throw new Error("Failed to create listing");
  }

  // Create external listing record
  const newExternalRecord = await db
    .insert(listingExternal)
    .values({
      listingId: newListing.id,
      ...item.external,
      sellerRating: item.external.sellerRating?.toString(),
      lastSyncedAt: new Date(),
    })
    .returning()
    .then(takeFirst);

  // Process images if provided
  const images =
    item.external.imageUrls && item.external.imageUrls.length > 0
      ? await processImages(
          item.external.url,
          item.external.imageUrls,
          newListing.id,
          db,
        )
      : [];

  return {
    listing: newListing,
    externalListing: newExternalRecord,
    images,
  };
}

// Helper function to process a single listing item
async function processListingItem(
  item: ListingUpsertItem,
  db: DatabaseContext,
): Promise<UpsertResult> {
  try {
    const existingExternal = await findExistingExternal(item, db);

    if (existingExternal) {
      const { listing, externalListing, images } = await updateExistingListing(
        item,
        existingExternal,
        db,
      );
      return {
        action: "updated",
        listing,
        externalListing,
        images,
      };
    }

    const { listing, externalListing, images } = await createNewListing(
      item,
      db,
    );
    return {
      action: "created",
      listing,
      externalListing,
      images,
    };
  } catch (error) {
    console.error("Error processing listing item:", error);
    return {
      action: "error",
      error: error instanceof Error ? error.message : "Unknown error",
      input: item,
    };
  }
}

export const POST = request()
  .use(parseBody(externalListingUpsertPayload))
  .handle<{
    body: z.infer<typeof externalListingUpsertPayload>;
  }>(async (ctx) => {
    const upsertResults: UpsertResult[] = [];

    for (const item of ctx.body) {
      const result = await processListingItem(item, ctx.db);
      upsertResults.push(result);
    }

    const ids = upsertResults
      .map((result) => result.listing?.id)
      .filter(isPresent);

    await syncListings(inArray(schema.listing.id, ids));

    return NextResponse.json({
      success: true,
      results: upsertResults,
      processed: upsertResults.length,
    });
  });
