import type { FC } from "react";
import { formatDistanceStrict } from "date-fns";

export const MetaRow: FC<{ createdAt: Date; location: string }> = ({
  createdAt,
  location,
}) => (
  <div className="mt-2 text-muted-foreground text-xs">
    Listed {formatDistanceStrict(createdAt, new Date(), { addSuffix: true })}
    {" in "}
    {location}
  </div>
);
