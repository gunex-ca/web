"use client";

import {
  type ListingsSearchParams,
  getDefaultListingsSearchParams,
  listingsSearchParamsSchema,
} from "./listings-search-params-schema";
import { createQueryParamsHook } from "./use-query-params";

// Create the typed hook for client-side usage
export const useListingsSearchParams = createQueryParamsHook(
  listingsSearchParamsSchema,
);

// Re-export types and server-safe utilities
export type { ListingsSearchParams };
export { getDefaultListingsSearchParams };
