import { Skeleton, MarketTableSkeleton } from "@/components/ui/Skeleton";

export default function Loading() {
  return (
    <div className="mx-auto max-w-6xl space-y-5 px-4 py-6 sm:py-8">
      <Skeleton className="h-4 w-56" />

      <div className="surface flex flex-col gap-5 px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <div className="flex flex-1 items-center gap-4">
          <Skeleton className="h-14 w-14 rounded-2xl sm:h-16 sm:w-16" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-6 w-48" />
            <Skeleton className="h-3 w-32" />
            <Skeleton className="h-3 w-44" />
          </div>
        </div>
        <Skeleton className="h-28 w-full rounded-xl sm:w-40" />
      </div>

      <div className="surface px-5 py-5 sm:px-6">
        <Skeleton className="h-5 w-36" />
        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          <Skeleton className="h-24 rounded-xl" />
          <Skeleton className="h-24 rounded-xl" />
          <Skeleton className="h-24 rounded-xl" />
        </div>
      </div>

      <Skeleton className="h-5 w-48" />
      <MarketTableSkeleton rows={10} />
    </div>
  );
}