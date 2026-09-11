"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Languages } from "lucide-react";
import { SUPPORTED_LANGUAGES, LANGUAGE_LABELS } from "@nestin/shared";
import { useLanguage } from "@/lib/language-provider";

export function LanguageToggle() {
  const { language, setLanguage, t } = useLanguage();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        aria-label={t.language.toggle}
        onClick={() => setOpen((v) => !v)}
        className="flex h-9 items-center gap-1.5 rounded-full border border-border bg-surface px-3 text-sm font-medium text-foreground transition-colors hover:bg-surface-muted cursor-pointer"
      >
        <Languages size={16} />
        {LANGUAGE_LABELS[language]}
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.97 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 z-20 mt-2 min-w-[140px] overflow-hidden rounded-xl border border-border bg-surface shadow-lg"
          >
            {SUPPORTED_LANGUAGES.map((lang) => (
              <button
                key={lang}
                onClick={() => {
                  setLanguage(lang);
                  setOpen(false);
                }}
                className={`block w-full px-4 py-2 text-left text-sm transition-colors hover:bg-surface-muted cursor-pointer ${
                  lang === language ? "font-semibold text-primary" : "text-foreground"
                }`}
              >
                {LANGUAGE_LABELS[lang]}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
