"use client";

import { motion } from "framer-motion";
import { Header } from "@/components/header";

export function ComingSoonPage({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <>
      <Header />
      <main className="flex flex-1 items-center justify-center px-4 py-24">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-center"
        >
          <h1 className="text-2xl font-bold text-foreground">{title}</h1>
          {subtitle && <p className="mt-2 text-foreground-muted">{subtitle}</p>}
        </motion.div>
      </main>
    </>
  );
}
