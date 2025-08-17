import { TRPCError } from "@trpc/server";
import { and, eq } from "drizzle-orm";
import { z } from "zod";
import { auth } from "~/lib/auth";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import * as schema from "~/server/db/schema";
import { listingInsertSchema } from "~/server/db/schema";
import { takeFirst } from "~/server/db/utils";

export const listingRouter = createTRPCRouter({
  create: protectedProcedure
    .input(listingInsertSchema)
    .mutation(async ({ ctx, input }) => {
      return ctx.db
        .insert(schema.listing)
        .values({ ...input, sellerId: ctx.session.user.id })
        .returning()
        .then(takeFirst);
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
      if (!draft.category) errors.push("Category is required");
      if (!draft.price || Number(draft.price) <= 0)
        errors.push("Price must be greater than 0");
      if (!draft.province) errors.push("Province is required");
      if (!draft.city || draft.city.trim().length < 2)
        errors.push("City is required");

      if (draft.category === "firearm") {
        if (!draft.firearmType)
          errors.push("Firearm type is required for firearm listings");
        if (!draft.firearmClass)
          errors.push("Firearm class is required for firearm listings");
        if (!draft.images || draft.images.length < 1)
          errors.push("At least one image is required for firearm listings");
      }

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

  getNewest: publicProcedure.query(async ({ ctx }) => {
    return ctx.db.query.listing.findMany({
      with: { images: true },
      orderBy: (listing, { desc }) => [desc(listing.createdAt)],
      limit: 10,
    });
  }),

  getByPublicId: publicProcedure
    .input(
      z.object({
        publicId: z.string().min(1),
      }),
    )
    .query(async ({ ctx, input }) => {
      return ctx.db.query.listing.findFirst({
        where: (listing, { eq }) => eq(listing.publicId, input.publicId),
        with: { images: true },
      });
    }),
});
