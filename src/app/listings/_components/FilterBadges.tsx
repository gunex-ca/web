"use client";

import { X } from "lucide-react";
import { Button } from "~/components/ui/button";
import { formatCurrency } from "~/components/utils";
import { useListingsSearchParams } from "~/hooks/use-listings-search-params";
import { CATEGORY } from "~/lib/categories";

export const FilterBadges: React.FC = () => {
  const { setParam, values } = useListingsSearchParams();
  const category = values.category ? CATEGORY[values.category] : null;

  return (
    <div className="flex gap-2">
      {values.q != null && values.q !== "" && (
        <Button
          variant="secondary"
          size="sm"
          className="rounded-full"
          onClick={() => setParam("q", undefined)}
        >
          Search "{values.q}" <X />
        </Button>
      )}

      {category && (
        <Button
          variant="secondary"
          size="sm"
          className="rounded-full"
          onClick={() => setParam("category", undefined)}
        >
          {category.name} <X />
        </Button>
      )}

      {Array.isArray(values.action) && values.action.length > 0 && (
        <Button
          variant="secondary"
          size="sm"
          className="rounded-full"
          onClick={() => setParam("action", undefined)}
        >
          {values.action.join(", ")} <X />
        </Button>
      )}

      {Array.isArray(values.manufacturer) && values.manufacturer.length > 0 && (
        <Button
          variant="secondary"
          size="sm"
          className="rounded-full"
          onClick={() => setParam("manufacturer", undefined)}
        >
          {values.manufacturer.join(", ")} <X />
        </Button>
      )}

      {Array.isArray(values.condition) && values.condition.length > 0 && (
        <Button
          variant="secondary"
          size="sm"
          className="rounded-full"
          onClick={() => setParam("condition", undefined)}
        >
          {values.condition.join(", ")} <X />
        </Button>
      )}

      {(values.maxPrice != null || values.minPrice != null) && (
        <Button
          variant="secondary"
          size="sm"
          className="rounded-full"
          onClick={() => {
            if (values.maxPrice != null) setParam("maxPrice", undefined);
            if (values.minPrice != null) setParam("minPrice", undefined);
          }}
        >
          {values.minPrice != null && values.maxPrice != null
            ? `${formatCurrency(values.minPrice)} - ${formatCurrency(
                values.maxPrice
              )}`
            : values.minPrice != null
            ? `Min ${formatCurrency(values.minPrice)}`
            : `Under ${formatCurrency(values.maxPrice)}`}
          <X />
        </Button>
      )}

      {values.distance && (
        <Button
          variant="secondary"
          size="sm"
          className="rounded-full"
          onClick={() => {
            if (values.distance != null) setParam("distance", undefined);
            if (values.lat != null) setParam("lat", undefined);
            if (values.lng != null) setParam("lng", undefined);
            setParam("global", true);
          }}
        >
          Under {values.distance} km <X />
        </Button>
      )}
    </div>
  );
};
