import type { Metadata } from "next";
import { LocationMapClient } from "./_components/LocationMapClient";
import { ImageCarousel } from "~/app/(search)/listings/[listing]/_components/ImageCarousel";
import { DescriptionSection } from "./_components/DescriptionSection";
import { DetailsSection } from "./_components/DetailsSection";
import { MessageForm } from "./_components/MessageForm";
import { MetaRow } from "./_components/MetaRow";
import { PhoneReveal } from "./_components/PhoneReveal";
import { PriceSection } from "./_components/PriceSection";
import { SellerSection } from "./_components/SellersSection";
import { TitleSection } from "./_components/TitleSection";
import { db } from "~/server/db";
import { eq } from "drizzle-orm";
import * as schema from "~/server/db/schema";
import { notFound } from "next/navigation";
import { findPostalCode } from "~/lib/location/postal-codes";
import { buildImageUrl } from "~/server/s3";

type PageProps = {
  params: Promise<{ listing: string }>;
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

export default async function ListingPage({ params }: PageProps) {
  const { listing: listingId } = await params;
  const listing = await db.query.listing.findFirst({
    where: eq(schema.listing.publicId, listingId),
    with: {
      seller: true,
      images: true,
    },
  });
  if (!listing) notFound();

  const price = listing.price
    ? formatCurrency(listing.price)
    : "Contact for price";

  const postalCode = findPostalCode(listing.seller.postalCode ?? "");
  const location =
    postalCode != null
      ? [postalCode.city, postalCode.province].join(", ")
      : "Unknown";

  // Transform database images to ImageCarousel format
  const images = listing.images
    .slice()
    .sort((a, b) => a.sortOrder - b.sortOrder)
    .map((img) => buildImageUrl(img.objectKey));

  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  const properties = (listing.properties as unknown as any) ?? {};
  return (
    <>
      <div className="p-4 xl:container xl:mx-auto">
        <div className="flex rounded-md border">
          <ImageCarousel
            className="h-[calc(90vh-60px)] min-h-[500px] w-full border-r"
            images={images}
          />
          <div className="flex h-[calc(90vh-60px)] min-h-0 w-[450px] shrink-0 flex-col overflow-hidden">
            <div className="flex-grow space-y-4 overflow-y-scroll p-4 md:p-6">
              {/* <ListingBreadcrumbs subCategory={listing.subCategory} /> */}

              <TitleSection title={listing.title} />

              <PriceSection price={price} />

              <MetaRow createdAt={listing.createdAt} location={location} />

              {Object.keys(properties).length > 0 && (
                <DetailsSection properties={properties} />
              )}

              <DescriptionSection description={listing.description ?? ""} />

              <div className="h-[150px] rounded-md border">
                <LocationMapClient lat={43.65107} lng={-79.347015} />
              </div>

              <SellerSection
                seller={{
                  ...listing.seller,
                  username: listing.seller.username ?? "",
                  rating: 4.5,
                  reviews: 100,
                }}
              />

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
