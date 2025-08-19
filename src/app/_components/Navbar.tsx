import { Nunito } from "next/font/google";
import { headers } from "next/headers";
import Link from "next/link";
import { Button } from "~/components/ui/button";
import { cn } from "~/components/utils";
import { auth } from "~/lib/auth";
import { Favicon } from "./Favicon";
import { NavbarContainer } from "./NavbarClient";
import { NotificationsDropdown } from "./NotificationsDropdown";
import { ProfileDropdown } from "./ProfileDropdown";
import { ThemeToggle } from "./ThemeToggle";

const nunito = Nunito({ subsets: ["latin"] });

export default async function Navbar({
  showBorder = false,
}: {
  showBorder?: boolean;
}) {
  const session = await auth.api.getSession({ headers: await headers() });
  return (
    <NavbarContainer showBorder={showBorder}>
      <div className="mx-auto flex h-14 w-full max-w-7xl items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2 font-bold">
          <Favicon className="size-6 fill-black dark:fill-white" />
          <span
            className={cn("mt-0.5 text-xl tracking-wide", nunito.className)}
          >
            GunEx
          </span>
        </Link>

        <nav className="hidden items-center gap-8 text-muted-foreground text-sm md:flex">
          <Link href="/" className="hover:text-foreground">
            Categories
          </Link>
          <Link href="/faq" className="hover:text-foreground">
            FAQ
          </Link>
          <Link href="/about" className="hover:text-foreground">
            About
          </Link>
          <Link href="/frt" className="hover:text-foreground">
            Lookup
          </Link>
        </nav>

        {session == null ? (
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Button asChild variant="ghost" size="sm">
              <Link href="/sign-in">Sign in</Link>
            </Button>
            <Button asChild size="sm">
              <Link href="/sign-up">Sign up</Link>
            </Button>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <Button asChild size="sm">
              <Link href="/listings/new">Post</Link>
            </Button>
            <ThemeToggle />
            <NotificationsDropdown notificationCount={3} />
            <ProfileDropdown session={session} />
          </div>
        )}
      </div>
    </NavbarContainer>
  );
}
