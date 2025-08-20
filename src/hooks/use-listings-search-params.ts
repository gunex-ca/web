"use client";

import { createQueryParamsHook } from "./use-query-params";
import {
  listingsSearchParamsSchema,
  type ListingsSearchParams,
  getDefaultListingsSearchParams,
} from "./listings-search-params-schema";

// Create the typed hook for client-side usage
export const useListingsSearchParams = createQueryParamsHook(
  listingsSearchParamsSchema
);

// Re-export types and server-safe utilities
export type { ListingsSearchParams };
export { getDefaultListingsSearchParams };
