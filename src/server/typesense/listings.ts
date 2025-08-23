import { snakeCase } from "change-case";
import type { SQL } from "drizzle-orm";
import { convert } from "html-to-text";
import { CATEGORY } from "~/lib/categories";
import { findPostalCode } from "~/lib/location/postal-codes";
import { db } from "../db";
import { listing } from "../db/schema";
import { typesense } from "./client";
import type { ListingV1 } from "./schemas";

export async function syncListings(where?: SQL<unknown>) {
  const listings = await db.query.listing.findMany({
    where,
    with: {
      seller: true,
      images: true,
      external: true,
    },
  });

  if (listings.length === 0) {
    return;
  }

  const listingsV1: ListingV1[] = [];
  for (const listing of listings) {
    const pc = listing.seller?.postalCode ?? listing.external?.postalCode;
    if (!pc) continue;
    const location = findPostalCode(pc);
    if (!location || location.latitude === null || location.longitude === null)
      continue;

    const sellerRating = listing.external?.sellerRating;
    const subCategory = CATEGORY[listing.subCategoryId];

    if (!subCategory) continue;
    if ("children" in subCategory) continue;

    const listingV1: ListingV1 = {
      id: listing.id,
      public_id: listing.publicId,
      category: subCategory.parent.id,
      sub_category: subCategory.id,

      seller_id: listing.sellerId ?? undefined,
      seller_rating: sellerRating != null ? Number(sellerRating) : undefined,
      seller_reviews: listing.external?.sellerReviews ?? undefined,

      views: 0,
      favorites: 0,

      title: listing.title,
      description_text: convert(listing.description ?? ""),

      price: Number.parseFloat(listing.price as string),

      location: [location.latitude, location.longitude] as [number, number],
      province: location.province,
      city: location.city,
      postal_code: pc,

      status: listing.status,
      display_ordering: listing.displayOrdering,
      created_at: listing.createdAt.getTime(),
      updated_at: listing.updatedAt.getTime(),

      external_platform: listing.external?.platform,
      external_url: listing.external?.url ?? undefined,

      has_images: listing.images.length > 0,
      image_count: listing.images.length,
    };

    const properties = listing.properties as Record<string, unknown>;
    for (const [key, value] of Object.entries(properties)) {
      listingV1[snakeCase(key)] = value;
    }

    listingsV1.push(listingV1);
  }

  const upsertResponse = await typesense
    .collections("listing_v1")
    .documents()
    .import(listingsV1, { action: "upsert" });

  return { listingsV1, count: listingsV1.length, upsertResponse };
}

export async function deleteStaleListings() {
  // Step 1: Get all document IDs from Typesense
  console.log("Fetching all Typesense listing IDs...");
  const collection = typesense.collections<ListingV1>("listing_v1");

  // Export all documents to get their IDs
  const exportResponse = await collection.documents().export();

  // Parse the JSONL response to extract IDs
  const typesenseIds = exportResponse
    .split("\n")
    .filter((line) => line.trim() !== "")
    .map((line) => {
      try {
        const doc = JSON.parse(line) as ListingV1;
        return doc.id;
      } catch (e) {
        console.warn("Failed to parse Typesense document:", line);
        return null;
      }
    })
    .filter((id): id is string => id !== null);

  console.log(`Found ${typesenseIds.length} listings in Typesense`);

  // Step 2: Get all listing IDs from database
  console.log("Fetching all database listing IDs...");
  const databaseListings = await db.select({ id: listing.id }).from(listing);
  const databaseIds = new Set(databaseListings.map((l) => l.id));

  console.log(`Found ${databaseIds.size} listings in database`);

  // Step 3: Find IDs that are in Typesense but not in database
  const idsToDelete = typesenseIds.filter((id) => !databaseIds.has(id));

  console.log(`Found ${idsToDelete.length} stale listings to delete`);

  if (idsToDelete.length === 0) {
    return { deleted: 0, batches: 0 };
  }

  for (const id of idsToDelete) {
    const r = await collection.documents(id).delete();
    console.log(r);
  }

  return {
    deleted: idsToDelete.length,
    staleIds: idsToDelete,
  };
}
