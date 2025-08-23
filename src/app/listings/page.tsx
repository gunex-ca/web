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
import { api } from "~/trpc/server";
import { CategoryFilter } from "./_components/CategoryFilter";
import { FilterBadges } from "./_components/FilterBadges";
import { SortBySelect } from "./_components/SortBySelect";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "~/components/ui/pagination";

// Helper function to generate pagination URLs with search parameters
function createPaginationUrl(
  params: ListingsSearchParams,
  page: number
): string {
  const searchParams = new URLSearchParams();

  // Add all current search parameters except page
  if (params.q) searchParams.set("q", params.q);
  if (params.category) searchParams.set("category", params.category);
  if (params.minPrice !== undefined)
    searchParams.set("minPrice", params.minPrice.toString());
  if (params.maxPrice !== undefined)
    searchParams.set("maxPrice", params.maxPrice.toString());
  if (params.sortBy && params.sortBy !== "relevance")
    searchParams.set("sortBy", params.sortBy);
  if (!params.global) searchParams.set("global", "0");
  if (params.distance !== undefined)
    searchParams.set("distance", params.distance.toString());
  if (params.lat !== undefined) searchParams.set("lat", params.lat.toString());
  if (params.lng !== undefined) searchParams.set("lng", params.lng.toString());

  // Set the new page
  if (page > 1) searchParams.set("page", page.toString());

  const queryString = searchParams.toString();
  return queryString ? `/listings?${queryString}` : "/listings";
}

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

  const perPage = 60;
  const listings = await api.search.listings({
    q: typedSearchParams.q,
    page: typedSearchParams.page ?? 1,
    perPage,

    category: typedSearchParams.category,
    minPrice: typedSearchParams.minPrice,
    maxPrice: typedSearchParams.maxPrice,
    sortBy: typedSearchParams.sortBy,

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
            <CategoryFilter />
            <Separator />

            <PriceFilter />
          </div>

          <div className="flex-grow space-y-4">
            <div className="flex items-center justify-between">
              <FilterBadges />

              <SortBySelect />
            </div>
            <div className="grid min-w-0 flex-grow grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {listings.listings.map((listing) => {
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

            {/* Pagination */}
            {listings.pagination && listings.pagination.totalPages > 1 && (
              <Pagination className="mt-16">
                <PaginationContent>
                  {/* Previous page */}
                  {listings.pagination?.hasPreviousPage &&
                    listings.pagination && (
                      <PaginationItem>
                        <PaginationPrevious
                          href={createPaginationUrl(
                            typedSearchParams,
                            listings.pagination.currentPage - 1
                          )}
                        />
                      </PaginationItem>
                    )}

                  {/* Page numbers */}
                  {listings.pagination &&
                    (() => {
                      const { currentPage, totalPages } = listings.pagination;
                      const pages: React.ReactNode[] = [];

                      // Show first page if not in range
                      if (currentPage > 3) {
                        pages.push(
                          <PaginationItem key={1}>
                            <PaginationLink
                              href={createPaginationUrl(typedSearchParams, 1)}
                            >
                              1
                            </PaginationLink>
                          </PaginationItem>
                        );
                        if (currentPage > 4) {
                          pages.push(
                            <PaginationItem key="ellipsis-start">
                              <PaginationEllipsis />
                            </PaginationItem>
                          );
                        }
                      }

                      // Show pages around current page
                      const startPage = Math.max(1, currentPage - 2);
                      const endPage = Math.min(totalPages, currentPage + 2);

                      for (let i = startPage; i <= endPage; i++) {
                        pages.push(
                          <PaginationItem key={i}>
                            <PaginationLink
                              href={createPaginationUrl(typedSearchParams, i)}
                              isActive={i === currentPage}
                            >
                              {i}
                            </PaginationLink>
                          </PaginationItem>
                        );
                      }

                      // Show last page if not in range
                      if (currentPage < totalPages - 2) {
                        if (currentPage < totalPages - 3) {
                          pages.push(
                            <PaginationItem key="ellipsis-end">
                              <PaginationEllipsis />
                            </PaginationItem>
                          );
                        }
                        pages.push(
                          <PaginationItem key={totalPages}>
                            <PaginationLink
                              href={createPaginationUrl(
                                typedSearchParams,
                                totalPages
                              )}
                            >
                              {totalPages}
                            </PaginationLink>
                          </PaginationItem>
                        );
                      }

                      return pages;
                    })()}

                  {/* Next page */}
                  {listings.pagination?.hasNextPage && listings.pagination && (
                    <PaginationItem>
                      <PaginationNext
                        href={createPaginationUrl(
                          typedSearchParams,
                          listings.pagination.currentPage + 1
                        )}
                      />
                    </PaginationItem>
                  )}
                </PaginationContent>
              </Pagination>
            )}
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
