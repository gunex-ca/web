import type { FC } from "react";

export const TitleSection: FC<{ title: string }> = ({ title }) => (
  <div className="flex items-start justify-between gap-4">
    <h1 className="font-semibold text-xl leading-tight">{title}</h1>
  </div>
);
