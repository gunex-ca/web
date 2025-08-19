import type { FC } from "react";

export const DescriptionSection: FC<{ description: string }> = ({
  description,
}) => (
  <div className="mt-6 mb-5">
    <h2 className="font-medium text-md text-muted-foreground">Description</h2>
    <div
      className="prose prose-sm dark:prose-invert text-foreground leading-6"
      // biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>
      dangerouslySetInnerHTML={{ __html: description }}
    />
  </div>
);
