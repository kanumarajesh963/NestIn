"use client";

import { ComingSoonPage } from "@/components/coming-soon-page";
import { useLanguage } from "@/lib/language-provider";

export default function GuidePage() {
  const { t } = useLanguage();
  return <ComingSoonPage title={t.guide.title} subtitle={t.common.comingSoon} />;
}
