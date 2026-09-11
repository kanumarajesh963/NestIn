"use client";

import { motion } from "framer-motion";
import { List, Map as MapIcon } from "lucide-react";
import { useLanguage } from "@/lib/language-provider";

export type ViewMode = "list" | "map";

export function ViewToggle({
  value,
  onChange,
}: {
  value: ViewMode;
  onChange: (v: ViewMode) => void;
}) {
  const { t } = useLanguage();
  const options: { key: ViewMode; label: string; icon: typeof List }[] = [
    { key: "list", label: t.view.listView, icon: List },
    { key: "map", label: t.view.mapView, icon: MapIcon },
  ];

  return (
    <div className="relative flex rounded-full border border-border bg-surface p-1">
      {options.map(({ key, label, icon: Icon }) => (
        <button
          key={key}
          type="button"
          onClick={() => onChange(key)}
          className="relative z-10 flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors cursor-pointer"
        >
          {value === key && (
            <motion.span
              layoutId="view-toggle-pill"
              className="absolute inset-0 rounded-full bg-primary"
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
            />
          )}
          <span
            className={`relative z-10 flex items-center gap-1.5 ${
              value === key ? "text-primary-foreground" : "text-foreground-muted"
            }`}
          >
            <Icon size={15} />
            {label}
          </span>
        </button>
      ))}
    </div>
  );
}
