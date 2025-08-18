import { z } from "zod/v4";
import { typesense } from "~/server/typesense/client";
import type { FRTV1 } from "~/server/typesense/schemas";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const searchRouter = createTRPCRouter({
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
      }),
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
