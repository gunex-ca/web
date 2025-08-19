import { z } from "zod";
import { findPostalCode } from "~/lib/location/postal-codes";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const locationRouter = createTRPCRouter({
  getPostalCode: publicProcedure
    .input(z.object({ postalCode: z.string() }))
    .query(async ({ input }) => {
      const { postalCode } = input;
      const location = findPostalCode(postalCode);
      return location ?? null;
    }),
});
