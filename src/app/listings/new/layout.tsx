import type { Metadata } from "next";
import Navbar from "~/app/_components/Navbar";

export default function ListingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar showBorder />
      {children}
    </>
  );
}

export const metadata: Metadata = {
  title: "New listing • GunEx",
  description: "Create a new listing to sell your item on GunEx.",
  alternates: { canonical: "/listings/new" },
};
