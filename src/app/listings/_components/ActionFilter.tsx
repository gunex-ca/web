"use client";

import { ChevronDown, ChevronRight } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { Checkbox } from "~/components/ui/checkbox";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "~/components/ui/collapsible";
import { Label } from "~/components/ui/label";
import { useListingsSearchParams } from "~/hooks/use-listings-search-params";

export type ActionFilterProps = {
  counts?: Record<string, number>;
};

export const ActionFilter: React.FC<ActionFilterProps> = ({ counts }) => {
  const { values, setParam } = useListingsSearchParams();
  const selected = values.action ?? [];

  const actions = useMemo(() => {
    const entries = Object.entries(counts ?? {});
    const base = entries.map(([id, count]) => ({ id, name: id, count }));
    // Ensure selected values are present even if not in facet counts
    for (const id of selected) {
      if (!base.some((x) => x.id === id)) base.push({ id, name: id, count: 0 });
    }
    return base.sort((a, b) =>
      b.count !== a.count ? b.count - a.count : a.name.localeCompare(b.name),
    );
  }, [counts, selected]);

  const [open, setOpen] = useState(false);
  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    setOpen(selected.length > 0);
  }, []);
  if (!actions.length) return null;

  return (
    <Collapsible open={open} onOpenChange={setOpen}>
      <CollapsibleTrigger asChild>
        <Button variant="ghost" className="h-8 w-full justify-between px-1!">
          <span className="font-semibold text-sm">Action</span>
          {open ? (
            <ChevronDown className="h-4 w-4" />
          ) : (
            <ChevronRight className="h-4 w-4" />
          )}
        </Button>
      </CollapsibleTrigger>

      <CollapsibleContent className="mt-1 space-y-2">
        {actions.map((a) => {
          const id = `act-${a.id}`;
          const isChecked = selected?.includes(a.id) ?? false;
          return (
            <div key={a.id} className="flex items-center gap-2">
              <Checkbox
                id={id}
                checked={isChecked}
                onCheckedChange={(checked) => {
                  const next = new Set(selected);
                  if (checked) next.add(a.id);
                  else next.delete(a.id);
                  setParam("action", Array.from(next));
                }}
              />
              <Label
                htmlFor={id}
                className="flex w-full cursor-pointer justify-between text-sm"
              >
                <span className="flex-grow capitalize">
                  {a.name.replaceAll("_", " ")}
                </span>
                <Badge
                  variant="outline"
                  className="rounded-full text-muted-foreground"
                >
                  {a.count}
                </Badge>
              </Label>
            </div>
          );
        })}
      </CollapsibleContent>
    </Collapsible>
  );
};

export default ActionFilter;
