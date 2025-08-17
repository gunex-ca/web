"use client";

import { Phone } from "lucide-react";
import { useState } from "react";
import { Button } from "~/components/ui/button";

type PhoneRevealProps = {
  phoneNumber: string;
  className?: string;
};

export function PhoneReveal({ phoneNumber, className }: PhoneRevealProps) {
  const [revealed, setRevealed] = useState(false);

  const masked = phoneNumber.replace(/\d/g, (d, i) =>
    i < phoneNumber.length - 4 ? "•" : d,
  );

  return (
    <div className={className}>
      <div className="flex items-center justify-between gap-3 rounded-md border p-3">
        <div className="min-w-0">
          <div className="text-muted-foreground text-xs">Phone</div>
          {revealed ? (
            <a
              href={`tel:${phoneNumber}`}
              className="truncate font-medium hover:underline"
            >
              {phoneNumber}
            </a>
          ) : (
            <div className="truncate font-medium">{masked}</div>
          )}
        </div>
        {!revealed ? (
          <Button
            onClick={() => setRevealed(true)}
            className="shrink-0"
            size="sm"
          >
            <Phone className="size-4" />
            Show
          </Button>
        ) : null}
      </div>
    </div>
  );
}
