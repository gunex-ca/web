import { eq } from "drizzle-orm";
import { headers } from "next/headers";
import { notFound } from "next/navigation";
import { auth } from "~/lib/auth";
import { db } from "~/server/db";
import * as schema from "~/server/db/schema";
import { InfoForm } from "./_components/InfoForm";

export default async function Onboarding() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) notFound();

  const user = await db.query.user.findFirst({
    where: eq(schema.user.id, session.user.id),
  });
  if (!user) notFound();

  return (
    <main className="container mx-auto flex min-h-svh flex-col items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="mb-6 text-center">
          <h1 className="font-bold text-2xl">Onboarding</h1>
          <p className="mt-1 text-muted-foreground text-sm">
            Let&apos;s get you started.
          </p>
        </div>
        <InfoForm user={user} />
      </div>
    </main>
  );
}
