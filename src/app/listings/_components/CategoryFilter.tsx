"use client";

import { useMemo } from "react";
import { Badge } from "~/components/ui/badge";
import { Label } from "~/components/ui/label";
import { RadioGroup, RadioGroupItem } from "~/components/ui/radio-group";
import { useListingsSearchParams } from "~/hooks/use-listings-search-params";
import { categories } from "~/lib/categories";

export type CategoryFilterProps = { counts?: Record<string, number> };

export const CategoryFilter: React.FC<CategoryFilterProps> = ({ counts }) => {
  const { values, setParam } = useListingsSearchParams();
  const selectedCategoryId = values.category;

  const topLevelCategories = useMemo(() => categories, []);
  const sortedTopLevel = useMemo(() => {
    return [...topLevelCategories].sort((a, b) => {
      const aCount = counts?.[a.id] ?? 0;
      const bCount = counts?.[b.id] ?? 0;
      if (bCount !== aCount) return bCount - aCount;
      return a.name.localeCompare(b.name);
    });
  }, [counts, topLevelCategories]);

  return (
    <div className="space-y-2">
      <h3 className="font-semibold text-sm">Category</h3>

      <RadioGroup
        value={selectedCategoryId ?? ""}
        onValueChange={(val) => setParam("category", val)}
        className="gap-2"
      >
        {sortedTopLevel.map((cat) => {
          const id = `cat-${cat.id}`;
          const count = counts?.[cat.id] ?? 0;
          return (
            <div key={cat.id} className="flex items-center gap-2">
              <RadioGroupItem value={cat.id} id={id} />
              <Label
                htmlFor={id}
                className="flex w-full cursor-pointer justify-between text-sm"
              >
                <span className="flex-grow">{cat.name}</span>
                {typeof count === "number" ? (
                  <Badge
                    variant="outline"
                    className="rounded-full text-muted-foreground"
                  >
                    {count}
                  </Badge>
                ) : null}
              </Label>
            </div>
          );
        })}
      </RadioGroup>

      <button
        type="button"
        className="text-muted-foreground text-xs underline underline-offset-2"
        onClick={() => setParam("category", undefined)}
      >
        Clear category
      </button>
    </div>
  );
};

export default CategoryFilter;
