"use client";

import Link from "next/link";
import { ThemeToggle } from "./theme-toggle";
import { LanguageToggle } from "./language-toggle";
import { useLanguage } from "@/lib/language-provider";

export function Header() {
  const { t } = useLanguage();

  return (
    <header className="sticky top-0 z-30 border-b border-border bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-xl font-bold tracking-tight text-primary">
            {t.app.name}
          </span>
        </Link>
        <nav className="hidden items-center gap-6 text-sm font-medium text-foreground-muted md:flex">
          <Link href="/" className="hover:text-foreground transition-colors">
            {t.nav.home}
          </Link>
          <Link href="/roommates" className="hover:text-foreground transition-colors">
            {t.nav.roommates}
          </Link>
          <Link href="/services" className="hover:text-foreground transition-colors">
            {t.nav.services}
          </Link>
          <Link href="/guide" className="hover:text-foreground transition-colors">
            {t.nav.guide}
          </Link>
        </nav>
        <div className="flex items-center gap-2">
          <LanguageToggle />
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
