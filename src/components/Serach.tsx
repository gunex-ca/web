import { Search as SearchIcon } from "lucide-react";
import Link from "next/link";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";

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

export const Search: React.FC = () => {
  return (
    <div className="container mx-auto max-w-7xl items-center gap-2 space-y-2 px-4 py-2">
      <div className="relative w-full">
        <Input
          type="text"
          placeholder="What you looking for?"
          className="w-full bg-transparent! pr-10"
        />
        <SearchIcon className="-translate-y-1/2 pointer-events-none absolute top-1/2 right-3 size-4 text-muted-foreground" />
      </div>
      <div className="flex items-center gap-4 overflow-x-auto px-2 text-sm">
        <span className="text-muted-foreground/70">Popular</span>
        {popularSearches.map((s) => (
          <Link
            key={s}
            href={`/listings?q=${encodeURIComponent(s)}`}
            className="whitespace-nowrap text-muted-foreground hover:text-foreground hover:underline"
          >
            {s}
          </Link>
        ))}
      </div>
    </div>
  );
};
