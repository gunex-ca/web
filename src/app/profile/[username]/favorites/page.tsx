import { eq } from "drizzle-orm";
import { headers } from "next/headers";
import { notFound } from "next/navigation";
import { auth } from "~/lib/auth";
import { db } from "~/server/db";
import * as schema from "~/server/db/schema";

export default async function FavouritesPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session?.user) return notFound();

  const user = await db.query.user.findFirst({
    where: eq(schema.user.id, session.user.id),
  });

  if (!user) return notFound();
  if (user.id !== session.user.id) return notFound();

  const favourites = await db.query.favorite.findMany({
    where: eq(schema.favorite.userId, session.user.id),
    with: {
      listing: {
        with: {
          images: true,
          seller: true,
        },
      },
    },
  });

  if (favourites.length === 0) {
    return (
      <p className="py-12 text-center text-muted-foreground">
        You have not favourited any listings yet.
      </p>
    );
  }

  return (
    <div>
      {favourites.map((favourite) => (
        <div key={favourite.id}>
          <h2>{favourite.listing.title}</h2>
        </div>
      ))}
    </div>
  );
}
