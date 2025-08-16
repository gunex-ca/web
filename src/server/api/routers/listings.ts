import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import * as schema from "~/server/db/schema";

export const listingRouter = createTRPCRouter({
  create: publicProcedure
    .input(z.object({ name: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {}),

  getLatest: publicProcedure.query(async ({ ctx }) => {
    const post = await ctx.db.query.listing.findFirst({
      with: {
        images: true,
      },
      orderBy: (listing, { desc }) => [desc(listing.createdAt)],
    });

    return post ?? null;
  }),
});
