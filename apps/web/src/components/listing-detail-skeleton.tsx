import { Header } from "@/components/header";

export function ListingDetailSkeleton() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6">
          <div className="shimmer aspect-video w-full rounded-2xl" />
          <div className="mt-3 flex gap-2">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="shimmer h-16 w-24 shrink-0 rounded-lg" />
            ))}
          </div>
          <div className="mt-6 space-y-3">
            <div className="shimmer h-7 w-2/3 rounded-full" />
            <div className="shimmer h-4 w-1/2 rounded-full" />
            <div className="shimmer h-6 w-1/4 rounded-full" />
          </div>
          <div className="mt-8 flex gap-3">
            <div className="shimmer h-12 flex-1 rounded-xl" />
            <div className="shimmer h-12 flex-1 rounded-xl" />
          </div>
        </div>
      </main>
    </>
  );
}
