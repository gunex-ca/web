"use client";

import { ChevronDown, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "~/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "~/components/ui/collapsible";
import { Input } from "~/components/ui/input";
import { useListingsSearchParams } from "~/hooks/use-listings-search-params";

export const PriceFilter: React.FC = () => {
  const { useParam, setValues } = useListingsSearchParams();
  const [minPrice, setMinPrice] = useParam("minPrice");
  const [maxPrice, setMaxPrice] = useParam("maxPrice");

  const [open, setOpen] = useState(false);
  useEffect(() => {
    setOpen(typeof minPrice === "number" || typeof maxPrice === "number");
  }, [minPrice, maxPrice]);

  return (
    <Collapsible open={open} onOpenChange={setOpen}>
      <CollapsibleTrigger asChild>
        <Button variant="ghost" className="h-8 w-full justify-between px-1!">
          <span className="font-semibold text-sm">Price Range</span>
          {open ? (
            <ChevronDown className="h-4 w-4" />
          ) : (
            <ChevronRight className="h-4 w-4" />
          )}
        </Button>
      </CollapsibleTrigger>

      <CollapsibleContent className="mt-1 space-y-2">
        <div className="flex flex-wrap gap-2">
          <Button
            variant="outline"
            size="sm"
            className="rounded-full"
            type="button"
            onClick={() => setValues({ minPrice: undefined, maxPrice: 100 })}
          >
            Under $100
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="rounded-full"
            type="button"
            onClick={() => setValues({ minPrice: undefined, maxPrice: 500 })}
          >
            Under $500
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="rounded-full"
            type="button"
            onClick={() => setValues({ minPrice: undefined, maxPrice: 1000 })}
          >
            Under $1,000
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="rounded-full"
            type="button"
            onClick={() => setValues({ minPrice: undefined, maxPrice: 2000 })}
          >
            Under $2,000
          </Button>
        </div>

        <div className="flex items-center gap-2">
          <Input
            type="number"
            className="flex-grow"
            placeholder="0"
            value={typeof minPrice === "number" ? String(minPrice) : ""}
            onChange={(e) => {
              const val = e.target.value;
              if (val === "") setMinPrice(undefined);
              else setMinPrice(Number(val));
            }}
          />
          <span className="flex-shrink-0">-</span>
          <Input
            type="number"
            className="flex-grow"
            placeholder="Max"
            value={typeof maxPrice === "number" ? String(maxPrice) : ""}
            onChange={(e) => {
              const val = e.target.value;
              if (val === "") setMaxPrice(undefined);
              else setMaxPrice(Number(val));
            }}
          />
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
};
