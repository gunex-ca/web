import { TRPCError } from "@trpc/server";
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

  getNewest: publicProcedure.query(async ({ ctx }) => {
    return ctx.db.query.listing.findMany({
      with: { images: true },
      orderBy: (listing, { desc }) => [desc(listing.createdAt)],
      limit: 10,
    });
  }),
});
