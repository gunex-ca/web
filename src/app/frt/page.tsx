import type { Metadata } from "next";
import Navbar from "~/app/_components/Navbar";
import { Badge } from "~/components/ui/badge";
import { Label } from "~/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import { Select, SelectTrigger, SelectValue } from "~/components/ui/select";
import { typesense } from "~/server/typesense/client";
import type { FRTV1 } from "~/server/typesense/schemas";
import { Search } from "./_components/Search";

export const metadata: Metadata = {
  title: "RCMP Firearms Reference Table (FRT) Search | GunEx",
  description:
    "Search the RCMP Firearms Reference Table (FRT) on GunEx by FRN, manufacturer, model, country, action and calibre.",
  keywords: [
    "RCMP",
    "FRT",
    "Firearms Reference Table",
    "FRN",
    "firearms",
    "guns",
    "Canada",
    "manufacturer",
    "model",
    "calibre",
  ],
  openGraph: {
    title: "RCMP Firearms Reference Table (FRT) Search | GunEx",
    description:
      "Search the RCMP Firearms Reference Table (FRT) on GunEx by FRN, manufacturer, model, country, action and calibre.",
    url: "/frt",
    siteName: "GunEx",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "RCMP Firearms Reference Table (FRT) Search | GunEx",
    description:
      "Search the RCMP Firearms Reference Table (FRT) on GunEx by FRN, manufacturer, model, country, action and calibre.",
  },
  alternates: {
    canonical: "/frt",
  },
};

const FilterOptions: React.FC = () => {
  return (
    <aside className="mb-4 w-full rounded-md bg-background p-4 md:mb-0 md:w-64">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label>Type</Label>
          <Select>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a type" />
            </SelectTrigger>
          </Select>
        </div>
        <div className="space-y-2">
          <Label>Caliber</Label>
          <Select>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a caliber" />
            </SelectTrigger>
          </Select>
        </div>
        <div className="space-y-2">
          <Label>Manufacturer</Label>
          <Select>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a caliber" />
            </SelectTrigger>
          </Select>
        </div>
      </div>
    </aside>
  );
};

const CalibresRow: React.FC<{
  calibres: string[] | string | undefined;
  maxShow?: number;
}> = ({ calibres, maxShow = 2 }) => {
  const list = Array.isArray(calibres) ? calibres : calibres ? [calibres] : [];
  const shown = list.slice(0, maxShow);
  const remaining = list.length - shown.length;
  return (
    <div className="mt-2 flex flex-wrap items-center gap-1 text-xs">
      <span className="text-muted-foreground">Calibres:</span>
      <>
        {shown.map((cal: string) => (
          <span
            key={cal}
            className="rounded bg-muted px-2 py-0.5 font-medium text-xs"
          >
            {cal}
          </span>
        ))}
        {remaining > 0 && (
          <Popover>
            <PopoverTrigger asChild>
              <span className="cursor-pointer rounded bg-muted px-2 py-0.5 font-medium text-xs">
                +{remaining} more
              </span>
            </PopoverTrigger>
            <PopoverContent align="start" className="w-64">
              <div className="flex flex-wrap gap-1">
                {list.map((cal: string) => (
                  <span
                    key={`all-${cal}`}
                    className="rounded bg-muted px-2 py-0.5 font-medium text-xs"
                  >
                    {cal}
                  </span>
                ))}
              </div>
            </PopoverContent>
          </Popover>
        )}
      </>
    </div>
  );
};

function formatLegalClassLabel(raw: string | undefined): string {
  if (!raw) return "Unknown";
  const normalized = raw.replace(/[_-]+/g, " ").toLowerCase();
  return normalized.replace(/\b\w/g, (c) => c.toUpperCase());
}

export default async function FRT({
  searchParams,
}: {
  searchParams: Promise<{
    q: string;
    type: string;
    caliber: string;
    manufacturer: string;
    page: string;
  }>;
}) {
  const { q = "*", page = "1" } = await searchParams;
  const perPage = 50;
  const pageNumber = Number.parseInt(page, 10);

  const collection = typesense.collections<FRTV1>("frt_v1");
  const searchResult = await collection.documents().search({
    q,
    query_by: ["frn", "manufacturer", "model", "country", "action", "calibres"],
    query_by_weights: [100, 30, 50, 10, 10, 10],
    per_page: perPage,
    page: pageNumber,
  });

  return (
    <>
      <Navbar />
      <Search />
      <div className="container mx-auto max-w-7xl py-2">
        <div className="flex flex-col gap-6 md:flex-row">
          <div className="md:w-1/4">
            <FilterOptions />
          </div>
          <div className="flex-1">
            {searchResult.hits?.map((hit) => (
              <div
                key={hit.document.id}
                className="mb-4 rounded-lg border bg-card p-4 shadow-sm"
              >
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                  {/* Optionally show an image beside the gun */}
                  <div className="flex items-center gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <div className="font-semibold text-lg">
                          {hit.document.manufacturer} {hit.document.model}
                        </div>
                        <Badge
                          className={`capitalize ${
                            hit.document.legal_class === "Prohibited"
                              ? "bg-destructive/10 text-destructive"
                              : hit.document.legal_class === "Restricted"
                                ? "bg-yellow-500/10 text-yellow-500"
                                : hit.document.legal_class === "Non-Restricted"
                                  ? "bg-green-500/10 text-green-500"
                                  : "bg-gray-500/10 text-gray-500"
                          }`}
                        >
                          {formatLegalClassLabel(hit.document.legal_class)}
                        </Badge>
                      </div>
                      <div className="text-muted-foreground text-sm">
                        FRT:{" "}
                        <span className="font-mono">{hit.document.frn}</span>
                      </div>
                      <div className="mt-1 flex flex-wrap gap-2 text-muted-foreground text-xs">
                        <span>
                          <span className="font-medium">Type:</span>{" "}
                          {hit.document.type}
                        </span>
                        <span>
                          <span className="font-medium">Action:</span>{" "}
                          {hit.document.action}
                        </span>
                        <span>
                          <span className="font-medium">Country:</span>{" "}
                          {hit.document.country}
                        </span>
                      </div>

                      <CalibresRow
                        calibres={hit.document.calibres}
                        maxShow={2}
                      />
                    </div>
                  </div>
                  <div>
                    {hit.document.images.length > 0 && (
                      <img
                        src={hit.document.images[0]}
                        alt={`${hit.document.manufacturer} ${hit.document.model}`}
                        className="h-20 w-32 flex-shrink-0 rounded-md border bg-muted object-cover"
                        style={{ minWidth: 120, minHeight: 80 }}
                      />
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
