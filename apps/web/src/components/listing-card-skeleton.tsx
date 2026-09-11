export function ListingCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-surface shadow-sm">
      <div className="shimmer aspect-[4/3] w-full" />
      <div className="space-y-3 p-4">
        <div className="shimmer h-4 w-3/4 rounded-full" />
        <div className="shimmer h-3 w-1/2 rounded-full" />
        <div className="shimmer h-4 w-1/3 rounded-full" />
      </div>
    </div>
  );
}
