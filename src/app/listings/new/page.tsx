import type { Metadata } from "next";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "~/components/ui/breadcrumb";
import { CreateListingForm } from "./_components/CreateListingForm";
import { CATEGORY } from "~/lib/categories";
import { notFound } from "next/navigation";
import { Preview } from "./_components/Preview";

export const metadata: Metadata = {
  title: "New listing • Gunex",
  description: "Create a new listing to sell your item.",
  alternates: { canonical: "/listings/new" },
};

export default async function NewListingPage({
  searchParams,
}: {
  searchParams: Promise<{ category: string | string[] | undefined }>;
}) {
  const { category: categoryParam } = await searchParams;

  const categoryValue = Array.isArray(categoryParam)
    ? categoryParam[0]
    : categoryParam;

  const [categorySlug, subCategorySlug] = categoryValue?.split(":") ?? [
    CATEGORY.firearms?.slug,
    CATEGORY.firearms?.children[0]?.slug,
  ];

  const category = CATEGORY[categorySlug ?? ""] ?? CATEGORY.firearms;
  const subCategory = category?.children.find(
    (c) => c.slug === subCategorySlug
  );

  if (category == null || subCategory == null) return notFound();

  return (
    <main className="container mx-auto max-w-7xl px-4 py-8">
      <div className="mb-4">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/listings">{category.name}</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink>{subCategory.name}</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>New</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <div className="mb-6">
        <h1 className="font-bold text-2xl">Create a listing</h1>
        <p className="mt-1 text-muted-foreground text-sm">
          Fill out the details below to get your listing live.
        </p>
      </div>

      <div className="mb-10 flex flex-col gap-10 lg:flex-row lg:items-start">
        <div className="w-full max-w-md">
          <CreateListingForm />
        </div>

        <aside className="w-full lg:sticky lg:top-22 lg:self-start">
          <Preview />
        </aside>
      </div>
    </main>
  );
}
