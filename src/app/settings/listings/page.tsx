import { eq } from "drizzle-orm";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "~/lib/auth";
import { db } from "~/server/db";
import * as schema from "~/server/db/schema";

export default async function ListingsPage() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect("/sign-in");

  const user = await db.query.user.findFirst({
    where: eq(schema.user.id, session.user.id),
    with: {
      listings: true,
    },
  });
  if (!user) redirect("/sign-in");
  return (
    <div className="container mx-auto max-w-7xl px-4 py-8">
      <div className="flex flex-col gap-4">
        <h1 className="font-bold text-2xl">Listings</h1>
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {user.listings.map((listing) => (
          <div key={listing.id}>{listing.title}</div>
        ))}
      </div>
    </div>
  );
}
