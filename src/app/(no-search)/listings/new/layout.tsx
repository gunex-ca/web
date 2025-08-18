import Navbar from "~/app/_components/Navbar";
import type { Metadata } from "next";

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
  title: "New listing • Gunex",
  description: "Create a new listing to sell your item on Gunex.",
  alternates: { canonical: "/listings/new" },
};
