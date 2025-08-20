"use client";

import { useListingsSearchParams } from "~/hooks/use-listings-search-params";
import { getDefaultListingsSearchParams } from "~/hooks/listings-search-params-schema";

export const ClearFiltersButton: React.FC = () => {
  const { setValues } = useListingsSearchParams();

  const handleClearAll = () => {
    const defaults = getDefaultListingsSearchParams();
    setValues({
      ...defaults,
      // Keep the search query, only clear filters
      q: undefined,
      // Reset to defaults
      global: true,
      distance: undefined,
      lat: undefined,
      lng: undefined,
      minPrice: undefined,
      maxPrice: undefined,
      category: undefined,
      page: 1,
    });
  };

  return (
    <button
      className="text-muted-foreground text-sm hover:text-foreground"
      type="button"
      onClick={handleClearAll}
    >
      Clear all
    </button>
  );
};
