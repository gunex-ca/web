import type { Metadata } from "next";
import { Search } from "~/components/Serach";
import Navbar from "../_components/Navbar";
import { Separator } from "~/components/ui/separator";
import { DistanceFilter } from "./_components/DistanceFilter";
import { ListingCard } from "./_components/ListingCard";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { api } from "~/trpc/server";
import { db } from "~/server/db";

export default async function ListingsPage() {
  const listings = await db.query.listing.findMany({
    with: {
      seller: true,
      images: true,
    },
  });

  return (
    <>
      <Navbar />
      <Search />

      <div className="mx-auto max-w-7xl space-y-14 px-4 py-10">
        <div className="flex gap-16">
          <div className="w-[200px] flex-shrink-0 space-y-6">
            <div className="flex w-full items-center justify-between gap-2">
              <h2 className="font-semibold text-lg">Filters</h2>
              <button className="text-muted-foreground text-sm" type="button">
                Clear all
              </button>
            </div>

            <Separator />
            <DistanceFilter />
            <Separator />

            <div>
              <h3 className="font-semibold ">Category</h3>
              <div />
            </div>

            <Separator />

            <div className="space-y-2">
              <h3 className="font-semibold text-sm">Price Range</h3>

              <Button variant="outline" size="sm" className="rounded-full">
                Under $100
              </Button>
              <Button variant="outline" size="sm" className="rounded-full">
                Under $500
              </Button>
              <Button variant="outline" size="sm" className="rounded-full">
                Under $1,000
              </Button>
              <Button variant="outline" size="sm" className="rounded-full">
                Under $2,000
              </Button>

              <div className="flex items-center gap-2">
                <Input type="number" className="flex-grow" placeholder="0" />
                <span className="flex-shrink-0">-</span>
                <Input type="number" className="flex-grow" placeholder="Max" />
              </div>
            </div>
          </div>

          <div className="grid min-w-0 flex-grow grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {listings.map((listing) => (
              <ListingCard key={listing.id} listing={listing} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export const metadata: Metadata = {
  title: "Listings • Gunex",
  description: "Browse the latest listings on Gunex.",
};
