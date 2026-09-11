"use client";

import { use, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  BadgeCheck,
  MapPin,
  Phone,
  Star,
  Wifi,
  Wind,
  WashingMachine,
  ParkingCircle,
  ShieldCheck,
} from "lucide-react";
import type { Amenity, Listing } from "@nestin/shared";
import { Header } from "@/components/header";
import { useLanguage } from "@/lib/language-provider";
import { ListingDetailSkeleton } from "@/components/listing-detail-skeleton";

const AMENITY_ICONS: Record<Amenity, typeof Wifi> = {
  wifi: Wifi,
  ac: Wind,
  laundry: WashingMachine,
  parking: ParkingCircle,
  security: ShieldCheck,
};

export default function ListingDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const { t } = useLanguage();
  const [listing, setListing] = useState<Listing | null | undefined>(undefined);
  const [activePhoto, setActivePhoto] = useState(0);

  useEffect(() => {
    let cancelled = false;
    fetch(`/api/listing/${id}`)
      .then((res) => res.json())
      .then((data: { listing: Listing | null }) => {
        if (!cancelled) setListing(data.listing);
      })
      .catch(() => {
        if (!cancelled) setListing(null);
      });
    return () => {
      cancelled = true;
    };
  }, [id]);

  if (listing === undefined) return <ListingDetailSkeleton />;
  if (listing === null) return notFound();

  const amenityLabel: Record<Amenity, string> = {
    wifi: t.filters.amenityWifi,
    ac: t.filters.amenityAc,
    laundry: t.filters.amenityLaundry,
    parking: t.filters.amenityParking,
    security: t.filters.amenitySecurity,
  };

  const whatsappHref =
    typeof listing.phone === "string"
      ? `https://wa.me/${listing.phone.replace(/[^\d]/g, "")}`
      : undefined;

  return (
    <>
      <Header />
      <main className="flex-1">
        <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6">
          <Link
            href="/"
            className="mb-6 inline-flex items-center gap-1.5 text-sm font-medium text-foreground-muted hover:text-foreground"
          >
            <ArrowLeft size={16} />
            {t.detail.back}
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="relative aspect-video w-full overflow-hidden rounded-2xl bg-surface-muted"
          >
            {listing.photos[activePhoto] && (
              <Image
                src={listing.photos[activePhoto]}
                alt={listing.name}
                fill
                sizes="100vw"
                className="object-cover"
                priority
              />
            )}
            {listing.verified && (
              <span className="absolute left-4 top-4 flex items-center gap-1 rounded-full bg-accent px-3 py-1 text-xs font-semibold text-accent-foreground shadow">
                <BadgeCheck size={14} />
                {t.listing.verified}
              </span>
            )}
          </motion.div>

          {listing.photos.length > 1 && (
            <div className="mt-3 flex gap-2">
              {listing.photos.map((photo, i) => (
                <button
                  key={photo}
                  onClick={() => setActivePhoto(i)}
                  className={`relative h-16 w-24 shrink-0 overflow-hidden rounded-lg border-2 cursor-pointer ${
                    i === activePhoto ? "border-primary" : "border-transparent"
                  }`}
                >
                  <Image src={photo} alt="" fill sizes="96px" className="object-cover" />
                </button>
              ))}
            </div>
          )}

          <div className="mt-6 flex flex-wrap items-start justify-between gap-3">
            <div>
              <h1 className="text-2xl font-bold text-foreground">{listing.name}</h1>
              <p className="mt-1 flex items-center gap-1 text-foreground-muted">
                <MapPin size={15} />
                {listing.address}
              </p>
            </div>
            {listing.rating && (
              <span className="flex items-center gap-1 rounded-full bg-surface-muted px-3 py-1.5 text-sm font-semibold text-foreground">
                <Star size={16} className="fill-warning text-warning" />
                {listing.rating.toFixed(1)}
                <span className="font-normal text-foreground-muted">
                  ({listing.reviewCount} {t.listing.reviews})
                </span>
              </span>
            )}
          </div>

          {listing.pricePerMonth > 0 && (
            <p className="mt-2 text-2xl font-bold text-primary">
              ₹{listing.pricePerMonth.toLocaleString("en-IN")}
              <span className="text-sm font-normal text-foreground-muted">
                {t.listing.perMonth}
              </span>
            </p>
          )}

          {listing.description && (
            <section className="mt-6">
              <h2 className="mb-2 text-lg font-semibold text-foreground">{t.detail.about}</h2>
              <p className="text-foreground-muted">{listing.description}</p>
            </section>
          )}

          {listing.amenities.length > 0 && (
            <section className="mt-6">
              <h2 className="mb-3 text-lg font-semibold text-foreground">
                {t.detail.amenities}
              </h2>
              <div className="flex flex-wrap gap-3">
                {listing.amenities.map((a) => {
                  const Icon = AMENITY_ICONS[a];
                  return (
                    <span
                      key={a}
                      className="flex items-center gap-1.5 rounded-full border border-border bg-surface px-3 py-1.5 text-sm text-foreground"
                    >
                      <Icon size={15} />
                      {amenityLabel[a]}
                    </span>
                  );
                })}
              </div>
            </section>
          )}

          {listing.phone && (
            <section className="mt-8 flex gap-3">
              <a
                href={`tel:${listing.phone}`}
                className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-surface-muted py-3 text-sm font-semibold text-foreground transition-colors hover:bg-border"
              >
                <Phone size={16} />
                {t.listing.call}
              </a>
              <a
                href={whatsappHref}
                target="_blank"
                rel="noreferrer"
                className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-accent py-3 text-sm font-semibold text-accent-foreground transition-opacity hover:opacity-90"
              >
                {t.listing.whatsapp}
              </a>
            </section>
          )}
        </div>
      </main>
    </>
  );
}
