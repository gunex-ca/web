import { headers } from "next/headers";
import Link from "next/link";
import { Button } from "~/components/ui/button";
import { auth } from "~/lib/auth";
import { NavbarContainer } from "./NavbarClient";

export default async function Navbar({
  showBorder = false,
}: {
  showBorder?: boolean;
}) {
  const session = await auth.api.getSession({ headers: await headers() });
  return (
    <NavbarContainer showBorder={showBorder}>
      <div className="mx-auto flex h-14 w-full max-w-7xl items-center justify-between px-4">
        <Link href="/" className="font-semibold">
          Gunex
        </Link>

        <nav className="hidden items-center gap-8 text-muted-foreground text-sm md:flex">
          <Link href="/" className="hover:text-foreground">
            Home
          </Link>
          <Link href="/faq" className="hover:text-foreground">
            FAQ
          </Link>
          <Link href="/about" className="hover:text-foreground">
            About
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          {session == null ? (
            <>
              <Button asChild variant="ghost" size="sm">
                <Link href="/sign-in">Sign in</Link>
              </Button>
              <Button asChild size="sm">
                <Link href="/sign-up">Sign up</Link>
              </Button>
            </>
          ) : (
            <Button asChild size="sm">
              <Link href="/listings/new">Post</Link>
            </Button>
          )}
        </div>
      </div>
    </NavbarContainer>
  );
}
