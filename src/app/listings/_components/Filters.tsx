"use client";

import { useEffect, useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Slider } from "~/components/ui/slider";
import { Switch } from "~/components/ui/switch";

export const DistanceFilter: React.FC = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const currentQueryIsGlobalCanada = useMemo(() => {
    const value = searchParams.get("global");
    if (value === null) return true; // default to global when unspecified
    return value === "1" || value === "true";
  }, [searchParams]);
  const currentQueryDistanceKm = useMemo(() => {
    const parsed = Number(searchParams.get("distance") ?? "50");
    return Number.isFinite(parsed) ? parsed : 50;
  }, [searchParams]);
  const searchParamsString = useMemo(
    () => searchParams.toString(),
    [searchParams]
  );

  const [isGlobalCanada, setIsGlobalCanada] = useState(
    currentQueryIsGlobalCanada
  );
  const [distanceKm, setDistanceKm] = useState<number>(currentQueryDistanceKm);

  // Simplified user location state: null = loading, {lat, lng}, or false = error
  const [userLocation, setUserLocation] = useState<
    { lat: number; lng: number } | null | false
  >(null);

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

  useEffect(() => {
    if (!isGlobalCanada) {
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
    }
  }, [isGlobalCanada]);

  useEffect(() => {
    if (
      isGlobalCanada === currentQueryIsGlobalCanada &&
      (isGlobalCanada || distanceKm === currentQueryDistanceKm)
    ) {
      return;
    }

    const params = new URLSearchParams(searchParamsString);
    if (isGlobalCanada) {
      params.set("global", "1");
      params.delete("distance");
      params.delete("lat");
      params.delete("lng");
    } else {
      params.delete("global");
      params.set("distance", String(distanceKm));
      if (userLat !== undefined && userLng !== undefined) {
        params.set("lat", String(userLat));
        params.set("lng", String(userLng));
      } else {
        params.delete("lat");
        params.delete("lng");
      }
    }

    router.replace(`${pathname}?${params.toString()}`);
  }, [
    isGlobalCanada,
    distanceKm,
    pathname,
    router,
    searchParamsString,
    currentQueryIsGlobalCanada,
    currentQueryDistanceKm,
    userLat,
    userLng,
  ]);

  return (
    <div className="space-y-3">
      <div className="space-y-0.5">
        <h3 className="font-semibold">Search Distance</h3>
      </div>

      <div className="flex items-center gap-2">
        <Switch
          checked={isGlobalCanada}
          onCheckedChange={(checked) => setIsGlobalCanada(!!checked)}
          aria-label="Search all of Canada"
        />
        <span className="text-muted-foreground text-xs">
          Search all of Canada
        </span>
      </div>

      {!isGlobalCanada && (
        <div className="space-y-2">
          <Slider
            value={[distanceKm]}
            onValueChange={(vals) => setDistanceKm(vals[0] ?? distanceKm)}
            min={10}
            max={100}
            step={10}
          />

          <div className="text-muted-foreground text-xs">
            Within {distanceKm} km
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
