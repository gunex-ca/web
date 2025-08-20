// Server-safe schema and parsing utilities (no "use client")
import {
  type QueryParamCodec,
  booleanCodec,
  numberCodec,
  optional,
  stringCodec,
} from "./query-param-codecs";

// Combined schema for all listings search parameters
export const listingsSearchParamsSchema = {
  // Search query
  q: optional(stringCodec("")),

  // Distance filter
  global: booleanCodec(true, { serializeFalseAs: "0" }),
  distance: optional(numberCodec(50, { min: 10, max: 100 })),
  lat: optional(numberCodec(0)),
  lng: optional(numberCodec(0)),

  // Price filter
  minPrice: optional(numberCodec(0, { min: 0 })),
  maxPrice: optional(numberCodec(0, { min: 0 })),

  // Category filter
  category: optional(stringCodec("")),

  // Pagination
  page: numberCodec(1, { min: 1 }),
} as const;

// Export types for convenience
export type ListingsSearchParams = {
  q?: string;
  global: boolean;
  distance?: number;
  lat?: number;
  lng?: number;
  minPrice?: number;
  maxPrice?: number;
  category?: string;
  page: number;
};

// Helper to parse search params (works on both server and client)
export function parseListingsSearchParams(
  searchParams: URLSearchParams,
): ListingsSearchParams {
  const result: Record<string, unknown> = {};

  for (const [key, codec] of Object.entries(listingsSearchParamsSchema)) {
    const rawValue = searchParams.get(key);
    result[key] = (codec as QueryParamCodec<unknown>).parse(rawValue);
  }

  return result as ListingsSearchParams;
}

// Helper to get default values (works on both server and client)
export function getDefaultListingsSearchParams(): ListingsSearchParams {
  const result: Record<string, unknown> = {};

  for (const [key, codec] of Object.entries(listingsSearchParamsSchema)) {
    result[key] = (codec as QueryParamCodec<unknown>).parse(null);
  }

  return result as ListingsSearchParams;
}
