"use client";

import type { FC } from "react";
import { useEffect, useRef, useState } from "react";
import { Button } from "~/components/ui/button";

export const DescriptionSection: FC<{ description: string }> = ({
  description,
}) => {
  const [expanded, setExpanded] = useState(false);
  const [showToggle, setShowToggle] = useState(false);
  const contentRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;

    const checkOverflow = () => {
      if (!el) return;
      const isOverflowing = el.scrollHeight > el.clientHeight + 1;
      setShowToggle(isOverflowing);
    };

    // Measure after initial render (only when collapsed)
    if (!expanded) checkOverflow();

    // Re-measure on container resize when collapsed
    const resizeObserver = new ResizeObserver(() => {
      if (!expanded) checkOverflow();
    });
    resizeObserver.observe(el);
    return () => resizeObserver.disconnect();
  }, [expanded]);

  // Render sanitized HTML content into the container without using dangerouslySetInnerHTML
  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;
    el.innerHTML = description;
    if (!expanded) {
      const isOverflowing = el.scrollHeight > el.clientHeight + 1;
      setShowToggle(isOverflowing);
    }
  }, [description, expanded]);

  const clampClassName = expanded ? "" : "line-clamp-5";

  return (
    <div className="mt-6 mb-5">
      <h2 className="font-medium text-md text-muted-foreground">Description</h2>
      <div
        ref={contentRef}
        className={`prose prose-sm dark:prose-invert text-foreground leading-6 ${clampClassName}`}
      />
      {showToggle ? (
        <div className="mt-2">
          <Button
            variant="link"
            className="h-auto p-0"
            onClick={() => setExpanded((v) => !v)}
          >
            {expanded ? "Show less" : "Show more"}
          </Button>
        </div>
      ) : null}
    </div>
  );
};
