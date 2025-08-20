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
    title: string;
    description?: string | null;
    images: ListingImageData[];
    price: string | null;
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
      href={`/listings/${listing.id}`}
      className={cn("w-full space-y-2 rounded", className)}
    >
      <div
        className={cn("relative w-full overflow-hidden rounded")}
        style={{ aspectRatio: "3 / 2" }}
      >
        <ListingImage
          src={buildImageUrl(listing.images[0]?.objectKey ?? "")}
          alt={listing.title}
          className="absolute inset-0 h-full w-full object-cover"
        />
      </div>
      <div className="space-y-1">
        <div className="line-clamp-2 overflow-hidden text-ellipsis text-muted-foreground">
          {listing.title}
        </div>
        <div className="font-semibold">{formatCurrency(listing.price)}</div>
      </div>
    </Link>
  );
};
