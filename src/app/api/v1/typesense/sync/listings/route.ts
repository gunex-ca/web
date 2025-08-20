import { NextResponse } from "next/server";
import { request } from "~/app/api/middleware";

export const GET = request().handle(async (ctx) => {
  const listings = await ctx.db.query.listing.findMany({
    where: (listing, { eq }) => eq(listing.status, "active"),
    with: {
      seller: true,
      external: true,
    },
  });

  return NextResponse.json({ listings });
});
