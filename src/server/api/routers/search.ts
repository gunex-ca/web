import { inArray } from "drizzle-orm";
import { isPresent } from "ts-is-present";
import { z } from "zod/v4";
import { db } from "~/server/db";
import * as schema from "~/server/db/schema";
import { typesense } from "~/server/typesense/client";
import type { FRTV1, ListingV1 } from "~/server/typesense/schemas";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const searchRouter = createTRPCRouter({
  listings: publicProcedure
    .input(
      z.object({
        q: z.string().optional(),
        perPage: z.number().optional(),
        page: z.number().optional(),
        category: z.string().optional(),
        action: z.array(z.string()).optional(),
        manufacturer: z.array(z.string()).optional(),
        condition: z.array(z.string()).optional(),

        minPrice: z.number().optional(),
        maxPrice: z.number().optional(),

        sortBy: z
          .enum([
            "relevance",
            "price_asc",
            "price_desc",
            "newest",
            "oldest",
            "closest",
          ])
          .optional(),

        location: z
          .object({
            latitude: z.number(),
            longitude: z.number(),
            radius: z.number(),
          })
          .optional(),
      })
    )
    .query(async ({ input }) => {
      const queryBy = [
        ["title", 10],
        ["description_text", 15],
        ["caliber", 5],
        ["manufacturer", 5],
        ["model", 5],
        ["category", 1],
        ["sub_category", 1],
      ] as const;

      const filterBy = [
        "status:=active",
        ...(input.category
          ? [`(category:=${input.category} || sub_category:=${input.category})`]
          : []),
        ...(input.location
          ? [
              `location:(${input.location.latitude}, ${input.location.longitude}, ${input.location.radius} km)`,
            ]
          : []),

        ...(input.minPrice ? [`price:>=${input.minPrice}`] : []),
        ...(input.maxPrice ? [`price:<=${input.maxPrice}`] : []),
        ...(input.action?.length
          ? [`(${input.action.map((a) => `action:=${a}`).join(" || ")})`]
          : []),
        ...(input.manufacturer?.length
          ? [
              `(${input.manufacturer
                .map((m) => `manufacturer:=${m}`)
                .join(" || ")})`,
            ]
          : []),
        ...(input.condition?.length
          ? [`(${input.condition.map((c) => `condition:=${c}`).join(" || ")})`]
          : []),
      ]
        .filter(Boolean)
        .join(" && ");

      const sortBy = {
        relevance: "_text_match:desc,created_at:desc",

        price_asc: "price:asc,_text_match:desc",
        price_desc: "price:desc,_text_match:desc",

        newest: "created_at:desc,_text_match:desc",
        oldest: "created_at:asc,_text_match:desc",

        closest: input.location
          ? `location:(${input.location.latitude}, ${input.location.longitude}, ${input.location.radius} km),_text_match:desc`
          : "_text_match:desc,created_at:desc",
      }[input.sortBy ?? "relevance"];

      const result = await typesense
        .collections<ListingV1>("listing_v1")
        .documents()
        .search({
          q: input.q,

          query_by: queryBy.map(([field]) => field),
          query_by_weights: queryBy.map(([, weight]) => weight),

          filter_by: filterBy,

          facet_by: [
            "category",
            "sub_category",
            "manufacturer",
            "model",
            "caliber",
            "action",
            "condition",
          ],

          sort_by: sortBy,

          limit: input.perPage ?? 12,
          page: input.page ?? 1,
        });

      if (result.hits == null) return { search: result, listings: [] };

      const orderedIds = result.hits.map((listing) => listing.document.id);

      const listings = await db.query.listing.findMany({
        where: inArray(schema.listing.id, orderedIds),
        with: {
          seller: true,
          images: true,
          external: true,
        },
      });

      const listingMap = new Map(
        listings.map((listing) => [listing.id, listing])
      );
      const sortedListings = orderedIds
        .map((id) => listingMap.get(id))
        .filter(isPresent);

      // Extract pagination metadata from Typesense result
      const totalResults = result.found ?? 0;
      const currentPage = result.page ?? 1;
      const perPage = result.request_params?.per_page ?? input.perPage ?? 12;
      const totalPages = Math.ceil(totalResults / perPage);

      return {
        search: result,
        listings: sortedListings,
        pagination: {
          currentPage,
          totalPages,
          totalResults,
          perPage,
          hasNextPage: currentPage < totalPages,
          hasPreviousPage: currentPage > 1,
        },
      };
    }),

  manufacturers: publicProcedure.input(z.string()).query(async ({ input }) => {
    const result = await typesense
      .collections<FRTV1>("frt_v1")
      .documents()
      .search({
        q: input === "" ? "*" : input,
        query_by: ["calibres", "model", "manufacturer"],
        query_by_weights: [1, 3, 10],
        group_by: "manufacturer",
        group_limit: 1,
        limit: 100,
      });

    return (
      result.grouped_hits?.flatMap((hit) => ({
        manufacturer: hit.group_key.at(0) ?? "",
        frn: hit.found ?? 0,
      })) ?? []
    );
  }),

  manufacturerModels: publicProcedure
    .input(
      z.object({
        manufacturer: z.string(),
        q: z.string(),
      })
    )
    .query(async ({ input: { manufacturer, q } }) => {
      const result = await typesense
        .collections<FRTV1>("frt_v1")
        .documents()
        .search({
          q: q === "" ? "*" : q,
          query_by: ["calibres", "model", "manufacturer"],
          query_by_weights: [1, 3, 10],
          limit: 100,
          group_by: "model",
          group_limit: 1,
          filter_by: `manufacturer:=${manufacturer}`,
        });

      return (
        result.grouped_hits?.flatMap((hit) => hit.group_key.at(0) ?? "") ?? []
      );
    }),
});
