"use client";

import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { useListingsSearchParams } from "~/hooks/use-listings-search-params";

export const PriceFilter: React.FC = () => {
  const { useParam, setValues } = useListingsSearchParams();
  const [minPrice, setMinPrice] = useParam("minPrice");
  const [maxPrice, setMaxPrice] = useParam("maxPrice");

  return (
    <div className="space-y-2">
      <h3 className="font-semibold text-sm">Price Range</h3>

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
    </div>
  );
};
