"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { MapPin } from "lucide-react";
import type { Listing } from "@nestin/shared";
import { useLanguage } from "@/lib/language-provider";

// Lightweight pin-on-canvas map for Phase 1 (no Google Maps JS API key required yet).
// Swap for @vis.gl/react-google-maps once a Maps API key is configured — the
// Listing.location data is already real lat/lng so no data model changes needed.
export function MapView({ listings }: { listings: Listing[] }) {
  const { t } = useLanguage();
  const [active, setActive] = useState<string | null>(null);

  const lats = listings.map((l) => l.location.lat);
  const lngs = listings.map((l) => l.location.lng);
  const minLat = Math.min(...lats);
  const maxLat = Math.max(...lats);
  const minLng = Math.min(...lngs);
  const maxLng = Math.max(...lngs);
  const pad = 0.08;

  const normalize = (lat: number, lng: number) => {
    const x = ((lng - minLng) / (maxLng - minLng || 1)) * (1 - pad * 2) + pad;
    const y = (1 - (lat - minLat) / (maxLat - minLat || 1)) * (1 - pad * 2) + pad;
    return { x: x * 100, y: y * 100 };
  };

  return (
    <div className="relative h-[70vh] w-full overflow-hidden rounded-2xl border border-border bg-gradient-to-br from-surface-muted to-surface">
      <div className="absolute inset-0 opacity-40 [background-image:linear-gradient(var(--border)_1px,transparent_1px),linear-gradient(90deg,var(--border)_1px,transparent_1px)] [background-size:32px_32px]" />
      {listings.map((listing, i) => {
        const { x, y } = normalize(listing.location.lat, listing.location.lng);
        const isActive = active === listing.id;
        return (
          <motion.button
            key={listing.id}
            type="button"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.05, type: "spring", stiffness: 300, damping: 20 }}
            style={{ left: `${x}%`, top: `${y}%` }}
            className="absolute -translate-x-1/2 -translate-y-full cursor-pointer"
            onClick={() => setActive(isActive ? null : listing.id)}
          >
            <MapPin
              size={30}
              className={isActive ? "fill-primary text-primary" : "fill-accent text-accent"}
              strokeWidth={1.5}
            />
            {isActive && (
              <motion.div
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute left-1/2 top-full z-10 w-48 -translate-x-1/2 rounded-xl border border-border bg-surface p-3 text-left shadow-lg"
              >
                <p className="truncate text-sm font-semibold text-foreground">
                  {listing.name}
                </p>
                {listing.pricePerMonth > 0 && (
                  <p className="text-sm font-bold text-primary">
                    ₹{listing.pricePerMonth.toLocaleString("en-IN")}
                    {t.listing.perMonth}
                  </p>
                )}
                <Link
                  href={`/listing/${listing.id}`}
                  className="mt-1 inline-block text-xs font-medium text-accent underline"
                >
                  {t.listing.viewDetails}
                </Link>
              </motion.div>
            )}
          </motion.button>
        );
      })}
    </div>
  );
}
