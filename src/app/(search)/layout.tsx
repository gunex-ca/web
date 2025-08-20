import type { Metadata } from "next";
import Navbar from "../_components/Navbar";
import { Search } from "~/components/Serach";

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
