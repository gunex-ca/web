import { eq } from "drizzle-orm";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { auth } from "~/lib/auth";
import { findPostalCode } from "~/lib/location/postal-codes";
import { db } from "~/server/db";
import * as schema from "~/server/db/schema";
import { LocationMapClient } from "../(search)/listings/[listing]/_components/LocationMapClient";
import { EditMemberInfoForm, EditProfileForm } from "./_components/ProfileForm";

export default async function ProfilePage() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect("/sign-in");

  const user = await db.query.user.findFirst({
    where: eq(schema.user.id, session.user.id),
  });
  if (!user) redirect("/sign-in");

  const postalCode =
    user.postalCode == null || user.postalCode === ""
      ? null
      : findPostalCode(user.postalCode ?? "");

  console.log(postalCode);

  return (
    <div className="container mx-auto max-w-4xl space-y-8 px-4 py-8">
      <div className="flex flex-col gap-4">
        <h1 className="font-bold text-2xl">Edit Profile</h1>
      </div>

      <Card className="bg-transparent">
        <CardHeader>
          <CardTitle>Account</CardTitle>
          <CardDescription>
            Manage your account settings and preferences.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <EditProfileForm user={user} />
        </CardContent>
      </Card>

      <Card className="bg-transparent">
        <CardHeader>
          <CardTitle>Member Info</CardTitle>
          <CardDescription>
            Manage your member information and preferences.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-2 gap-4">
          <EditMemberInfoForm user={user} />
          {postalCode?.latitude && postalCode.longitude && (
            <LocationMapClient
              lat={postalCode.latitude}
              lng={postalCode.longitude}
            />
          )}
        </CardContent>
      </Card>
    </div>
  );
}
