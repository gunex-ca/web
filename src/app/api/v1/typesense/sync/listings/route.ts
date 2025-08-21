import { NextResponse } from "next/server";
import { request } from "~/app/api/middleware";
import { syncListings } from "~/server/typesense/listings";

export const GET = request().handle(async () => {
  await syncListings();

  return NextResponse.json({ success: true });
});
