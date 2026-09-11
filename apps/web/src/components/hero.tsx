"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Loader2, MapPin, Search } from "lucide-react";
import type { LocationSuggestion } from "@nestin/shared";
import { useLanguage } from "@/lib/language-provider";
import { useDebouncedValue } from "@/lib/use-debounced-value";

export function Hero({
  query,
  onQueryChange,
  onSelectSuggestion,
}: {
  query: string;
  onQueryChange: (v: string) => void;
  onSelectSuggestion: (suggestion: LocationSuggestion) => void;
}) {
  const { t } = useLanguage();
  const [suggestions, setSuggestions] = useState<LocationSuggestion[]>([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const debouncedQuery = useDebouncedValue(query, 300);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  useEffect(() => {
    if (debouncedQuery.trim().length < 3) {
      setSuggestions([]);
      return;
    }
    let cancelled = false;
    setLoading(true);
    fetch(`/api/autocomplete?q=${encodeURIComponent(debouncedQuery)}`)
      .then((res) => res.json())
      .then((data: { suggestions: LocationSuggestion[] }) => {
        if (!cancelled) setSuggestions(data.suggestions ?? []);
      })
      .catch(() => {
        if (!cancelled) setSuggestions([]);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [debouncedQuery]);

  return (
    <section className="relative overflow-hidden border-b border-border bg-gradient-to-b from-surface-muted to-background px-4 py-16 sm:px-6 sm:py-24">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="mx-auto max-w-3xl text-center"
      >
        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-5xl">
          {t.home.heroTitle}
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-base text-foreground-muted sm:text-lg">
          {t.home.heroSubtitle}
        </p>
        <div ref={containerRef} className="relative mx-auto mt-8 max-w-xl">
          <div className="flex items-center gap-2 rounded-full border border-border bg-surface p-1.5 pl-5 shadow-sm">
            <Search size={18} className="shrink-0 text-foreground-muted" />
            <input
              value={query}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                onQueryChange(e.target.value);
                setOpen(true);
              }}
              onFocus={() => setOpen(true)}
              placeholder={t.home.searchPlaceholder}
              className="w-full bg-transparent text-sm text-foreground outline-none placeholder:text-foreground-muted"
            />
            {loading && (
              <Loader2 size={16} className="shrink-0 animate-spin text-foreground-muted" />
            )}
          </div>

          <AnimatePresence>
            {open && suggestions.length > 0 && (
              <motion.ul
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.15 }}
                className="absolute left-0 right-0 z-20 mt-2 overflow-hidden rounded-2xl border border-border bg-surface text-left shadow-lg"
              >
                {suggestions.map((s) => (
                  <li key={s.id}>
                    <button
                      type="button"
                      onClick={() => {
                        onQueryChange(s.label);
                        onSelectSuggestion(s);
                        setOpen(false);
                      }}
                      className="flex w-full items-center gap-2 px-4 py-2.5 text-left text-sm text-foreground transition-colors hover:bg-surface-muted cursor-pointer"
                    >
                      <MapPin size={15} className="shrink-0 text-foreground-muted" />
                      <span className="truncate">{s.label}</span>
                    </button>
                  </li>
                ))}
              </motion.ul>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </section>
  );
}
