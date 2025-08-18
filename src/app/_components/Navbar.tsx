import Link from "next/link";

import { headers } from "next/headers";
import { Button } from "~/components/ui/button";
import { auth } from "~/lib/auth";

export default async function Navbar() {
  const session = await auth.api.getSession({ headers: await headers() });

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-14 w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-6">
          <Link href="/" className="font-semibold">
            Gunex
          </Link>
          <nav className="hidden items-center gap-4 text-muted-foreground text-sm md:flex">
            <Link href="/" className="hover:text-foreground">
              Home
            </Link>
            <Link href="/listings/new" className="hover:text-foreground">
              Post a listing
            </Link>
          </nav>
        </div>
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
    </header>
  );
}
