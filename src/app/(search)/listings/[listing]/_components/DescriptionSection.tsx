import type { FC } from "react";

export const DescriptionSection: FC<{ description: string }> = ({
  description,
}) => (
  <div className="mt-6">
    <h2 className="mb-2 font-medium text-md text-muted-foreground">
      Description
    </h2>
    <p className="text-sm leading-6">{description}</p>
  </div>
);
