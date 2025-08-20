import { eq } from "drizzle-orm";
import { headers } from "next/headers";
import { notFound } from "next/navigation";
import { ImageCarousel } from "~/app/listings/[listing]/_components/ImageCarousel";
import { auth } from "~/lib/auth";
import { CATEGORY } from "~/lib/categories";
import { findPostalCode } from "~/lib/location/postal-codes";
import { db } from "~/server/db";
import * as schema from "~/server/db/schema";
import { buildImageUrl } from "~/server/s3";
import { DescriptionSection } from "./_components/DescriptionSection";
import { DetailsSection } from "./_components/DetailsSection";
import { ListingBreadcrumbs } from "./_components/ListingBreadcrumbs";
import { LocationMapClient } from "./_components/LocationMapClient";
import { MessageForm } from "./_components/MessageForm";
import { MetaRow } from "./_components/MetaRow";
import { PhoneReveal } from "./_components/PhoneReveal";
import { PriceSection } from "./_components/PriceSection";
import { SellerSection } from "./_components/SellersSection";
import { TitleSection } from "./_components/TitleSection";
import { formatCurrency } from "~/components/utils";

type PageProps = {
  params: Promise<{ listing: string }>;
};

export default async function ListingPage({ params }: PageProps) {
  const session = await auth.api.getSession({ headers: await headers() });

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

  const subCategory = CATEGORY[listing.subCategoryId];
  if (subCategory == null || "children" in subCategory) return notFound();

  return (
    <>
      <div className="p-4 xl:container xl:mx-auto">
        <div className="flex rounded-md border">
          <ImageCarousel
            className="h-[calc(90vh-60px)] min-h-[500px] w-full rounded-r-none border-r"
            images={images}
          />
          <div className="flex h-[calc(90vh-60px)] min-h-0 w-[450px] shrink-0 flex-col overflow-hidden">
            <div className="flex-grow space-y-4 overflow-y-scroll p-4 md:p-6">
              <ListingBreadcrumbs subCategory={subCategory} />

              <TitleSection title={listing.title} />

              <PriceSection price={price} />

              <MetaRow createdAt={listing.createdAt} location={location} />

              {Object.keys(properties).length > 0 && (
                <DetailsSection properties={properties} />
              )}

              <DescriptionSection description={listing.description ?? ""} />

              {postalCode?.latitude && postalCode?.longitude && (
                <div className="h-[150px] rounded-md border">
                  <LocationMapClient
                    lat={postalCode.latitude}
                    lng={postalCode.longitude}
                  />
                </div>
              )}

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

            {session != null && listing.seller.id !== session.user.id && (
              <div className="sticky bottom-0 shrink-0 space-y-2 border-t bg-background p-4 text-sm">
                <MessageForm />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
