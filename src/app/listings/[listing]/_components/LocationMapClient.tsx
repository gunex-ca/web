"use client";

import dynamic from "next/dynamic";
import type { FC } from "react";

const LocationMapComponent = dynamic(
  () => import("./LocationMap").then((mod) => mod.LocationMap),
  { ssr: false },
);

export const LocationMapClient: FC<{ lat: number; lng: number }> = ({
  lat,
  lng,
}) => {
  return <LocationMapComponent lat={lat} lng={lng} />;
};
