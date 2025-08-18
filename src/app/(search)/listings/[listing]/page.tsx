import { capitalCase } from "change-case";
import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { ImageCarousel } from "~/app/(search)/listings/[listing]/_components/ImageCarousel";
import { DescriptionSection } from "./_components/DescriptionSection";
import { DetailsSection } from "./_components/DetailsSection";
import { ListingBreadcrumbs } from "./_components/ListingBreadcrumbs";
import { MessageForm } from "./_components/MessageForm";
import { MetaRow } from "./_components/MetaRow";
import { PhoneReveal } from "./_components/PhoneReveal";
import { PriceSection } from "./_components/PriceSection";
import { SellerSection } from "./_components/SellersSection";
import { TitleSection } from "./_components/TitleSection";

const LocationMap = dynamic(() =>
  import("./_components/LocationMap").then((mod) => mod.LocationMap),
);

type PageProps = {
  params: { listing: string };
};

function formatCurrency(amount: unknown) {
  const num = typeof amount === "number" ? amount : Number(amount ?? 0);
  try {
    return new Intl.NumberFormat("en-CA", {
      style: "currency",
      currency: "CAD",
      maximumFractionDigits: 0,
    }).format(num);
  } catch {
    return `$${num.toFixed(0)}`;
  }
}

export default function ListingPage({ params: _params }: PageProps) {
  const listing = {
    title: "Remington 700 SPS Tactical",
    description:
      "Lightly used, well-maintained Remington 700 SPS Tactical rifle. Includes a sturdy bipod and a hard case for secure transport and storage. Approximately 300 rounds fired, with careful cleaning and maintenance performed after each range trip. The rifle has always been stored in a climate-controlled safe. No visible wear or damage to the stock or barrel. Scope not included. Ideal for target shooting or hunting. Selling due to upgrade. Feel free to message for more photos or details.",
    price: 1200,
    city: "Toronto",
    province: "ON",
    category: "firearms:rifles",
    condition: "excellent",
    sellerId: "00000000-0000-0000-0000-000000000000",
    createdAt: new Date("2025-01-01"),
    seller: {
      rating: 4.5,
      reviews: 100,
      username: "johndoe",
      createdAt: new Date("2024-01-01"),
      phoneNumber: "+1234567890",
    },
    properties: {
      manufacturer: "Remington",
      model: "700",
      caliber: ".308 Win",
      action: "Bolt",
      barrelLengthIn: 20,
    },
    images: [
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
    ],
  } as const;

  const price = listing.price
    ? formatCurrency(listing.price)
    : "Contact for price";
  const location = [listing.city, listing.province].filter(Boolean).join(", ");
  const images = listing.images
    .slice()
    .sort((a, b) => a.sortOrder - b.sortOrder);

  return (
    <>
      <div className="container mx-auto p-4 md:p-6">
        <div className="flex rounded-md border">
          <ImageCarousel
            className="h-[calc(90vh-60px)] min-h-[500px] w-full"
            images={images}
          />
          <div className="flex h-[calc(90vh-60px)] min-h-0 w-[450px] shrink-0 flex-col overflow-hidden">
            <div className="flex-grow space-y-4 overflow-y-scroll p-4 md:p-6">
              <ListingBreadcrumbs categoryId={listing.category} />

              <TitleSection title={listing.title} />

              <PriceSection price={price} />

              <MetaRow createdAt={listing.createdAt} location={location} />

              <DetailsSection
                properties={{
                  condition: capitalCase(listing.condition),
                  ...listing.properties,
                }}
              />

              <DescriptionSection description={listing.description} />

              <div className="h-[150px] rounded-md border">
                <LocationMap lat={43.65107} lng={-79.347015} />
              </div>

              <SellerSection seller={listing.seller} />

              <PhoneReveal phoneNumber={String(listing.seller.phoneNumber)} />
            </div>

            <div className="sticky bottom-0 shrink-0 space-y-2 border-t bg-background p-4 text-sm">
              <MessageForm />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export const metadata: Metadata = {
  title: "Remington 700 SPS Tactical • $1,200",
  description:
    "Lightly used, well-maintained. Includes bipod and hard case. Approximately 300 rounds fired.",
};
