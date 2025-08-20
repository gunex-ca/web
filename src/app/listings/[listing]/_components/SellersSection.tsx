import { Award, CalendarPlus, Star } from "lucide-react";
import type { FC } from "react";

export type SellerInfo = {
  username: string;
  rating: number;
  reviews: number;
  createdAt?: Date;
};

type StarRatingProps = {
  rating: number;
  max?: number;
  showValue?: boolean;
  reviewCount?: number;
  className?: string;
};

export const StarRating: FC<StarRatingProps> = ({
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
        {showValue && (
          <span className="text-muted-foreground text-xs">
            {rating.toFixed(1)}
            {typeof reviewCount === "number" ? ` (${reviewCount})` : ""}
          </span>
        )}
      </div>
    </div>
  );
};

export const SellerSection: FC<{ seller: SellerInfo }> = ({ seller }) => (
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
      {seller.createdAt && (
        <div className="flex items-center gap-2 text-muted-foreground">
          <CalendarPlus className="size-4" />
          <span>Joined in {seller.createdAt.getFullYear()}</span>
        </div>
      )}
    </div>
  </div>
);
