"use client";

import { capitalCase } from "change-case";
import dynamic from "next/dynamic";
import { DescriptionSection } from "~/app/listings/[listing]/_components/DescriptionSection";
import { DetailsSection } from "~/app/listings/[listing]/_components/DetailsSection";
import { ImageCarousel } from "~/app/listings/[listing]/_components/ImageCarousel";
import { ListingBreadcrumbs } from "~/app/listings/[listing]/_components/ListingBreadcrumbs";
import { MetaRow } from "~/app/listings/[listing]/_components/MetaRow";
import { PriceSection } from "~/app/listings/[listing]/_components/PriceSection";
import { SellerSection } from "~/app/listings/[listing]/_components/SellersSection";
import { TitleSection } from "~/app/listings/[listing]/_components/TitleSection";
import { cn } from "~/components/utils";
import { CATEGORY } from "~/lib/categories";
import { useListingForm } from "./ListingState";

const LocationMap = dynamic(
  () =>
    import("~/app/listings/[listing]/_components/LocationMap").then(
      (mod) => mod.LocationMap,
    ),
  { ssr: false },
);

export const Preview: React.FC = () => {
  const { state } = useListingForm();

  // Use uploaded images from state, fallback to placeholder if no images
  const images = state.images;

  const subCategory = CATEGORY[state.subCategoryId];
  if (subCategory == null || "children" in subCategory) return null;

  // Convert File[] to object URLs for preview
  const imageUrls = images.map((img) => URL.createObjectURL(img));

  return (
    <div className="rounded-md border">
      <ImageCarousel
        className={cn(
          "roduned-t-md h-[calc(50vh-60px)] min-h-[200px] w-full rounded-b-none",
          images.length === 0 && "border-b",
        )}
        images={imageUrls}
      />
      <div className=" h-[calc(50vh-60px)] shrink-0 flex-col overflow-scroll">
        <div className="flex-grow space-y-4 overflow-y-scroll p-4 md:p-6">
          <ListingBreadcrumbs subCategory={subCategory} />
          <TitleSection title={state.title || "Untitled"} />
          <PriceSection price={`$${state.price.toLocaleString()}`} />
          <MetaRow createdAt={new Date()} location={"Unknown"} />
          <DetailsSection properties={state.properties} />
          <DescriptionSection
            description={state.description || "No description"}
          />

          <div className="h-[150px] rounded-md border">
            <LocationMap lat={43.65107} lng={-79.347015} />
          </div>

          <SellerSection
            seller={{
              username: "johndoe",
              rating: 4.5,
              reviews: 100,
              createdAt: new Date(),
            }}
          />
        </div>
      </div>
    </div>
  );
};
