import type { Metadata } from "next";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "~/components/ui/carousel";
import { categories } from "~/lib/categories";
import { api } from "~/trpc/server";
import { ListingCard } from "../listings/_components/ListingCard";
import { CategoryCarouselItem } from "./_components/CategoryCarouselItem";

export const metadata: Metadata = {
  title: "GunEx • Buy and sell firearms in Canada",
  description:
    "Discover and list firearms and accessories across Canada. Browse newest listings and connect with sellers.",
  alternates: { canonical: "/" },
};

export default async function Home() {
  const firearms = await api.listing.getNewest({
    limit: 50,
    categoryId: "firearms",
  });

  const accessories = await api.listing.getNewest({
    limit: 50,
    categoryId: "firearm-components-accessories-tools",
  });

  const archery = await api.listing.getNewest({
    limit: 50,
    categoryId: "archery",
  });

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
        <h2 className="font-semibold text-2xl">Newest Firearms</h2>
        <Carousel className="w-full" opts={{ slidesToScroll: 2 }}>
          <CarouselContent>
            {firearms.map((listing) => {
              return (
                <CarouselItem
                  key={listing.id}
                  className="basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5"
                >
                  <ListingCard listing={listing} />
                </CarouselItem>
              );
            })}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>

      <div className="space-y-4">
        <h2 className="font-semibold text-2xl">Newest Firearm Accessories</h2>
        <Carousel className="w-full" opts={{ slidesToScroll: 2 }}>
          <CarouselContent>
            {accessories.map((listing) => {
              return (
                <CarouselItem
                  key={listing.id}
                  className="basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5"
                >
                  <ListingCard listing={listing} />
                </CarouselItem>
              );
            })}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>

      <div className="space-y-4">
        <h2 className="font-semibold text-2xl">Newest Archery</h2>
        <Carousel className="w-full" opts={{ slidesToScroll: 2 }}>
          <CarouselContent>
            {archery.map((listing) => {
              return (
                <CarouselItem
                  key={listing.id}
                  className="basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5"
                >
                  <ListingCard listing={listing} />
                </CarouselItem>
              );
            })}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </div>
  );
}
