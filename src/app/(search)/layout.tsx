import type { Metadata } from "next";
import { Search } from "~/components/Serach";
import Navbar from "../_components/Navbar";

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <Navbar />
      <Search />
      {children}
    </>
  );
}

export const metadata: Metadata = {
  title: "Listings • Gunex",
  description: "Browse the latest listings on Gunex.",
};
