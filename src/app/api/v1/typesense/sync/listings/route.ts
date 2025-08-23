import { NextResponse } from "next/server";
import { request } from "~/app/api/middleware";
import { syncListings, deleteStaleListings } from "~/server/typesense/listings";

export const GET = request().handle(async () => {
  await syncListings();
  await deleteStaleListings();

  return NextResponse.json({ success: true });
});
