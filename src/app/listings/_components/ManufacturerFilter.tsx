"use client";

import { ChevronDown, ChevronRight, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { AsyncComboBox } from "~/app/listings/new/_components/inputs/AsyncComboBox";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "~/components/ui/collapsible";
import { useListingsSearchParams } from "~/hooks/use-listings-search-params";
import { api } from "~/trpc/react";

export const ManufacturerFilter: React.FC = () => {
  const { values, setParam } = useListingsSearchParams();
  const selected = values.manufacturer ?? [];

  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState(search);
  useEffect(() => {
    const h = setTimeout(() => setDebouncedSearch(search), 250);
    return () => clearTimeout(h);
  }, [search]);

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    setOpen(selected.length > 0);
  }, []);

  const { data: manufacturers, isLoading } =
    api.search.manufacturers.useQuery(debouncedSearch);

  const options = useMemo(
    () =>
      (manufacturers ?? []).map((m) => ({
        label: m.manufacturer,
        value: m.manufacturer,
      })),
    [manufacturers],
  );

  const [open, setOpen] = useState(false);

  return (
    <Collapsible open={open} onOpenChange={setOpen}>
      <CollapsibleTrigger asChild>
        <Button variant="ghost" className="h-8 w-full justify-between px-1!">
          <span className="font-semibold text-sm">Manufacturer</span>
          {open ? (
            <ChevronDown className="h-4 w-4" />
          ) : (
            <ChevronRight className="h-4 w-4" />
          )}
        </Button>
      </CollapsibleTrigger>

      <CollapsibleContent className="mt-1 space-y-2">
        <AsyncComboBox
          placeholder="Search manufacturers..."
          isLoading={isLoading}
          value={""}
          onChange={(val) => {
            if (!val) return;
            const next = new Set(selected);
            next.add(val);
            setParam("manufacturer", Array.from(next));
          }}
          onSearchChange={(v) => setSearch(v)}
          options={options}
        />

        {selected.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {selected.map((name) => (
              <Button
                key={name}
                type="button"
                variant="secondary"
                size="sm"
                className="rounded-full"
                onClick={() => {
                  const next = selected.filter((m) => m !== name);
                  setParam("manufacturer", next.length ? next : undefined);
                }}
              >
                {name} <X />
              </Button>
            ))}
          </div>
        )}
      </CollapsibleContent>
    </Collapsible>
  );
};

export default ManufacturerFilter;
