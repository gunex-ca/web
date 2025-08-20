"use client";

import { Search as SearchIcon } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Input } from "~/components/ui/input";
import { useListingsSearchParams } from "~/hooks/use-listings-search-params";

const popularSearches: string[] = [
  "308",
  "tm22",
  "ruger 10/22",
  "long range",
  "handguns",
  "glock",
  "remington 700",
  "9mm",
  "hunting",
  "scope",
  "ammo",
  "optics",
  "m1 garand",
  "12ga shotguns",
];

export const ListingSearchInput: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { useParam } = useListingsSearchParams();
  const [searchQuery, setSearchQuery] = useParam("q");

  // Local state for the input value
  const [inputValue, setInputValue] = useState(searchQuery ?? "");

  // Sync input value when URL params change
  useEffect(() => {
    setInputValue(searchQuery ?? "");
  }, [searchQuery]);

  const handleSearch = (query: string) => {
    const trimmedQuery = query.trim();
    const searchValue = trimmedQuery === "" ? undefined : trimmedQuery;

    // If we're not on the listings page, navigate there with the search
    if (pathname !== "/listings") {
      const searchParams = new URLSearchParams();
      if (searchValue) {
        searchParams.set("q", searchValue);
      }
      const url = searchParams.toString()
        ? `/listings?${searchParams.toString()}`
        : "/listings";
      router.push(url);
    } else {
      // We're already on listings page, just update the search params
      setSearchQuery(searchValue);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSearch(inputValue);
    }
  };

  return (
    <div className="container mx-auto max-w-7xl items-center gap-2 space-y-2 px-4 py-2">
      <div className="relative w-full">
        <Input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          type="text"
          placeholder="What you looking for? (Press Enter to search)"
          className="w-full bg-transparent! pr-10"
        />
        <SearchIcon className="-translate-y-1/2 pointer-events-none absolute top-1/2 right-3 size-4 text-muted-foreground" />
      </div>
      <div className="flex items-center gap-4 overflow-x-auto px-2 text-sm">
        <span className="text-muted-foreground/70">Popular</span>
        {popularSearches.map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => handleSearch(s)}
            className="whitespace-nowrap text-muted-foreground hover:text-foreground hover:underline"
          >
            {s}
          </button>
        ))}
      </div>
    </div>
  );
};
