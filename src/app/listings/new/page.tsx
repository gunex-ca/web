import type { Metadata } from "next";
import { CreateListingForm } from "./_components/CreateListingForm";

export const metadata: Metadata = {
  title: "New listing • Gunex",
  description: "Create a new listing to sell your item.",
  alternates: { canonical: "/listings/new" },
};

export default function NewListingPage() {
  return (
    <main className="container mx-auto flex min-h-svh flex-col items-center justify-center px-4">
      <div className="w-full max-w-2xl">
        <div className="mb-6 text-center">
          <h1 className="font-bold text-2xl">Create a listing</h1>
          <p className="mt-1 text-muted-foreground text-sm">
            Fill out the details below to get your listing live.
          </p>
        </div>
        <CreateListingForm />
      </div>
    </main>
  );
}
