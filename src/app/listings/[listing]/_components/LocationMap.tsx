"use client";

import { Circle, MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import type { FC } from "react";
import { useEffect, useState } from "react";

const RADIUS_METERS = 10_000; // 10km

const LocationMapComponent: FC<{ lat: number; lng: number }> = ({
  lat,
  lng,
}) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <div className="flex h-full w-full items-center justify-center overflow-hidden rounded-md bg-muted">
        <div className="text-muted-foreground text-sm">Loading map...</div>
      </div>
    );
  }

  try {
    return (
      <div className="h-full w-full overflow-hidden rounded-md">
        <MapContainer
          attributionControl={false}
          className="h-full w-full"
          center={[lat, lng]}
          zoom={7}
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
  } catch (error) {
    console.error("Error rendering map:", error);
    return (
      <div className="flex h-full w-full items-center justify-center overflow-hidden rounded-md bg-muted">
        <div className="text-muted-foreground text-sm">Unable to load map</div>
      </div>
    );
  }
};

export const LocationMap = LocationMapComponent;
