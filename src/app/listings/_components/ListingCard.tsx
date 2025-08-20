import Link from "next/link";
import { cn, formatCurrency } from "~/components/utils";
import { buildImageUrl } from "~/server/s3";
import { ListingImage } from "./ListingImage";

type ListingImageData = {
  objectKey?: string | null;
};

export type ListingCardProps = {
  listing: {
    id: string;
    publicId: string;
    title: string;
    description?: string | null;
    images: ListingImageData[];
    price: string | null;
    location: string | null;
  };
  className?: string;
};

export const ListingCard: React.FC<ListingCardProps> = ({
  listing,
  className,
}) => {
  return (
    <Link
      key={listing.id}
      href={`/listings/${listing.publicId}`}
      className={cn("group w-full space-y-2 rounded", className)}
    >
      <div
        className={cn("relative w-full overflow-hidden rounded")}
        style={{ aspectRatio: "3 / 2" }}
      >
        <ListingImage
          src={buildImageUrl(listing.images[0]?.objectKey ?? "")}
          alt={listing.title}
          className="absolute inset-0 h-full w-full"
          imageClassName="origin-center object-cover transition-transform duration-300 ease-out will-change-transform group-hover:scale-105"
          fallbackClassName="bg-muted"
        />
      </div>
      <div>
        <div className="line-clamp-2 overflow-hidden text-ellipsis text-muted-foreground">
          {listing.title}
        </div>
        <div className="mb-1 font-semibold">
          {formatCurrency(listing.price)}
        </div>
        <div className="text-muted-foreground text-xs">
          {listing.location ?? "Location not available"}
        </div>
      </div>
    </Link>
  );
};
