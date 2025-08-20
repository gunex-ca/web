import { capitalCase } from "change-case";
import type { FC } from "react";

export type ListingProperties = Record<string, string | number> & {
  manufacturer?: string;
  model?: string;
  caliber?: string;
  action?: string;
  barrelLengthIn?: number;
};

const dontShowIfEmpty = ["sights", "barrelLengthIn"];

// Define the preferred order for property keys
const propertyOrder = [
  "condition",
  "manufacturer",
  "model",
  "caliber",
  "action",
  "classification",
  "handed",
  "capacity",
  "sights",
];

// Custom sort function for properties
const sortProperties = (entries: [string, string | number][]) => {
  return entries.sort(([keyA], [keyB]) => {
    const indexA = propertyOrder.indexOf(keyA);
    const indexB = propertyOrder.indexOf(keyB);

    // If both keys are in the order array, sort by their position
    if (indexA !== -1 && indexB !== -1) {
      return indexA - indexB;
    }

    // If only keyA is in the order array, it comes first
    if (indexA !== -1) return -1;

    // If only keyB is in the order array, it comes first
    if (indexB !== -1) return 1;

    // If neither is in the order array, sort alphabetically
    return keyA.localeCompare(keyB);
  });
};

export const DetailsSection: FC<{ properties: ListingProperties }> = ({
  properties,
}) => (
  <div className="mt-6">
    <h2 className="mb-2 font-medium text-md text-muted-foreground">Details</h2>
    <dl className="space-y-1 text-sm">
      {sortProperties(Object.entries(properties)).map(([key, value]) => {
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
