import type { Metadata } from "next";
import { Suspense } from "react";
import { ListingSearchInput } from "~/components/ListingSerachInput";
import Navbar from "../_components/Navbar";

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <Navbar />
      <Suspense fallback={<div className="h-20" />}>
        <ListingSearchInput />
      </Suspense>
      {children}
    </>
  );
}

export const metadata: Metadata = {
  title: "Listings • GunEx",
  description: "Browse the latest listings on GunEx.",
};
