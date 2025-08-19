import { and, eq } from "drizzle-orm";

import { List, Locate, MessageCircleMore } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { StarRating } from "~/app/(search)/listings/[listing]/_components/SellersSection";
import { Button } from "~/components/ui/button";
import { cn } from "~/components/utils";
import { findPostalCode } from "~/lib/location/postal-codes";
import { db } from "~/server/db";
import * as schema from "~/server/db/schema";

export default async function ProfilePage({
  params,
  searchParams,
}: {
  searchParams: Promise<{ tab: string }>;
  params: Promise<{ username: string }>;
}) {
  const { username } = await params;
  const user = await db.query.user.findFirst({
    where: eq(schema.user.username, username),
  });

  const { tab = "active" } = await searchParams;
  if (!user) return notFound();

  const postalCode =
    user.postalCode == null || user.postalCode === ""
      ? null
      : findPostalCode(user.postalCode ?? "");

  const activeListings = await db.query.listing.findMany({
    where: and(
      eq(schema.listing.sellerId, user.id),
      eq(schema.listing.status, "active")
    ),
  });

  const soldListings = await db.query.listing.findMany({
    where: and(
      eq(schema.listing.sellerId, user.id),
      eq(schema.listing.status, "sold")
    ),
    limit: 50,
  });

  const listings = tab === "active" ? activeListings : soldListings;

  return (
    <>
      <div className="relative">
        <div className="flex items-center border-border/40 border-b">
          <Link
            href={`/profile/${username}`}
            className={cn(
              "-mb-px relative inline-flex items-center border-b-2 px-4 py-3 font-medium text-sm transition-all duration-200 hover:text-foreground",
              tab === "active"
                ? "border-primary font-semibold text-primary"
                : "border-transparent text-muted-foreground hover:border-border hover:text-foreground"
            )}
          >
            <span className="whitespace-nowrap">
              Active ({activeListings.length})
            </span>
          </Link>

          <Link
            href={`/profile/${username}?tab=sold`}
            className={cn(
              "-mb-px relative inline-flex items-center border-b-2 px-4 py-3 font-medium text-sm transition-all duration-200 hover:text-foreground",
              tab === "sold"
                ? "border-primary font-semibold text-primary"
                : "border-transparent text-muted-foreground hover:border-border hover:text-foreground"
            )}
          >
            <span className="whitespace-nowrap">Sold</span>
          </Link>
        </div>
      </div>
      <div className="mt-6">
        <div className="space-y-4">
          {listings.map((listing) => (
            <div key={listing.id} className="rounded-lg border p-4">
              <h2 className="font-semibold text-lg">{listing.title}</h2>
            </div>
          ))}

          {listings.length === 0 && (
            <p className="py-12 text-center text-muted-foreground">
              No listings found
            </p>
          )}
        </div>
      </div>
    </>
  );
}
