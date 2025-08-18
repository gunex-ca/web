"use client";

import { useEffect, useState } from "react";
import { cn } from "~/components/utils";

export const NavbarContainer = ({
  children,
  showBorder = false,
  className,
}: {
  className?: string;
  children: React.ReactNode;
  showBorder?: boolean;
}) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 w-full bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60",
        isScrolled || showBorder ? "border-b" : "",
        className,
      )}
    >
      {children}
    </header>
  );
};
