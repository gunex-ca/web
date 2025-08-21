import type { Metadata } from "next";
import { headers } from "next/headers";
import Link from "next/link";
import Navbar from "~/app/_components/Navbar";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { auth } from "~/lib/auth";

export const metadata: Metadata = {
  title: "Page Not Found • GunEx",
  description: "The page you're looking for doesn't exist.",
};

export default async function NotFound() {
  const session = await auth.api.getSession({ headers: await headers() });
  const isLoggedIn = !!session;
  return (
    <>
      <Navbar showBorder={true} />
      <main className="container mx-auto max-w-4xl px-4 py-8">
        <div className="flex min-h-[600px] flex-col items-center justify-center space-y-8">
          {/* 404 Header */}
          <div className="space-y-4 text-center">
            <h1 className="font-bold text-6xl text-primary">404</h1>
            <h2 className="font-bold text-3xl">Page Not Found</h2>
            <p className="mx-auto max-w-md text-lg text-muted-foreground">
              Sorry, we couldn't find the page you're looking for. It may have
              been moved, deleted, or doesn't exist.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col gap-4 sm:flex-row">
            <Button asChild size="lg">
              <Link href="/">Go Back Home</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/listings">Browse Listings</Link>
            </Button>
          </div>

          {/* Helpful Links Card */}
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle className="text-center">Quick Links</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                {isLoggedIn && (
                  <Button
                    asChild
                    variant="ghost"
                    size="sm"
                    className="justify-start"
                  >
                    <Link href="/listings/new">Create Listing</Link>
                  </Button>
                )}
                <Button
                  asChild
                  variant="ghost"
                  size="sm"
                  className="justify-start"
                >
                  <Link href="/frt">FRT Search</Link>
                </Button>
                <Button
                  asChild
                  variant="ghost"
                  size="sm"
                  className="justify-start"
                >
                  <Link href="/about">About Us</Link>
                </Button>
                <Button
                  asChild
                  variant="ghost"
                  size="sm"
                  className="justify-start"
                >
                  <Link href="/contact">Contact</Link>
                </Button>
                <Button
                  asChild
                  variant="ghost"
                  size="sm"
                  className="justify-start"
                >
                  <Link href="/faq">FAQ</Link>
                </Button>
                <Button
                  asChild
                  variant="ghost"
                  size="sm"
                  className="justify-start"
                >
                  <Link href="/safety">Safety Guide</Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Search Suggestion */}
          <div className="text-center">
            <p className="text-muted-foreground text-sm">
              Looking for something specific?{" "}
              <Link href="/" className="text-primary hover:underline">
                Try our search
              </Link>
            </p>
          </div>
        </div>
      </main>
    </>
  );
}
