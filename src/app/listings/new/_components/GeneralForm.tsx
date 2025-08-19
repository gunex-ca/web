import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { useCallback, useRef } from "react";

import { useListingForm } from "./ListingState";
import { ImageUploader } from "./inputs/ImageUploader";
import { cn } from "~/components/utils";
import { Required } from "~/components/Required";

export const GeneralForm: React.FC = () => {
  const { state, update } = useListingForm();

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const debouncedUpdate = useCallback(
    (content: string) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = setTimeout(() => {
        update({ description: content });
      }, 500);
    },
    [update]
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
        <ImageUploader />
      </div>
      <div className="space-y-2">
        <Label>
          Title <Required />
        </Label>
        <Input
          value={state.title}
          onChange={(e) => update({ title: e.target.value })}
        />
      </div>

      <div className="space-y-2">
        <Label>
          Price <Required />
        </Label>
        <Input
          value={Number(state.price)}
          onChange={(e) => update({ price: e.target.valueAsNumber })}
        />
      </div>

      <div className="space-y-2">
        <Label>
          Description <Required />
        </Label>

        <EditorContent
          editor={editor}
          className={cn(
            "pros prose-sm dark:prose-invert",
            "flex h-[250px] w-full flex-col rounded-md border border-input shadow-xs min-data-[orientation=vertical]:h-72",
            "focus-within:border-ring focus-within:ring-[3px] focus-within:ring-ring/50",
            "rounded-md border border-input shadow-xs dark:bg-input/30"
          )}
        />
      </div>
    </div>
  );
};
