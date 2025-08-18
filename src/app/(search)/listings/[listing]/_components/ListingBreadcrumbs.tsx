import type { FC } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "~/components/ui/breadcrumb";
import { CATEGORY } from "~/lib/categories";

export const ListingBreadcrumbs: FC<{ categoryId: string }> = ({
  categoryId,
}) => {
  const [categorySlug, subCategorySlug] = categoryId.split(":");
  const categoryObj = CATEGORY[categorySlug ?? ""] ?? CATEGORY.firearms;
  const subCategory = categoryObj?.children.find(
    (c) => c.slug === subCategorySlug
  );
  if (categoryObj == null || subCategory == null) return null;
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href="/listings">{categoryObj.name}</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink
            href={`/listings/${categoryObj.slug}/${subCategorySlug}`}
          >
            {subCategory?.name}
          </BreadcrumbLink>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
};
