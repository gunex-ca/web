import { NextResponse } from "next/server";
import { request } from "~/app/api/middleware";
import { deleteStaleListings, syncListings } from "~/server/typesense/listings";

export const GET = request().handle(async () => {
  await syncListings();
  await deleteStaleListings();

  return NextResponse.json({ success: true });
});
