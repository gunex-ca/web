import { eq } from "drizzle-orm";
import { z } from "zod";
import { db } from "~/server/db";
import * as schema from "~/server/db/schema";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const userRouter = createTRPCRouter({
  updateUser: protectedProcedure
    .input(
      z
        .object({
          username: z.string(),
          postalCode: z.string(),
          showPartialPostalCode: z.boolean(),
        })
        .partial(),
    )
    .mutation(async ({ ctx, input }) => {
      const { postalCode, username } = input;
      const userId = ctx.session.user.id;

      await db
        .update(schema.user)
        .set({ postalCode, username })
        .where(eq(schema.user.id, userId));

      return { success: true };
    }),
});
