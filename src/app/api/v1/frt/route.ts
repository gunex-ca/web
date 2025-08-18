import countryCodesList from "country-codes-list";
import { NextResponse } from "next/server";
import { z } from "zod/v4";
import { typesense } from "~/server/typesense/client";
import type { FRTV1 } from "~/server/typesense/schemas";
import { parseBody, request } from "../../middleware";

const frtV1 = z
  .object({
    frn: z.string(),
    type: z.string(),
    legal_class: z.string(),
    manufacturer: z.string(),
    country_code: z.string(),
    model: z.string(),
    action: z.string(),
    calibres: z.array(z.string()),
    pages: z.array(z.number()),
    images: z.array(z.string()).optional(),
  })
  .array();

export const POST = request()
  .use(parseBody(frtV1))
  .handle<{
    body: z.infer<typeof frtV1>;
  }>(async (ctx) => {
    const collection = typesense.collections("frt_v1");

    const docs: FRTV1[] = [];
    for (const item of ctx.body) {
      const country = countryCodesList.findOne(
        "countryCode",
        item.country_code,
      );

      if (country == null && item.country_code !== "Unknown") {
        console.error(`Country not found for ${item.country_code}`);
        continue;
      }

      docs.push({
        ...item,
        images: item.images ?? [],
        id: item.frn,
        calibres: item.calibres,
        country: country?.countryNameEn ?? "Unknown",
        country_code: country?.countryCode ?? "Unknown",
      });
    }

    const inserted = await collection.documents().import(docs, {
      action: "emplace",
    });

    return NextResponse.json(inserted);
  });

export const GET = request().handle(async (ctx) => {
  const { searchParams } = ctx.req.nextUrl;
  const q = searchParams.get("q") ?? "*";
  const perPage = Number.parseInt(searchParams.get("per_page") ?? "20", 10);
  const page = Number.parseInt(searchParams.get("page") ?? "1", 10);

  const searchParamsObj: Record<string, string> = {};
  for (const [key, value] of searchParams.entries()) {
    if (!["q", "per_page", "page"].includes(key)) {
      searchParamsObj[key] = value;
    }
  }

  const collection = typesense.collections<FRTV1>("frt_v1");
  const searchResult = await collection.documents().search({
    q,
    query_by: ["frn", "manufacturer", "model", "country", "action", "calibres"],
    query_by_weights: [100, 10, 50, 10, 10, 10],
    per_page: perPage,
    page,
    ...searchParamsObj,
  });

  return NextResponse.json(searchResult);
});
