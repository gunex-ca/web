import type { Metadata } from "next";
import Link from "next/link";
import { Search } from "~/components/Serach";
import { api } from "~/trpc/server";

export const metadata: Metadata = {
  title: "Gunex • Buy and sell firearms in Canada",
  description:
    "Discover and list firearms and accessories across Canada. Browse newest listings and connect with sellers.",
  alternates: { canonical: "/" },
};

export default async function Home() {
  const listings = await api.listing.getNewest();

  return (
    <>
      <Search />
      <div className="mx-auto max-w-7xl px-4">
        <div className="py-8">
          <h1 className="font-semibold text-2xl">Newest listings</h1>
          <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {listings.map((listing) => (
              <Link
                key={listing.id}
                href={`/listings/${listing.id}`}
                className="rounded-lg border p-4 hover:shadow"
              >
                <div className="font-medium">{listing.title}</div>
                <div className="line-clamp-2 text-muted-foreground text-sm">
                  {listing.description}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
