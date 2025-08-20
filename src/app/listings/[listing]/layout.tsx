import { eq } from "drizzle-orm";
import type { Metadata } from "next";
import Navbar from "~/app/_components/Navbar";
import { CATEGORY } from "~/lib/categories";
import { findPostalCode } from "~/lib/location/postal-codes";
import { db } from "~/server/db";
import * as schema from "~/server/db/schema";
import { buildImageUrl } from "~/server/s3";

export default function ListingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar showBorder />
      {children}
    </>
  );
}

function formatCurrency(amount: unknown) {
  const num = typeof amount === "number" ? amount : Number(amount ?? 0);
  try {
    return new Intl.NumberFormat("en-CA", {
      style: "currency",
      currency: "CAD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(num);
  } catch {
    return `$${num.toFixed(0)}`;
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ listing: string }>;
}): Promise<Metadata> {
  const { listing: listingId } = await params;

  const listing = await db.query.listing.findFirst({
    where: eq(schema.listing.publicId, listingId),
    with: {
      seller: true,
      images: true,
    },
  });

  if (!listing) {
    return {
      title: "Listing not found • Gunex",
      description: "This listing could not be found.",
    };
  }

  const price = listing.price
    ? formatCurrency(listing.price)
    : "Contact for price";

  const postalCode = findPostalCode(listing.seller.postalCode ?? "");
  const location =
    postalCode != null
      ? [postalCode.city, postalCode.province].join(", ")
      : "Unknown";

  const subCategory = CATEGORY[listing.subCategoryId];
  const categoryName =
    subCategory && !("children" in subCategory) ? subCategory.name : "Item";

  // Get the first image for Open Graph
  const primaryImage = listing.images
    .slice()
    .sort((a, b) => a.sortOrder - b.sortOrder)[0];

  const imageUrl = primaryImage
    ? buildImageUrl(primaryImage.objectKey)
    : undefined;

  const title = `${listing.title} • ${price}`;
  const description = listing.description
    ? `${categoryName} in ${location}. ${listing.description.slice(0, 160)}${
        listing.description.length > 160 ? "..." : ""
      }`
    : `${categoryName} for sale in ${location} • ${price}`;

  return {
    title: `${title} • Gunex`,
    description,
    alternates: {
      canonical: `/listings/${listingId}`,
    },
    openGraph: {
      title: `${title} • Gunex`,
      description,
      type: "website",
      url: `/listings/${listingId}`,
      siteName: "Gunex",
      ...(imageUrl && {
        images: [
          {
            url: imageUrl,
            width: 800,
            height: 600,
            alt: listing.title,
          },
        ],
      }),
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} • Gunex`,
      description,
      ...(imageUrl && {
        images: [imageUrl],
      }),
    },
  };
}
