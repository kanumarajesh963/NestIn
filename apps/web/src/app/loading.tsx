import { Header } from "@/components/header";

export default function Loading() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
          <div className="shimmer mb-4 h-8 w-64 rounded-full" />
          <div className="shimmer mb-8 h-4 w-96 max-w-full rounded-full" />
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="shimmer h-40 rounded-2xl" />
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
