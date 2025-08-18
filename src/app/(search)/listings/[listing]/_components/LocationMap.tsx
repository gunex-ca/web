"use client";

import { Circle, MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import type { FC } from "react";

const RADIUS_METERS = 5000; // 5km

export const LocationMap: FC<{ lat: number; lng: number }> = ({ lat, lng }) => {
  if (typeof window === "undefined") return null;
  return (
    <div className="h-full w-full overflow-hidden rounded-md">
      <MapContainer
        attributionControl={false}
        className="h-full w-full"
        center={[lat, lng]}
        zoom={9}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <Circle
          center={[lat, lng]}
          radius={RADIUS_METERS}
          pathOptions={{
            color: "blue",
            fillColor: "#3b82f6",
            fillOpacity: 0.2,
          }}
        />
      </MapContainer>
    </div>
  );
};
