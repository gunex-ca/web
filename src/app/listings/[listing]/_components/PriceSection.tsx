import type { FC } from "react";

export const PriceSection: FC<{ price: string }> = ({ price }) => (
  <div className="text-xl">{price}</div>
);
