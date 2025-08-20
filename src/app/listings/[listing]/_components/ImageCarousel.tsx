"use client";

import * as React from "react";
import { useEffect, useState } from "react";

import { Button } from "~/components/ui/button";
import { cn } from "~/components/utils";

type ImageCarouselProps = {
  images: string[];
  className?: string;
};

export function ImageCarousel({ images, className }: ImageCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const imageCount = images.length;

  useEffect(() => {
    if (currentIndex >= imageCount) setCurrentIndex(0);
  }, [currentIndex, imageCount]);

  const goTo = (index: number) => {
    if (imageCount === 0) return;
    const next = (index + imageCount) % imageCount;
    setCurrentIndex(next);
  };

  const goPrev = React.useCallback(() => {
    setCurrentIndex(
      (prev) =>
        (((prev - 1 + imageCount) % imageCount) + imageCount) % imageCount,
    );
  }, [imageCount]);
  const goNext = React.useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % imageCount);
  }, [imageCount]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        goPrev();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        goNext();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [goNext, goPrev]);

  if (imageCount === 0) {
    return (
      <div
        className={cn(
          "relative grid h-full w-full grid-rows-[1fr_auto] gap-2 overflow-hidden rounded-l-md",
          className,
        )}
      >
        <div className="flex items-center justify-center">
          <div className="text-muted-foreground text-sm">No images</div>
        </div>
        <div className="h-0" />
      </div>
    );
  }

  const current = images[currentIndex];
  if (!current) return null;

  return (
    <div
      className={cn(
        "relative grid h-full w-full grid-rows-[1fr_auto] gap-2 overflow-hidden rounded-md",
        className,
      )}
    >
      <img
        src={current}
        alt={"Listing image"}
        className="absolute inset-0 h-full w-full scale-110 object-cover blur-lg"
        aria-hidden="true"
      />

      <div className="relative z-10 flex min-h-0 items-center justify-center overflow-hidden">
        <img
          src={current}
          alt={"Listing display"}
          className="z-10 h-full w-full object-contain shadow-lg"
        />

        {imageCount > 1 && (
          <>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              aria-label="Previous image"
              onClick={goPrev}
              className="-translate-y-1/2 absolute top-1/2 left-2 z-20 rounded-full bg-background/70 hover:bg-background/90"
            >
              <svg
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="size-5"
              >
                <path
                  fillRule="evenodd"
                  d="M15.53 4.47a.75.75 0 010 1.06L9.06 12l6.47 6.47a.75.75 0 11-1.06 1.06l-7-7a.75.75 0 010-1.06l7-7a.75.75 0 011.06 0z"
                  clipRule="evenodd"
                />
              </svg>
            </Button>

            <Button
              type="button"
              variant="ghost"
              size="icon"
              aria-label="Next image"
              onClick={goNext}
              className="-translate-y-1/2 absolute top-1/2 right-2 z-20 rounded-full bg-background/70 hover:bg-background/90"
            >
              <svg
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="size-5"
              >
                <path
                  fillRule="evenodd"
                  d="M8.47 19.53a.75.75 0 010-1.06L14.94 12 8.47 5.53a.75.75 0 111.06-1.06l7 7a.75.75 0 010 1.06l-7 7a.75.75 0 01-1.06 0z"
                  clipRule="evenodd"
                />
              </svg>
            </Button>
          </>
        )}
      </div>

      {imageCount > 1 && (
        <div className="relative z-10 mt-2 flex w-full items-center justify-center gap-2 overflow-x-auto px-2 pb-2">
          {images.map((img, index) => {
            const isActive = index === currentIndex;
            return (
              <button
                key={img}
                type="button"
                onClick={() => goTo(index)}
                className={cn(
                  "relative mt-2 h-16 w-24 shrink-0 overflow-hidden rounded border transition-all",
                  isActive
                    ? "ring-2 ring-primary ring-offset-2"
                    : "opacity-80 hover:opacity-100",
                )}
                aria-current={isActive ? "true" : undefined}
                aria-label={`Go to image ${index + 1}`}
              >
                <img
                  src={img}
                  alt={`Listing ${index}`}
                  className="h-full w-full object-fill"
                />
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
