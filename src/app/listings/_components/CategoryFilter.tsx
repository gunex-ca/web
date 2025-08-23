"use client";

import { useMemo } from "react";
import { RadioGroup, RadioGroupItem } from "~/components/ui/radio-group";
import { Label } from "~/components/ui/label";
import { useListingsSearchParams } from "~/hooks/use-listings-search-params";
import { categories } from "~/lib/categories";

export const CategoryFilter: React.FC = () => {
  const { values, setParam } = useListingsSearchParams();
  const selectedCategoryId = values.category;

  const topLevelCategories = useMemo(() => categories, []);

  return (
    <div className="space-y-2">
      <h3 className="font-semibold text-sm">Category</h3>

      <RadioGroup
        value={selectedCategoryId ?? ""}
        onValueChange={(val) => setParam("category", val)}
        className="gap-2"
      >
        {topLevelCategories.map((cat) => {
          const id = `cat-${cat.id}`;
          return (
            <div key={cat.id} className="flex items-center gap-2">
              <RadioGroupItem value={cat.id} id={id} />
              <Label htmlFor={id} className="cursor-pointer text-sm">
                {cat.name}
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
