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

import { findPostalCode } from "~/lib/location/postal-codes";
import { db } from "~/server/db";

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

  // TODO: Apply filters to the database query based on typedSearchParams
  const listings = await db.query.listing.findMany({
    with: {
      seller: true,
      images: true,
      external: true,
    },
  });

  console.log("Typed search params:", typedSearchParams); // For debugging

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
    </>
  );
}

export const metadata: Metadata = {
  title: "Listings • GunEx",
  description: "Browse the latest listings on GunEx.",
};
