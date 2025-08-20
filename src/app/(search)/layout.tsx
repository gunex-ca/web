import type { Metadata } from "next";
import { ListingSearchInput } from "~/components/ListingSerachInput";
import Navbar from "../_components/Navbar";

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <Navbar />
      <ListingSearchInput />
      {children}
    </>
  );
}

export const metadata: Metadata = {
  title: "Listings • Gunex",
  description: "Browse the latest listings on Gunex.",
};
