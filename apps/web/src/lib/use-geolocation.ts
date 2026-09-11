"use client";

import { useEffect, useState } from "react";
import { MOCK_CENTER, type Coordinates } from "@nestin/shared";

export type GeolocationStatus = "prompting" | "granted" | "denied" | "unavailable";

export function useGeolocation() {
  const [center, setCenter] = useState<Coordinates>(MOCK_CENTER);
  const [status, setStatus] = useState<GeolocationStatus>("prompting");

  useEffect(() => {
    if (!("geolocation" in navigator)) {
      setStatus("unavailable");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCenter({ lat: position.coords.latitude, lng: position.coords.longitude });
        setStatus("granted");
      },
      () => setStatus("denied"),
      { enableHighAccuracy: false, timeout: 8000, maximumAge: 5 * 60 * 1000 }
    );
  }, []);

  return { center, setCenter, status };
}
