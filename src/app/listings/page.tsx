import type { Metadata } from "next";
import { ListingSearchInput } from "~/components/ListingSerachInput";
import { Separator } from "~/components/ui/separator";
import {
  type ListingsSearchParams,
  parseListingsSearchParams,
} from "~/hooks/listings-search-params-schema";
import Navbar from "../_components/Navbar";
import { ClearFiltersButton } from "./_components/ClearFiltersButton";
import { DistanceFilter } from "./_components/DistanceFilter";
import { ListingCard } from "./_components/ListingCard";
import { PriceFilter } from "./_components/PriceFilter";

import { inArray } from "drizzle-orm";
import { findPostalCode } from "~/lib/location/postal-codes";
import { db } from "~/server/db";
import * as schema from "~/server/db/schema";
import { api } from "~/trpc/server";
import { FilterBadges } from "./_components/FilterBadges";

export default async function ListingsPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  // Parse search params with type safety and defaults
  const rawSearchParams = await searchParams;
  const urlSearchParams = new URLSearchParams();

  // Convert the raw search params to URLSearchParams format
  for (const [key, value] of Object.entries(rawSearchParams)) {
    if (value !== undefined) {
      if (Array.isArray(value)) {
        urlSearchParams.set(key, value[0] ?? "");
      } else {
        urlSearchParams.set(key, value);
      }
    }
  }

  const typedSearchParams: ListingsSearchParams =
    parseListingsSearchParams(urlSearchParams);

  const searchListings = await api.search.listings({
    q: typedSearchParams.q ?? "*",
    page: typedSearchParams.page ?? 1,

    category: typedSearchParams.category,
    minPrice: typedSearchParams.minPrice,
    maxPrice: typedSearchParams.maxPrice,

    location:
      typedSearchParams.lat &&
      typedSearchParams.lng &&
      typedSearchParams.distance
        ? {
            latitude: typedSearchParams.lat,
            longitude: typedSearchParams.lng,
            radius: typedSearchParams.distance,
          }
        : undefined,
  });

  const listings = await db.query.listing.findMany({
    where: inArray(
      schema.listing.id,
      searchListings.hits?.map((listing) => listing.document.id) ?? []
    ),
    with: {
      seller: true,
      images: true,
      external: true,
    },
  });

  return (
    <>
      <Navbar />
      <ListingSearchInput />

      <div className="mx-auto max-w-7xl space-y-14 px-4 py-10">
        <div className="flex gap-16">
          <div className="w-[200px] flex-shrink-0 space-y-6">
            <div className="flex w-full items-center justify-between gap-2">
              <h2 className="font-semibold text-lg">Filters</h2>
              <ClearFiltersButton />
            </div>

            <Separator />
            <DistanceFilter />
            <Separator />
            <div>
              <h3 className="font-semibold ">Category</h3>
              <div />
            </div>
            <Separator />

            <PriceFilter />
          </div>

          <div className="space-y-4">
            <FilterBadges />
            <div className="grid min-w-0 flex-grow grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {listings.map((listing) => {
                const pc =
                  listing.seller?.postalCode ?? listing.external?.postalCode;
                const location = findPostalCode(pc ?? "");
                return (
                  <ListingCard
                    key={listing.id}
                    listing={{
                      ...listing,
                      location:
                        location != null
                          ? `${location?.city}, ${location?.province}`
                          : null,
                    }}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export const metadata: Metadata = {
  title: "Listings • GunEx",
  description: "Browse the latest listings on GunEx.",
};
