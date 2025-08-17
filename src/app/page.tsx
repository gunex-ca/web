import Link from "next/link";

import { LatestPost } from "~/app/_components/post";
import { HydrateClient, api } from "~/trpc/server";

export default async function Home() {
  const listings = await api.listing.getNewest();

  return (
    <HydrateClient>
      <div>Hello</div>
    </HydrateClient>
  );
}
