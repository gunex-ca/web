import Navbar from "../_components/Navbar";
import type { Metadata } from "next";

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
}

export const metadata: Metadata = {
  title: "Listings • Gunex",
  description: "Browse the latest listings on Gunex.",
};
