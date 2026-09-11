"use client";

import { ComingSoonPage } from "@/components/coming-soon-page";
import { useLanguage } from "@/lib/language-provider";

export default function RoommatesPage() {
  const { t } = useLanguage();
  return <ComingSoonPage title={t.roommate.title} subtitle={t.roommate.subtitle} />;
}
