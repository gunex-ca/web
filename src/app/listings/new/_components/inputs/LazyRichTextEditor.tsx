import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useEffect, useRef } from "react";
import { cn } from "~/components/utils";

interface LazyRichTextEditorProps {
  content: string;
  onUpdate: (content: string) => void;
  error?: string;
  className?: string;
}

export const LazyRichTextEditor: React.FC<LazyRichTextEditorProps> = ({
  content,
  onUpdate,
  error,
  className,
}) => {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const editor = useEditor({
    extensions: [StarterKit],
    content,
    immediatelyRender: false,
    editorProps: {
      attributes: { class: "focus:outline-none h-full px-3 py-1" },
    },
    onUpdate: ({ editor }) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = setTimeout(() => {
        onUpdate(editor.getHTML());
      }, 500);
    },
  });

  // Update editor content when prop changes
  useEffect(() => {
    if (editor && content !== editor.getHTML()) {
      editor.commands.setContent(content);
    }
  }, [editor, content]);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <EditorContent
      editor={editor}
      className={cn(
        "prose prose-sm dark:prose-invert max-w-none",
        "flex h-[250px] w-full flex-col rounded-md border shadow-xs min-data-[orientation=vertical]:h-72",
        "focus-within:border-ring focus-within:ring-[3px] focus-within:ring-ring/50",
        "rounded-md shadow-xs dark:bg-input/30",
        error ? "border-destructive" : "border-input",
        className
      )}
    />
  );
};
