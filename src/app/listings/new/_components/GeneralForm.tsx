import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { useCallback, useRef } from "react";
import type { FilePondFile, FilePondInitialFile } from "filepond/types";

import { useListingForm } from "./ListingState";
import { ImageUploader } from "./inputs/ImageUploader";
import { cn } from "~/components/utils";
import { Required } from "~/components/Required";

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

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const debouncedUpdate = useCallback(
    (content: string) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      onClearError?.("description"); // Clear error immediately when user starts typing
      timeoutRef.current = setTimeout(() => {
        update({ description: content });
      }, 500);
    },
    [update, onClearError]
  );

  const editor = useEditor({
    extensions: [StarterKit],
    content: state.description,
    immediatelyRender: false,
    editorProps: {
      attributes: { class: "focus:outline-none h-full px-3 py-1" },
    },
    onUpdate: ({ editor }) => debouncedUpdate(editor.getHTML()),
  });

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label>
          Images <Required />
        </Label>
        <ImageUploader
          files={state.images}
          onUpdate={(images) => {
            update({ images });
            onClearError?.("images");
          }}
        />
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

        <EditorContent
          editor={editor}
          className={cn(
            "prose prose-sm dark:prose-invert max-w-none",
            "flex h-[250px] w-full flex-col rounded-md border shadow-xs min-data-[orientation=vertical]:h-72",
            "focus-within:border-ring focus-within:ring-[3px] focus-within:ring-ring/50",
            "rounded-md shadow-xs dark:bg-input/30",
            errors.description ? "border-destructive" : "border-input"
          )}
        />
        {errors.description && (
          <p className="text-destructive text-sm">{errors.description}</p>
        )}
      </div>
    </div>
  );
};
