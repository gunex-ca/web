"use client";

import { SearchIcon } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { Input } from "~/components/ui/input";

export const Search: React.FC = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  return (
    <div className="container mx-auto max-w-7xl items-center gap-2 space-y-2 px-4 py-2">
      <div className="relative w-full">
        <Input
          type="text"
          placeholder="Search for a firearm..."
          className="w-full bg-transparent! pr-10"
          defaultValue={searchParams.get("q") ?? ""}
          onChange={(e) => {
            router.push(`/frt?q=${e.target.value}`);
          }}
        />
        <SearchIcon className="-translate-y-1/2 pointer-events-none absolute top-1/2 right-3 size-4 text-muted-foreground" />
      </div>
    </div>
  );
};
