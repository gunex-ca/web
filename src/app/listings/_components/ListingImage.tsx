"use client";

import { Nunito } from "next/font/google";
import {
  useEffect,
  useMemo,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";
import { Favicon } from "~/app/_components/Favicon";
import { cn } from "~/components/utils";

type ListingImageProps = {
  src: string;
  alt: string;
  className?: string;
  style?: CSSProperties;
  fallbackClassName?: string;
  fallbackContent?: ReactNode;
};

const nunito = Nunito({ subsets: ["latin"] });

export const ListingImage: React.FC<ListingImageProps> = ({
  src,
  alt,
  className,
  style,
  fallbackClassName,
  fallbackContent = (
    <div className="flex h-full w-full items-center justify-center gap-2 bg-muted">
      <Favicon className="size-6 fill-muted-foreground dark:fill-muted-foreground" />
      <span
        className={cn(
          "mt-0.5 font-bold text-muted-foreground text-xl tracking-wide",
          nunito.className
        )}
      >
        GunEx
      </span>
    </div>
  ),
}) => {
  const initialSrc = useMemo(() => {
    const cleaned = (src ?? "").trim();
    return cleaned.length > 0 ? cleaned : "";
  }, [src]);

  const [currentSrc, setCurrentSrc] = useState<string>(initialSrc);
  const [showFallback, setShowFallback] = useState<boolean>(
    initialSrc.length === 0
  );

  useEffect(() => {
    setCurrentSrc(initialSrc);
    setShowFallback(initialSrc.length === 0);
  }, [initialSrc]);

  if (showFallback) {
    return (
      <div
        aria-label={alt}
        role="img"
        className={cn(className, fallbackClassName)}
        style={style}
      >
        {fallbackContent}
      </div>
    );
  }

  return (
    <img
      src={currentSrc}
      alt={alt}
      className={cn(className)}
      style={style}
      loading="lazy"
      decoding="async"
      onError={() => {
        setShowFallback(true);
      }}
    />
  );
};
