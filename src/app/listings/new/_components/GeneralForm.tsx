import { lazy, Suspense, useCallback } from "react";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Skeleton } from "~/components/ui/skeleton";

import { Required } from "~/components/Required";
import { cn } from "~/components/utils";
import { useListingForm } from "./ListingState";

// Lazy load the rich text editor
const LazyRichTextEditor = lazy(() =>
  import("./inputs/LazyRichTextEditor").then((module) => ({
    default: module.LazyRichTextEditor,
  }))
);

// Lazy load the image uploader
const LazyImageUploader = lazy(() =>
  import("./inputs/LazyImageUploader").then((module) => ({
    default: module.LazyImageUploader,
  }))
);

export const GeneralForm: React.FC<{
  errors?: {
    title?: string;
    description?: string;
    price?: string;
    images?: string;
  };
  onClearError?: (field: "title" | "description" | "price" | "images") => void;
}> = ({ errors = {}, onClearError }) => {
  const { state, update } = useListingForm();

  const handleDescriptionUpdate = useCallback(
    (content: string) => {
      onClearError?.("description"); // Clear error immediately when user starts typing
      update({ description: content });
    },
    [update, onClearError]
  );

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label>
          Images <Required />
        </Label>
        <Suspense
          fallback={
            <div className="space-y-2">
              <Skeleton className="h-32 w-full rounded-md" />
              <div className="text-muted-foreground text-sm">
                Loading image uploader...
              </div>
            </div>
          }
        >
          <LazyImageUploader
            files={state.images}
            onUpdate={(images) => {
              update({ images });
              onClearError?.("images");
            }}
          />
        </Suspense>
        {errors.images && (
          <p className="text-destructive text-sm">{errors.images}</p>
        )}
      </div>
      <div className="space-y-2">
        <Label>
          Title <Required />
        </Label>
        <Input
          value={state.title}
          onChange={(e) => {
            update({ title: e.target.value });
            onClearError?.("title");
          }}
          className={errors.title ? "border-destructive" : ""}
        />
        {errors.title && (
          <p className="text-destructive text-sm">{errors.title}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label>
          Price <Required />
        </Label>
        <div className="relative">
          <span className="-translate-y-1/2 pointer-events-none absolute top-1/2 left-3 text-muted-foreground">
            $
          </span>
          <Input
            type="number"
            value={state.price}
            max={49_999}
            min={0}
            onChange={(e) => {
              update({ price: Number(e.target.value) });
              onClearError?.("price");
            }}
            className={cn("pl-8", errors.price ? "border-destructive" : "")}
          />
        </div>
        {errors.price && (
          <p className="text-destructive text-sm">{errors.price}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label>
          Description <Required />
        </Label>

        <Suspense
          fallback={
            <div className="space-y-2">
              <Skeleton className="h-[250px] w-full rounded-md" />
              <div className="text-muted-foreground text-sm">
                Loading editor...
              </div>
            </div>
          }
        >
          <LazyRichTextEditor
            content={state.description}
            onUpdate={handleDescriptionUpdate}
            error={errors.description}
          />
        </Suspense>
        {errors.description && (
          <p className="text-destructive text-sm">{errors.description}</p>
        )}
      </div>
    </div>
  );
};
