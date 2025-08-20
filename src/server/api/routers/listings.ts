import { TRPCError } from "@trpc/server";
import { and, eq, inArray } from "drizzle-orm";
import { v4 as uuidv4 } from "uuid";
import { z } from "zod";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import * as schema from "~/server/db/schema";
import { listingInsertSchema } from "~/server/db/schema";
import { takeFirst } from "~/server/db/utils";

// Input schema for creating listings (excludes auto-generated fields)
const createListingInputSchema = listingInsertSchema.omit({
  id: true,
  publicId: true,
  sellerId: true,
  createdAt: true,
  updatedAt: true,
  imported: true,
  importedAt: true,
});

import { createPresignedPost } from "@aws-sdk/s3-presigned-post";
import { env } from "~/env";
import { categories } from "~/lib/categories";
import { findPostalCode } from "~/lib/location/postal-codes";
import { s3 } from "~/server/s3";

const MAX_IMAGE_BYTES = 10 * 1024 * 1024; // 10MB
const IMAGE_EXPIRATION_SECONDS = 60 * 15; // 15 minutes

export const listingRouter = createTRPCRouter({
  create: protectedProcedure
    .input(createListingInputSchema)
    .mutation(async ({ ctx, input }) => {
      const listing = await ctx.db
        .insert(schema.listing)
        .values({ ...input, sellerId: ctx.session.user.id })
        .returning()
        .then(takeFirst);

      return listing;
    }),

  publish: protectedProcedure
    .input(
      z.object({
        publicId: z.string().min(1),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      // Fetch listing with images for validation
      const draft = await ctx.db.query.listing.findFirst({
        where: (listing, { and, eq }) =>
          and(
            eq(listing.publicId, input.publicId),
            eq(listing.sellerId, ctx.session.user.id),
          ),
        with: { images: true },
      });

      if (!draft) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Listing not found",
        });
      }

      if (draft.status !== "draft") {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Only draft listings can be published",
        });
      }

      // Basic validation rules for publishing
      const errors: string[] = [];
      if (!draft.title || draft.title.trim().length < 3)
        errors.push("Title is required");
      if (!draft.subCategoryId) errors.push("Category is required");

      if (errors.length) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: errors.join(", "),
        });
      }

      const updated = await ctx.db
        .update(schema.listing)
        .set({ status: "active", updatedAt: new Date() })
        .where(
          and(
            eq(schema.listing.publicId, input.publicId),
            eq(schema.listing.sellerId, ctx.session.user.id),
          ),
        )
        .returning();

      return takeFirst(updated);
    }),

  getNewest: publicProcedure
    .input(
      z.object({
        limit: z.number().optional(),
        categoryId: z.string().optional(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const category = categories.find((c) => c.id === input.categoryId);

      return ctx.db.query.listing
        .findMany({
          where: and(
            eq(schema.listing.status, "active"),
            category
              ? inArray(
                  schema.listing.subCategoryId,
                  category.children.map((s) => s.id),
                )
              : undefined,
          ),
          with: { images: true, seller: true, external: true },
          orderBy: (listing, { desc }) => [desc(listing.createdAt)],
          limit: input.limit ?? 50,
        })
        .then((listings) =>
          listings.map((listing) => {
            const pc =
              listing.seller?.postalCode ?? listing.external?.postalCode;
            const location = findPostalCode(pc ?? "");
            return {
              ...listing,
              postalCode: pc,
              location:
                location != null
                  ? `${location?.city}, ${location?.province}`
                  : null,
            };
          }),
        );
    }),

  getByPublicId: publicProcedure
    .input(z.object({ publicId: z.string().min(1) }))
    .query(async ({ ctx, input }) => {
      return ctx.db.query.listing.findFirst({
        where: (listing, { eq }) => eq(listing.publicId, input.publicId),
        with: { images: true, seller: true },
      });
    }),

  getImagePresignedPost: protectedProcedure
    .input(
      z.object({
        contentType: z.enum(["image/jpeg", "image/png", "image/webp"]),
        alt: z.string().min(1),
        name: z.string().min(1),
        listingId: z.string().min(1),
        sortOrder: z.number(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const id = uuidv4();
      const objectKey = `${env.NODE_ENV}/raw/${id}`;
      const image = await ctx.db
        .insert(schema.listingImage)
        .values({ ...input, id, status: "pending", objectKey })
        .returning()
        .then(takeFirst);

      const { contentType } = input;
      const presignedUrl = await createPresignedPost(s3, {
        Key: objectKey,
        Bucket: env.LISTING_IMAGES_BUCKET,
        Conditions: [
          ["content-length-range", 0, MAX_IMAGE_BYTES],
          ["starts-with", "$Content-Type", "image/"],
        ],
        Expires: IMAGE_EXPIRATION_SECONDS,
        Fields: {
          "Content-Type": contentType,
          "x-amz-meta-origin": "trpc",
          acl: "public-read",
        },
      });

      return { image, presignedUrl };
    }),
});
