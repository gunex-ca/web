import { capitalCase } from "change-case";
import { formatDistanceStrict } from "date-fns";
import { Award, CalendarPlus, Send, Star } from "lucide-react";
import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { type FC, Fragment } from "react";
import { ImageCarousel } from "~/app/listings/[listing]/_components/ImageCarousel";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "~/components/ui/breadcrumb";
import { Button } from "~/components/ui/button";
import { PhoneReveal } from "./_components/PhoneReveal";

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

type StarRatingProps = {
  rating: number;
  max?: number;
  showValue?: boolean;
  reviewCount?: number;
  className?: string;
};

const StarRating: FC<StarRatingProps> = ({
  rating,
  max = 5,
  showValue = false,
  reviewCount,
  className,
}) => {
  return (
    <div className={className}>
      <div className="flex items-center gap-2">
        <div className="flex">
          {Array.from({ length: max }).map((_, index) => {
            const starIndex = index + 1;
            const fillAmount = Math.max(
              0,
              Math.min(1, rating - (starIndex - 1)),
            );
            const width = `${Math.round(fillAmount * 100)}%`;
            return (
              <span key={starIndex} className="relative inline-block">
                <Star className="size-4 text-muted-foreground" />
                <span
                  className="absolute inset-0 overflow-hidden"
                  style={{ width }}
                >
                  <Star
                    className="size-4 text-yellow-500"
                    fill="currentColor"
                  />
                </span>
              </span>
            );
          })}
        </div>
        {showValue ? (
          <span className="text-muted-foreground text-xs">
            {rating.toFixed(1)}
            {typeof reviewCount === "number" ? ` (${reviewCount})` : ""}
          </span>
        ) : null}
      </div>
    </div>
  );
};

type ListingProperties = Record<string, string | number> & {
  manufacturer?: string;
  model?: string;
  caliber?: string;
  action?: string;
  barrelLengthIn?: number;
};

type SellerInfo = {
  username: string;
  rating: number;
  reviews: number;
  createdAt: Date;
};

const ListingBreadcrumbs: FC<{ category: string }> = ({ category }) => (
  <Breadcrumb>
    <BreadcrumbList>
      <BreadcrumbItem>
        <BreadcrumbLink href="/">Home</BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbSeparator />
      <BreadcrumbItem>
        <BreadcrumbLink href="/listings">Listings</BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbSeparator />
      <BreadcrumbItem>
        <BreadcrumbLink
          href={`/listings?category=${category}`}
          className="capitalize"
        >
          {category}
        </BreadcrumbLink>
      </BreadcrumbItem>
    </BreadcrumbList>
  </Breadcrumb>
);

const TitleSection: FC<{ title: string }> = ({ title }) => (
  <div className="flex items-start justify-between gap-4">
    <h1 className="font-semibold text-xl leading-tight">{title}</h1>
  </div>
);

const PriceSection: FC<{ price: string }> = ({ price }) => (
  <div className="text-xl">{price}</div>
);

const MetaRow: FC<{ createdAt: Date; location: string }> = ({
  createdAt,
  location,
}) => (
  <div className="mt-2 text-muted-foreground text-xs">
    Listed {formatDistanceStrict(createdAt, new Date(), { addSuffix: true })}
    {" in "}
    {location}
  </div>
);

const DetailsSection: FC<{ properties: ListingProperties }> = ({
  properties,
}) => (
  <div className="mt-6">
    <h2 className="mb-2 font-medium text-md text-muted-foreground">Details</h2>
    <dl className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
      {Object.entries(properties).map(([key, value]) => (
        <Fragment key={key}>
          <dt className="text-muted-foreground">{capitalCase(key)}</dt>
          <dd className="font-medium">{value}</dd>
        </Fragment>
      ))}
    </dl>
  </div>
);

const DescriptionSection: FC<{ description: string }> = ({ description }) => (
  <div className="mt-6">
    <h2 className="mb-2 font-medium text-md text-muted-foreground">
      Description
    </h2>
    <p className="text-sm leading-6">{description}</p>
  </div>
);

const SellerSection: FC<{ seller: SellerInfo }> = ({ seller }) => (
  <div className="mt-6">
    <h2 className="mb-2 font-medium text-md text-muted-foreground">
      Seller Information
    </h2>
    <div className="flex items-center gap-2">
      <p className="flex-grow text-sm leading-6">{seller.username}</p>
      <StarRating
        className="mt-1"
        rating={seller.rating}
        reviewCount={seller.reviews}
        showValue
      />
    </div>
    <div className="mt-2 space-y-2 text-sm">
      {seller.rating > 4 && seller.reviews > 10 ? (
        <div className="flex items-center gap-2">
          <Award className="size-4 text-green-400" />
          <span className="text-muted-foreground">High-rated seller</span>
        </div>
      ) : null}
      <div className="flex items-center gap-2 text-muted-foreground">
        <CalendarPlus className="size-4" />
        <span>Joined in {seller.createdAt.getFullYear()}</span>
      </div>
    </div>
  </div>
);

const MessageForm: FC = () => (
  <form className="">
    <div>
      <label htmlFor="sidebar-message" className="sr-only">
        Message
      </label>
      <textarea
        id="sidebar-message"
        name="message"
        rows={3}
        placeholder="Write a message to the seller..."
        className="w-full resize-none rounded-md border bg-background p-3 text-sm outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50"
      />
    </div>
    <Button type="submit" className="w-full shrink-0">
      <Send className="size-4" />
      Send
    </Button>
  </form>
);

export default function ListingPage({ params: _params }: PageProps) {
  const listing = {
    title: "Remington 700 SPS Tactical",
    description:
      "Lightly used, well-maintained Remington 700 SPS Tactical rifle. Includes a sturdy bipod and a hard case for secure transport and storage. Approximately 300 rounds fired, with careful cleaning and maintenance performed after each range trip. The rifle has always been stored in a climate-controlled safe. No visible wear or damage to the stock or barrel. Scope not included. Ideal for target shooting or hunting. Selling due to upgrade. Feel free to message for more photos or details.",
    price: 1200,
    city: "Toronto",
    province: "ON",
    category: "firearm",
    condition: "excellent",
    firearmType: "rifle",
    firearmClass: "non_restricted",
    sellerId: "00000000-0000-0000-0000-000000000000",
    createdAt: new Date("2025-01-01"),
    seller: {
      rating: 4.5,
      reviews: 100,
      username: "johndoe",
      createdAt: new Date("2024-01-01"),
    },
    properties: {
      manufacturer: "Remington",
      model: "700",
      caliber: ".308 Win",
      action: "Bolt",
      barrelLengthIn: 20,
      phoneNumber: "+1234567890",
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
            className="h-[90vh] min-h-[500px] w-full"
            images={images}
          />
          <div className="flex h-[90vh] min-h-0 w-[450px] shrink-0 flex-col overflow-hidden">
            <div className="flex-grow space-y-4 overflow-y-scroll p-4 md:p-6">
              <ListingBreadcrumbs category={listing.category} />

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

              <PhoneReveal
                phoneNumber={String(listing.properties.phoneNumber)}
              />
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
