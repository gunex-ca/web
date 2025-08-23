"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { useListingsSearchParams } from "~/hooks/use-listings-search-params";

export function SortBySelect() {
  const { setParam, values } = useListingsSearchParams();

  const handleSortChange = (value: string) => {
    setParam(
      "sortBy",
      value as
        | "relevance"
        | "price_asc"
        | "price_desc"
        | "newest"
        | "oldest"
        | "closest"
    );
  };

  return (
    <Select
      value={values.sortBy ?? "relevance"}
      onValueChange={handleSortChange}
    >
      <SelectTrigger>
        <SelectValue placeholder="Sort by" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="relevance">Relevance</SelectItem>
        <SelectItem value="newest">Newest</SelectItem>
        <SelectItem value="oldest">Oldest</SelectItem>
        <SelectItem value="price_asc">Price: Low to High</SelectItem>
        <SelectItem value="price_desc">Price: High to Low</SelectItem>
      </SelectContent>
    </Select>
  );
}
