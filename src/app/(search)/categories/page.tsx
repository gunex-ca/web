import type { Metadata } from "next";
import Link from "next/link";
import { Badge } from "~/components/ui/badge";
import { type Category, categories } from "~/lib/categories";
import { typesense } from "~/server/typesense/client";

type CountsMap = Record<string, number>;

const RenderCategory = ({
  category,
  counts,
}: {
  category?: Category;
  counts: CountsMap;
}) => {
  if (category == null) return null;
  return (
    <section className="flex flex-col gap-3">
      <h2 className="font-semibold text-base sm:text-lg">{category.name}</h2>
      <ul className="-mx-2 flex flex-col gap-1">
        {[...category.children]
          .sort((a, b) => {
            const diff = (counts[b.id] ?? 0) - (counts[a.id] ?? 0);
            return diff !== 0 ? diff : a.name.localeCompare(b.name);
          })
          .map((child) => (
            <li key={child.id}>
              <Link
                href={`/listings?category=${child.id}`}
                className="flex w-full items-center justify-between gap-2 rounded-md px-2 py-2 text-muted-foreground text-sm transition-colors hover:bg-muted hover:text-foreground sm:text-[0.95rem]"
              >
                <span className="truncate">{child.name}</span>
                <Badge
                  variant="outline"
                  className="rounded-full text-muted-foreground"
                >
                  {counts[child.id] ?? 0}
                </Badge>
              </Link>
            </li>
          ))}
      </ul>
    </section>
  );
};

async function getSubcategoryCounts(): Promise<CountsMap> {
  try {
    type FacetCount = { value: string; count: number };
    type FacetCounts = { field_name: string; counts: FacetCount[] };
    type SearchResponse = { facet_counts?: FacetCounts[] };
    const res = (await typesense.collections("listing_v1").documents().search({
      q: "*",
      query_by: "title,description_text",
      facet_by: "sub_category",
      max_facet_values: 200,
      per_page: 1,
      num_typos: 0,
    })) as SearchResponse;

    const subFacet = (res.facet_counts ?? []).find(
      (f) => f.field_name === "sub_category"
    );
    const mapping: CountsMap = {};
    if (subFacet?.counts) {
      for (const item of subFacet.counts) {
        mapping[item.value] = item.count;
      }
    }
    return mapping;
  } catch {
    return {};
  }
}

export default async function CategoriesPage() {
  const counts = await getSubcategoryCounts();
  return (
    <main className="container mx-auto max-w-7xl px-4 py-8">
      <h1 className="font-bold text-xl sm:text-2xl">
        Choose a category to search for listings
      </h1>
      <p className="mt-1 max-w-2xl text-muted-foreground text-sm sm:text-base">
        Categories help buyers find your item more easily and ensure your
        listing appears in the right place.
      </p>
      <div className="mt-8 grid grid-cols-1 gap-6 sm:mt-10 sm:grid-cols-2 sm:gap-8 lg:grid-cols-4 lg:gap-10">
        <div className="space-y-8 sm:space-y-10">
          <RenderCategory category={categories[0]} counts={counts} />
          <RenderCategory category={categories[4]} counts={counts} />
          <RenderCategory category={categories[8]} counts={counts} />
          <RenderCategory category={categories[12]} counts={counts} />
          <RenderCategory category={categories[13]} counts={counts} />
        </div>
        <div className="space-y-8 sm:space-y-10">
          <RenderCategory category={categories[1]} counts={counts} />
          <RenderCategory category={categories[5]} counts={counts} />
          <RenderCategory category={categories[9]} counts={counts} />
        </div>
        <div className="space-y-8 sm:space-y-10">
          <RenderCategory category={categories[2]} counts={counts} />
          <RenderCategory category={categories[6]} counts={counts} />
          <RenderCategory category={categories[10]} counts={counts} />
          <RenderCategory category={categories[14]} counts={counts} />
        </div>
        <div className="space-y-8 sm:space-y-10">
          <RenderCategory category={categories[3]} counts={counts} />
          <RenderCategory category={categories[7]} counts={counts} />
          <RenderCategory category={categories[11]} counts={counts} />
        </div>
      </div>
    </main>
  );
}

export const metadata: Metadata = {
  title: "Categories • GunEx",
  description:
    "Browse all categories and subcategories to find listings faster on GunEx.",
};
