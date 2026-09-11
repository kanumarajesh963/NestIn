"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { BadgeCheck, Building2, MapPin, Phone, Star } from "lucide-react";
import type { Listing } from "@nestin/shared";
import { useLanguage } from "@/lib/language-provider";
import { fadeUp } from "@/lib/motion";

export function ListingCard({ listing }: { listing: Listing }) {
  const { t } = useLanguage();
  const whatsappHref =
    typeof listing.phone === "string"
      ? `https://wa.me/${listing.phone.replace(/[^\d]/g, "")}`
      : undefined;

  return (
    <motion.div
      variants={fadeUp}
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 300, damping: 24 }}
      className="group overflow-hidden rounded-2xl border border-border bg-surface shadow-sm"
    >
      <Link href={`/listing/${listing.id}`} className="block">
        <div className="relative aspect-[4/3] w-full overflow-hidden bg-surface-muted">
          {listing.photos[0] ? (
            <Image
              src={listing.photos[0]}
              alt={listing.name}
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-foreground-muted">
              <Building2 size={32} strokeWidth={1.5} />
            </div>
          )}
          {listing.verified && (
            <span className="absolute left-3 top-3 flex items-center gap-1 rounded-full bg-accent px-2.5 py-1 text-xs font-semibold text-accent-foreground shadow">
              <BadgeCheck size={14} />
              {t.listing.verified}
            </span>
          )}
        </div>
        <div className="space-y-2 p-4">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-semibold leading-snug text-foreground">
              {listing.name}
            </h3>
            {listing.rating && (
              <span className="flex shrink-0 items-center gap-1 text-sm font-medium text-foreground">
                <Star size={14} className="fill-warning text-warning" />
                {listing.rating.toFixed(1)}
              </span>
            )}
          </div>
          <p className="flex items-center gap-1 text-sm text-foreground-muted">
            <MapPin size={14} className="shrink-0" />
            <span className="truncate">{listing.address}</span>
          </p>
          <div className="flex items-center justify-between pt-1">
            {listing.pricePerMonth > 0 ? (
              <p className="text-base font-bold text-primary">
                ₹{listing.pricePerMonth.toLocaleString("en-IN")}
                <span className="text-xs font-normal text-foreground-muted">
                  {t.listing.perMonth}
                </span>
              </p>
            ) : (
              <span className="text-sm text-foreground-muted">
                {t.common.comingSoon}
              </span>
            )}
          </div>
        </div>
      </Link>
      {listing.phone && (
        <div className="flex gap-2 border-t border-border p-3">
          <a
            href={`tel:${listing.phone}`}
            className="flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-surface-muted py-2 text-sm font-medium text-foreground transition-colors hover:bg-border"
          >
            <Phone size={14} />
            {t.listing.call}
          </a>
          <a
            href={whatsappHref}
            target="_blank"
            rel="noreferrer"
            className="flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-accent py-2 text-sm font-medium text-accent-foreground transition-opacity hover:opacity-90"
          >
            {t.listing.whatsapp}
          </a>
        </div>
      )}
    </motion.div>
  );
}
