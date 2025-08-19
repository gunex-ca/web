"use client";

import { capitalCase } from "change-case";
import { DescriptionSection } from "~/app/(search)/listings/[listing]/_components/DescriptionSection";
import { DetailsSection } from "~/app/(search)/listings/[listing]/_components/DetailsSection";
import { ImageCarousel } from "~/app/(search)/listings/[listing]/_components/ImageCarousel";
import { ListingBreadcrumbs } from "~/app/(search)/listings/[listing]/_components/ListingBreadcrumbs";
import { LocationMap } from "~/app/(search)/listings/[listing]/_components/LocationMap";
import { MetaRow } from "~/app/(search)/listings/[listing]/_components/MetaRow";
import { PriceSection } from "~/app/(search)/listings/[listing]/_components/PriceSection";
import { SellerSection } from "~/app/(search)/listings/[listing]/_components/SellersSection";
import { TitleSection } from "~/app/(search)/listings/[listing]/_components/TitleSection";
import { useListingForm } from "./ListingState";
import { CATEGORY } from "~/lib/categories";

export const Preview: React.FC = () => {
  const { state } = useListingForm();
  const images = [
    {
      id: "1",
      url: "https://picsum.photos/id/1011/1200/900",
      alt: "Rifle on table",
      sortOrder: 0,
    },
    {
      id: "2",
      url: "https://picsum.photos/id/1015/600/900",
      alt: "Scope close-up (portrait)",
      sortOrder: 1,
    },
    {
      id: "3",
      url: "https://picsum.photos/id/1025/900/600",
      alt: "Stock detail (landscape)",
      sortOrder: 2,
    },
    {
      id: "4",
      url: "https://picsum.photos/id/1035/400/1200",
      alt: "Vertical image",
      sortOrder: 3,
    },
    {
      id: "5",
      url: "https://picsum.photos/id/1045/1600/400",
      alt: "Wide panoramic image",
      sortOrder: 4,
    },
  ];

  const subCategory = CATEGORY[state.subCategoryId];
  if (subCategory == null || "children" in subCategory) return null;

  return (
    <div className="rounded-md border">
      <ImageCarousel
        className="roduned-t-md h-[calc(50vh-60px)] min-h-[200px] w-full rounded-b-none"
        images={images}
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
