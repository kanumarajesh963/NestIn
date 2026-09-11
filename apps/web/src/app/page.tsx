"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { LocateFixed, SlidersHorizontal } from "lucide-react";
import { DEFAULT_FILTERS, mockListings, type Filters, type Listing, type LocationSuggestion } from "@nestin/shared";
import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { FilterPanel } from "@/components/filter-panel";
import { ListingCard } from "@/components/listing-card";
import { ViewToggle, type ViewMode } from "@/components/view-toggle";
import { MapView } from "@/components/map-view";
import { ListingCardSkeleton } from "@/components/listing-card-skeleton";
import { useLanguage } from "@/lib/language-provider";
import { staggerContainer } from "@/lib/motion";
import { useGeolocation } from "@/lib/use-geolocation";

function matchesFilters(listing: Listing, filters: Filters, query: string) {
  if (query && !`${listing.name} ${listing.address}`.toLowerCase().includes(query.toLowerCase())) {
    return false;
  }
  if (filters.gender !== "any" && listing.gender !== "any" && listing.gender !== filters.gender) {
    return false;
  }
  if (listing.pricePerMonth > 0 && listing.pricePerMonth > filters.maxPrice) return false;
  if (
    filters.sharingTypes.length > 0 &&
    !filters.sharingTypes.some((s) => listing.sharingTypes.includes(s))
  ) {
    return false;
  }
  if (filters.foodIncluded === true && !listing.foodIncluded) return false;
  if (
    filters.amenities.length > 0 &&
    !filters.amenities.every((a) => listing.amenities.includes(a))
  ) {
    return false;
  }
  return true;
}

export default function Home() {
  const { t } = useLanguage();
  const { center, setCenter, status: geoStatus } = useGeolocation();
  const [query, setQuery] = useState("");
  const [filters, setFilters] = useState<Filters>(DEFAULT_FILTERS);
  const [showFilters, setShowFilters] = useState(false);
  const [view, setView] = useState<ViewMode>("list");
  const [listings, setListings] = useState<Listing[]>(mockListings);
  const [loading, setLoading] = useState(false);
  const [liveDataConfigured, setLiveDataConfigured] = useState<boolean | null>(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    fetch(`/api/nearby?lat=${center.lat}&lng=${center.lng}`)
      .then((res) => res.json())
      .then((data: { listings: Listing[]; configured?: boolean }) => {
        if (cancelled) return;
        setListings(data.listings ?? mockListings);
        setLiveDataConfigured(Boolean(data.configured));
      })
      .catch(() => {
        if (!cancelled) setListings(mockListings);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [center]);

  const filteredListings = useMemo(
    () => listings.filter((l) => matchesFilters(l, filters, "")),
    [listings, filters]
  );

  const handleSelectSuggestion = (suggestion: LocationSuggestion) => {
    setCenter(suggestion.location);
  };

  return (
    <>
      <Header />
      <main className="flex-1">
        <Hero query={query} onQueryChange={setQuery} onSelectSuggestion={handleSelectSuggestion} />

        <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
          <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-xl font-semibold text-foreground">{t.home.nearbyTitle}</h2>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setShowFilters((v) => !v)}
                className="flex items-center gap-1.5 rounded-full border border-border bg-surface px-3.5 py-1.5 text-sm font-medium text-foreground transition-colors hover:bg-surface-muted cursor-pointer"
              >
                <SlidersHorizontal size={15} />
                {t.filters.title}
              </button>
              <ViewToggle value={view} onChange={setView} />
            </div>
          </div>

          <p className="mb-6 flex items-center gap-1.5 text-xs text-foreground-muted">
            <LocateFixed size={13} />
            {geoStatus === "granted"
              ? "Showing results near your current location."
              : geoStatus === "denied"
                ? "Location access denied — showing results near a default location. Search above or allow location access for results near you."
                : geoStatus === "unavailable"
                  ? "Location not available on this device — showing results near a default location."
                  : "Detecting your location…"}
            {liveDataConfigured === false && " (Live data source not yet configured — showing sample listings.)"}
          </p>

          <AnimatePresence>
            {showFilters && (
              <div className="mb-6">
                <FilterPanel filters={filters} onChange={setFilters} />
              </div>
            )}
          </AnimatePresence>

          {loading ? (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <ListingCardSkeleton key={i} />
              ))}
            </div>
          ) : filteredListings.length === 0 ? (
            <p className="rounded-2xl border border-dashed border-border py-16 text-center text-foreground-muted">
              {t.listing.noResults}
            </p>
          ) : view === "list" ? (
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="show"
              className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
            >
              {filteredListings.map((listing) => (
                <ListingCard key={listing.id} listing={listing} />
              ))}
            </motion.div>
          ) : (
            <MapView listings={filteredListings} />
          )}
        </section>
      </main>
    </>
  );
}
