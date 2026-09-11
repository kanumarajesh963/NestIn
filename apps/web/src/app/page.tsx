"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { SlidersHorizontal } from "lucide-react";
import { DEFAULT_FILTERS, mockListings, type Filters } from "@nestin/shared";
import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { FilterPanel } from "@/components/filter-panel";
import { ListingCard } from "@/components/listing-card";
import { ViewToggle, type ViewMode } from "@/components/view-toggle";
import { MapView } from "@/components/map-view";
import { useLanguage } from "@/lib/language-provider";
import { staggerContainer } from "@/lib/motion";

function matchesFilters(listing: (typeof mockListings)[number], filters: Filters, query: string) {
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
  const [query, setQuery] = useState("");
  const [submittedQuery, setSubmittedQuery] = useState("");
  const [filters, setFilters] = useState<Filters>(DEFAULT_FILTERS);
  const [showFilters, setShowFilters] = useState(false);
  const [view, setView] = useState<ViewMode>("list");

  const filteredListings = useMemo(
    () => mockListings.filter((l) => matchesFilters(l, filters, submittedQuery)),
    [filters, submittedQuery]
  );

  return (
    <>
      <Header />
      <main className="flex-1">
        <Hero query={query} onQueryChange={setQuery} onSearch={() => setSubmittedQuery(query)} />

        <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
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

          <AnimatePresence>
            {showFilters && (
              <div className="mb-6">
                <FilterPanel filters={filters} onChange={setFilters} />
              </div>
            )}
          </AnimatePresence>

          {filteredListings.length === 0 ? (
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
