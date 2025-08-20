import type { Metadata } from "next";
import Link from "next/link";
import { ListingSearchInput } from "~/components/ListingSerachInput";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "~/components/ui/carousel";
import { cn } from "~/components/utils";
import { categories } from "~/lib/categories";
import { buildImageUrl } from "~/server/s3";
import { api } from "~/trpc/server";
import { CategoryCarouselItem } from "./_components/CategoryCarouselItem";
import { ListingCard } from "../listings/_components/ListingCard";

export const metadata: Metadata = {
  title: "Gunex • Buy and sell firearms in Canada",
  description:
    "Discover and list firearms and accessories across Canada. Browse newest listings and connect with sellers.",
  alternates: { canonical: "/" },
};

type Listing = Awaited<ReturnType<typeof api.listing.getNewest>>[number];

export default async function Home() {
  const listings = await api.listing.getNewest();

  return (
    <div className="mx-auto max-w-7xl space-y-14 px-4 py-10">
      <div className="space-y-4">
        <h2 className="font-semibold text-2xl">Categories</h2>
        <Carousel className="w-full" opts={{ slidesToScroll: 4 }}>
          <CarouselContent>
            {categories.map((category) => (
              <CarouselItem
                key={category.id}
                className="basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/6 xl:basis-1/7"
              >
                <CategoryCarouselItem category={category} className="p-1" />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
      <div className="space-y-4">
        <h2 className="font-semibold text-2xl">Newest listings</h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-4 lg:grid-cols-5">
          {listings.map((listing) => (
            <ListingCard
              key={listing.id}
              listing={listing}
              className="h-32 w-48"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
