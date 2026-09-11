"use client";

import { ComingSoonPage } from "@/components/coming-soon-page";
import { useLanguage } from "@/lib/language-provider";

export default function ServicesPage() {
  const { t } = useLanguage();
  return <ComingSoonPage title={t.services.title} subtitle={t.common.comingSoon} />;
}
