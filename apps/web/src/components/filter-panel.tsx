"use client";

import { motion } from "framer-motion";
import type { Amenity, Filters, GenderPreference, SharingType } from "@nestin/shared";
import { useLanguage } from "@/lib/language-provider";

const GENDER_OPTIONS: GenderPreference[] = ["any", "male", "female", "coed"];
const SHARING_OPTIONS: SharingType[] = ["single", "double", "triple", "dorm"];
const AMENITY_OPTIONS: Amenity[] = ["wifi", "ac", "laundry", "parking", "security"];

function chipClasses(active: boolean) {
  return `rounded-full border px-3 py-1.5 text-sm font-medium transition-colors cursor-pointer ${
    active
      ? "border-primary bg-primary text-primary-foreground"
      : "border-border bg-surface text-foreground hover:bg-surface-muted"
  }`;
}

export function FilterPanel({
  filters,
  onChange,
}: {
  filters: Filters;
  onChange: (filters: Filters) => void;
}) {
  const { t } = useLanguage();

  const toggleSharing = (type: SharingType) => {
    const set = new Set(filters.sharingTypes);
    set.has(type) ? set.delete(type) : set.add(type);
    onChange({ ...filters, sharingTypes: Array.from(set) });
  };

  const toggleAmenity = (amenity: Amenity) => {
    const set = new Set(filters.amenities);
    set.has(amenity) ? set.delete(amenity) : set.add(amenity);
    onChange({ ...filters, amenities: Array.from(set) });
  };

  const genderLabel: Record<GenderPreference, string> = {
    any: t.filters.genderAny,
    male: t.filters.genderMale,
    female: t.filters.genderFemale,
    coed: t.filters.genderCoed,
  };

  const sharingLabel: Record<SharingType, string> = {
    single: t.filters.sharingSingle,
    double: t.filters.sharingDouble,
    triple: t.filters.sharingTriple,
    dorm: t.filters.sharingDorm,
  };

  const amenityLabel: Record<Amenity, string> = {
    wifi: t.filters.amenityWifi,
    ac: t.filters.amenityAc,
    laundry: t.filters.amenityLaundry,
    parking: t.filters.amenityParking,
    security: t.filters.amenitySecurity,
  };

  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.25, ease: "easeInOut" }}
      className="overflow-hidden rounded-2xl border border-border bg-surface p-5"
    >
      <div className="space-y-5">
        <div>
          <p className="mb-2 text-sm font-semibold text-foreground">{t.filters.gender}</p>
          <div className="flex flex-wrap gap-2">
            {GENDER_OPTIONS.map((g) => (
              <button
                key={g}
                type="button"
                className={chipClasses(filters.gender === g)}
                onClick={() => onChange({ ...filters, gender: g })}
              >
                {genderLabel[g]}
              </button>
            ))}
          </div>
        </div>

        <div>
          <p className="mb-2 text-sm font-semibold text-foreground">
            {t.filters.priceRange}: ₹{filters.maxPrice.toLocaleString("en-IN")}
          </p>
          <input
            type="range"
            min={3000}
            max={30000}
            step={500}
            value={filters.maxPrice}
            onChange={(e) => onChange({ ...filters, maxPrice: Number(e.target.value) })}
            className="w-full accent-primary"
          />
        </div>

        <div>
          <p className="mb-2 text-sm font-semibold text-foreground">{t.filters.sharingType}</p>
          <div className="flex flex-wrap gap-2">
            {SHARING_OPTIONS.map((s) => (
              <button
                key={s}
                type="button"
                className={chipClasses(filters.sharingTypes.includes(s))}
                onClick={() => toggleSharing(s)}
              >
                {sharingLabel[s]}
              </button>
            ))}
          </div>
        </div>

        <div>
          <p className="mb-2 text-sm font-semibold text-foreground">{t.filters.amenities}</p>
          <div className="flex flex-wrap gap-2">
            {AMENITY_OPTIONS.map((a) => (
              <button
                key={a}
                type="button"
                className={chipClasses(filters.amenities.includes(a))}
                onClick={() => toggleAmenity(a)}
              >
                {amenityLabel[a]}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between">
          <label className="flex items-center gap-2 text-sm font-medium text-foreground">
            <input
              type="checkbox"
              checked={filters.foodIncluded === true}
              onChange={(e) =>
                onChange({ ...filters, foodIncluded: e.target.checked ? true : null })
              }
              className="h-4 w-4 accent-primary"
            />
            {t.filters.foodIncluded}
          </label>
        </div>
      </div>
    </motion.div>
  );
}
