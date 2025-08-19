import { eq } from "drizzle-orm";

import {
  Award,
  CalendarPlus,
  Heart,
  List,
  Locate,
  MessageCircle,
  MessageCircleMore,
} from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { StarRating } from "~/app/(search)/listings/[listing]/_components/SellersSection";
import Navbar from "~/app/_components/Navbar";
import { Button } from "~/components/ui/button";
import { findPostalCode } from "~/lib/location/postal-codes";
import { db } from "~/server/db";
import * as schema from "~/server/db/schema";

export default async function ProfilePage({
  params,

  children,
}: {
  children: React.ReactNode;

  params: Promise<{ username: string }>;
}) {
  const { username } = await params;
  const user = await db.query.user.findFirst({
    where: eq(schema.user.username, username),
  });

  if (!user) return notFound();

  const postalCode =
    user.postalCode == null || user.postalCode === ""
      ? null
      : findPostalCode(user.postalCode ?? "");

  return (
    <>
      <Navbar showBorder />
      <div className="container mx-auto max-w-7xl space-y-8 px-4 py-14">
        <div className="flex gap-8">
          <div className="flex-shrink-0 space-y-10 ">
            <div className="w-[250px] space-y-4 rounded-lg">
              <div className="space-y-1">
                <h1 className="font-bold text-2xl">{user.username}</h1>
                <p className="flex items-center gap-1 text-muted-foreground text-sm">
                  <Locate className="size-3" />
                  {postalCode ? (
                    <>
                      {postalCode?.city}, {postalCode?.province}
                    </>
                  ) : (
                    "Canada"
                  )}
                </p>
                <div className="flex items-center gap-2">
                  <StarRating rating={4.5} reviewCount={10} />
                  <p className="text-muted-foreground text-sm">{10} reviews</p>
                </div>
              </div>

              <div className="flex items-center gap-2 text-green-600 text-sm dark:text-green-400">
                <Award className="size-5" />
                <span>High-rated seller</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <CalendarPlus className="size-4" />
                <span>Joined in {user.createdAt.getFullYear()}</span>
              </div>
            </div>

            <div className="space-y-2">
              <p className="font-bold text-sm">Buying & Selling</p>
              <div className="space-y-1">
                <Button
                  asChild
                  variant="ghost"
                  className="w-full justify-start"
                >
                  <Link href={`/profile/${username}`}>
                    <List /> Listings
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="ghost"
                  className="w-full justify-start"
                >
                  <Link href={`/profile/${username}/reviews`}>
                    <MessageCircleMore /> Reviews
                  </Link>
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <p className="font-bold text-sm">Personal</p>
              <div className="space-y-1">
                <Button
                  asChild
                  variant="ghost"
                  className="w-full justify-start"
                >
                  <Link href={`/profile/${username}/favorites`}>
                    <Heart /> Favorites
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="ghost"
                  className="w-full justify-start"
                >
                  <Link href={`/profile/${username}/reviews`}>
                    <MessageCircle /> Messages
                  </Link>
                </Button>
              </div>
            </div>
          </div>
          <div className="flex-grow">{children}</div>
        </div>
      </div>
    </>
  );
}
