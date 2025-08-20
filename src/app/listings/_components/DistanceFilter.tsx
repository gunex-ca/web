"use client";

import { useEffect, useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Slider } from "~/components/ui/slider";
import { Switch } from "~/components/ui/switch";
import {
  booleanCodec,
  numberCodec,
  optional,
  useQueryParamsSchema,
} from "~/hooks/use-query-params";

type UserLocation = { lat: number; lng: number } | null | false;

// Strongly-typed query params schema for distance filter
const distanceFilterSchema = {
  // Keep explicit value for both true/false to avoid ambiguity; default to true when absent
  global: booleanCodec(true, { serializeFalseAs: "0" }),
  // Optional so we can remove it from URL when global search is enabled
  distance: optional(numberCodec(50, { min: 10, max: 100 })),
  // Optional coordinates; only present when local search is enabled and location known
  lat: optional(numberCodec(0)),
  lng: optional(numberCodec(0)),
} as const;

/**
 * Retrieves the user's geolocation when `enabled` is true.
 *
 * - Returns `null` while loading, `{ lat, lng }` on success, or `false` on error/unsupported.
 * - Also derives `userLat` and `userLng` numbers for simpler dependency tracking.
 *
 * @param enabled When true, attempts to resolve the user's current position
 * @returns `{ userLocation, userLat, userLng }`
 */
function useUserLocation(enabled: boolean) {
  const [userLocation, setUserLocation] = useState<UserLocation>(null);

  useEffect(() => {
    if (!enabled) {
      setUserLocation(null);
      return;
    }

    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) =>
          setUserLocation({
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
          }),
        () => setUserLocation(false)
      );
    } else {
      setUserLocation(false);
    }
  }, [enabled]);

  const userLat = useMemo(
    () =>
      userLocation && typeof userLocation === "object"
        ? userLocation.lat
        : undefined,
    [userLocation]
  );
  const userLng = useMemo(
    () =>
      userLocation && typeof userLocation === "object"
        ? userLocation.lng
        : undefined,
    [userLocation]
  );

  return { userLocation, userLat, userLng } as const;
}

export const DistanceFilter: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();

  const { values, setValues, useParam, setParam } =
    useQueryParamsSchema(distanceFilterSchema);

  const [isGlobalCanada, setIsGlobalCanada] = useParam("global");
  const [distanceKm, setDistanceKm] = useParam("distance");

  const { userLocation, userLat, userLng } = useUserLocation(!isGlobalCanada);

  // Keep URL in sync based on the current state and user location
  useEffect(() => {
    if (isGlobalCanada) {
      setValues({
        global: true,
        distance: undefined,
        lat: undefined,
        lng: undefined,
      });
      return;
    }

    const nextDistance = typeof distanceKm === "number" ? distanceKm : 50;
    setValues({
      global: false,
      distance: nextDistance,
      lat: userLat,
      lng: userLng,
    });
  }, [isGlobalCanada, distanceKm, userLat, userLng, setValues]);

  return (
    <div className="space-y-3">
      <div className="space-y-0.5">
        <h3 className="font-semibold">Search Distance</h3>
      </div>

      <div className="flex items-center gap-2">
        <Switch
          checked={isGlobalCanada}
          onCheckedChange={(checked) => setParam("global", !!checked)}
          aria-label="Search all of Canada"
        />
        <span className="text-muted-foreground text-xs">
          Search all of Canada
        </span>
      </div>

      {!isGlobalCanada && (
        <div className="space-y-2">
          <Slider
            value={[typeof distanceKm === "number" ? distanceKm : 50]}
            onValueChange={(vals) => setParam("distance", vals[0] ?? 50)}
            min={10}
            max={100}
            step={10}
          />

          <div className="text-muted-foreground text-xs">
            Within {typeof distanceKm === "number" ? distanceKm : 50} km
          </div>
          {userLocation === null ? (
            <div className="text-muted-foreground text-xs">
              Getting your location...
            </div>
          ) : userLocation === false ? (
            <div className="text-muted-foreground text-xs">
              Location unavailable
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
};
