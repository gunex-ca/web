import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "~/components/ui/breadcrumb";
import { categories, CATEGORY, type Category } from "~/lib/categories";
import { CreateListingForm } from "./_components/CreateListingForm";
import { ListingFormProvider } from "./_components/ListingState";
import { Preview } from "./_components/Preview";
import Link from "next/link";

export const metadata: Metadata = {
  title: "New listing • Gunex",
  description: "Create a new listing to sell your item.",
  alternates: { canonical: "/listings/new" },
};

const RenderCategory = ({ category }: { category?: Category }) => {
  if (category == null) return null;
  return (
    <div className="flex flex-col gap-3">
      <h2 className="font-semibold text-lg">{category.name}</h2>
      <div className="flex flex-col gap-3">
        {category.children.map((child) => (
          <div
            key={child.id}
            className="text-muted-foreground hover:text-foreground"
          >
            <Link href={`/listings/new?category=${child.id}`}>
              {child.name}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

const RenderCategoryList: React.FC = () => {
  return (
    <main className="container mx-auto max-w-7xl px-4 py-8">
      <h1 className="font-bold text-2xl">
        Choose a category to create your listing
      </h1>
      <p className="mt-1 max-w-2xl text-muted-foreground text-sm">
        Categories help buyers find your item more easily and ensure your
        listing appears in the right place.
      </p>
      <div className="mt-10 grid grid-cols-4 gap-10">
        <div className="space-y-10">
          <RenderCategory category={categories[0]} />
          <RenderCategory category={categories[4]} />
          <RenderCategory category={categories[8]} />
          <RenderCategory category={categories[12]} />
          <RenderCategory category={categories[13]} />
        </div>
        <div className="space-y-10">
          <RenderCategory category={categories[1]} />
          <RenderCategory category={categories[5]} />
          <RenderCategory category={categories[9]} />
        </div>
        <div className="space-y-10">
          <RenderCategory category={categories[2]} />
          <RenderCategory category={categories[6]} />
          <RenderCategory category={categories[10]} />
          <RenderCategory category={categories[14]} />
        </div>
        <div className="space-y-10">
          <RenderCategory category={categories[3]} />
          <RenderCategory category={categories[7]} />
          <RenderCategory category={categories[11]} />
        </div>
      </div>
    </main>
  );
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

  const category = CATEGORY[categoryValue ?? ""];
  if (category == null) return <RenderCategoryList />;
  if ("children" in category) return <RenderCategoryList />;

  if (category == null) return <RenderCategoryList />;

  return (
    <ListingFormProvider subCategoryId={category.id}>
      <main className="container mx-auto max-w-7xl px-4 py-8">
        <div className="mb-4">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="/listings">
                  {category.parent.name}
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink>{category.name}</BreadcrumbLink>
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
          <div className="w-full max-w-lg">
            <CreateListingForm subCategoryId={category.id} />
          </div>

          <aside className="w-full lg:sticky lg:top-22 lg:self-start">
            <Preview />
          </aside>
        </div>
      </main>
    </ListingFormProvider>
  );
}
