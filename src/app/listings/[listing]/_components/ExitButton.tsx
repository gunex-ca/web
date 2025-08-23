"use client";
import { X } from "lucide-react";
import { Button } from "~/components/ui/button";
import { cn } from "~/components/utils";
import { useEffect, useState } from "react";

export const ExitButton = ({ className }: { className?: string }) => {
  const [canGoBack, setCanGoBack] = useState(false);

  useEffect(() => {
    // Get the URL of the previous page, if available and check if we can go back
    let shouldShowButton = false;
    let previousUrl: string | null = null;

    if (typeof window !== "undefined") {
      shouldShowButton = window.history.length > 1;
      if (document.referrer) {
        previousUrl = document.referrer;
      }
    }

    // If previousUrl is the same website, set canGoBack to true
    if (typeof window !== "undefined" && previousUrl) {
      try {
        const prev = new URL(previousUrl);
        if (prev.origin === window.location.origin) {
          shouldShowButton = true;
        } else {
          shouldShowButton = false;
        }
      } catch {
        // If parsing fails, do nothing
      }
    }

    setCanGoBack(shouldShowButton);
  }, []);

  // Listen for escape key to go back
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && canGoBack) {
        window.history.back();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [canGoBack]);

  if (!canGoBack) return null;

  return (
    <Button
      variant="secondary"
      size="icon"
      className={cn("z-20 rounded-full", className)}
      onClick={() => window.history.back()}
    >
      <X />
    </Button>
  );
};
