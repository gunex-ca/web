"use client";

import { useMemo, useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import { Checkbox } from "~/components/ui/checkbox";
import { Label } from "~/components/ui/label";
import { useListingsSearchParams } from "~/hooks/use-listings-search-params";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "~/components/ui/collapsible";

export type ConditionFilterProps = {
  counts?: Record<string, number>;
};

export const ConditionFilter: React.FC<ConditionFilterProps> = ({ counts }) => {
  const { values, setParam } = useListingsSearchParams();
  const selected = values.condition ?? [];

  const conditions = useMemo(() => {
    const entries = Object.entries(counts ?? {});
    const base = entries.map(([id, count]) => ({ id, name: id, count }));
    for (const id of selected)
      if (!base.some((x) => x.id === id)) base.push({ id, name: id, count: 0 });
    return base.sort((a, b) =>
      b.count !== a.count ? b.count - a.count : a.name.localeCompare(b.name)
    );
  }, [counts, selected]);

  if (!conditions.length) return null;

  const [open, setOpen] = useState(false);

  return (
    <Collapsible open={open} onOpenChange={setOpen}>
      <CollapsibleTrigger asChild>
        <Button variant="ghost" className="h-8 w-full justify-between px-1!">
          <span className="font-semibold text-sm">Condition</span>
          {open ? (
            <ChevronDown className="h-4 w-4" />
          ) : (
            <ChevronRight className="h-4 w-4" />
          )}
        </Button>
      </CollapsibleTrigger>

      <CollapsibleContent className="mt-1 space-y-2">
        {conditions.map((c) => {
          const id = `cond-${c.id}`;
          const isChecked = selected?.includes(c.id) ?? false;
          return (
            <div key={c.id} className="flex items-center gap-2">
              <Checkbox
                id={id}
                checked={isChecked}
                onCheckedChange={(checked) => {
                  const next = new Set(selected);
                  if (checked) next.add(c.id);
                  else next.delete(c.id);
                  setParam("condition", Array.from(next));
                }}
              />
              <Label
                htmlFor={id}
                className="flex w-full cursor-pointer justify-between text-sm"
              >
                <span className="flex-grow capitalize">{c.name}</span>
                <Badge
                  variant="outline"
                  className="rounded-full text-muted-foreground"
                >
                  {c.count}
                </Badge>
              </Label>
            </div>
          );
        })}
      </CollapsibleContent>
    </Collapsible>
  );
};

export default ConditionFilter;
