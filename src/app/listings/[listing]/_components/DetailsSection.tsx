import { capitalCase } from "change-case";
import type { FC } from "react";

export type ListingProperties = Record<string, string | number> & {
  manufacturer?: string;
  model?: string;
  caliber?: string;
  action?: string;
  barrelLengthIn?: number;
};

const dontShowIfEmpty = "Sights";

export const DetailsSection: FC<{ properties: ListingProperties }> = ({
  properties,
}) => (
  <div className="mt-6">
    <h2 className="mb-2 font-medium text-md text-muted-foreground">Details</h2>
    <dl className="space-y-1 text-sm">
      {Object.entries(properties).map(([key, value]) => {
        if (dontShowIfEmpty.includes(key) && !value) return null;
        return (
          <div key={key} className="flex items-center gap-2">
            <dt className="shrink-0 text-muted-foreground">
              {capitalCase(key)}
            </dt>
            <div className="flex-grow border-t" />
            <dd className="shrink-0 font-medium">
              {value || (
                <span className="font-thin text-muted-foreground">
                  Not specified
                </span>
              )}
            </dd>
          </div>
        );
      })}
    </dl>
  </div>
);
