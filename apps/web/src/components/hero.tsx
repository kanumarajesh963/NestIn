"use client";

import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { useLanguage } from "@/lib/language-provider";

export function Hero({
  query,
  onQueryChange,
  onSearch,
}: {
  query: string;
  onQueryChange: (v: string) => void;
  onSearch: () => void;
}) {
  const { t } = useLanguage();

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
        <motion.form
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.4 }}
          onSubmit={(e) => {
            e.preventDefault();
            onSearch();
          }}
          className="mx-auto mt-8 flex max-w-xl items-center gap-2 rounded-full border border-border bg-surface p-1.5 pl-5 shadow-sm"
        >
          <Search size={18} className="shrink-0 text-foreground-muted" />
          <input
            value={query}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => onQueryChange(e.target.value)}
            placeholder={t.home.searchPlaceholder}
            className="w-full bg-transparent text-sm text-foreground outline-none placeholder:text-foreground-muted"
          />
          <button
            type="submit"
            className="shrink-0 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90 cursor-pointer"
          >
            {t.home.searchButton}
          </button>
        </motion.form>
      </motion.div>
    </section>
  );
}
