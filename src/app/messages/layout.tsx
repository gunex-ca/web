import { auth } from "~/lib/auth";
import Navbar from "../_components/Navbar";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function MessagesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session)
    redirect(`/sign-in?redirect=${encodeURIComponent("/messages")}`);

  return (
    <>
      <Navbar showBorder />
      {children}
    </>
  );
}
