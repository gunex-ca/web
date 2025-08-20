import { Nunito } from "next/font/google";
import Link from "next/link";
import { cn } from "~/components/utils";
import { Favicon } from "./Favicon";

const nunito = Nunito({ subsets: ["latin"] });

export default function Footer() {
  return (
    <footer className="mt-auto border-t bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Brand Section */}
          <div className="space-y-4 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 font-bold">
              <Favicon className="size-6 fill-black dark:fill-white" />
              <span
                className={cn("mt-0.5 text-xl tracking-wide", nunito.className)}
              >
                GunEx
              </span>
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Canada's premier marketplace for buying and selling firearms,
              accessories, and archery equipment.
            </p>
          </div>

          {/* Navigation Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-sm uppercase tracking-wide">
              Explore
            </h3>
            <ul className="space-y-2 text-muted-foreground text-sm">
              <li>
                <Link
                  href="/"
                  className="transition-colors hover:text-foreground"
                >
                  Categories
                </Link>
              </li>
              <li>
                <Link
                  href="/listings"
                  className="transition-colors hover:text-foreground"
                >
                  Browse Listings
                </Link>
              </li>
              <li>
                <Link
                  href="/frt"
                  className="transition-colors hover:text-foreground"
                >
                  Firearms Classification
                </Link>
              </li>
              <li>
                <Link
                  href="/listings/new"
                  className="transition-colors hover:text-foreground"
                >
                  Post Listing
                </Link>
              </li>
            </ul>
          </div>

          {/* Company Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-sm uppercase tracking-wide">
              Company
            </h3>
            <ul className="space-y-2 text-muted-foreground text-sm">
              <li>
                <Link
                  href="/about"
                  className="transition-colors hover:text-foreground"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  className="transition-colors hover:text-foreground"
                >
                  FAQ
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="transition-colors hover:text-foreground"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="transition-colors hover:text-foreground"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="transition-colors hover:text-foreground"
                >
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          {/* Support Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-sm uppercase tracking-wide">
              Support
            </h3>
            <ul className="space-y-2 text-muted-foreground text-sm">
              <li>
                <Link
                  href="/transaction-safety"
                  className="transition-colors hover:text-foreground"
                >
                  Transaction Safety
                </Link>
              </li>
              <li>
                <Link
                  href="/safety"
                  className="transition-colors hover:text-foreground"
                >
                  Firearms Safety
                </Link>
              </li>
              <li>
                <Link
                  href="/report"
                  className="transition-colors hover:text-foreground"
                >
                  Report Issue
                </Link>
              </li>
              <li>
                <Link
                  href="/community"
                  className="transition-colors hover:text-foreground"
                >
                  Community Guidelines
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-8 flex flex-col items-center justify-between gap-4 border-t pt-8 sm:flex-row">
          <p className="text-muted-foreground text-sm">
            © {new Date().getFullYear()} GunEx. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-muted-foreground text-sm">
            <Link
              href="/accessibility"
              className="transition-colors hover:text-foreground"
            >
              Accessibility
            </Link>
            <Link
              href="/sitemap"
              className="transition-colors hover:text-foreground"
            >
              Sitemap
            </Link>
            <span>Made in Canada 🇨🇦</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
