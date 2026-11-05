import { Skeleton, ProductGridSkeleton } from "@/components/ui/Skeleton";

export default function Loading() {
  return (
    <div className="mx-auto max-w-6xl space-y-5 px-4 py-6 sm:py-8">
      <div className="surface flex items-center gap-4 px-5 py-5 sm:px-6">
        <Skeleton className="h-14 w-14 rounded-2xl sm:h-16 sm:w-16" />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-6 w-32" />
          <Skeleton className="h-3 w-56" />
        </div>
      </div>

      <div className="surface flex items-center justify-between gap-3 px-4 py-3">
        <Skeleton className="h-4 w-40" />
        <Skeleton className="h-9 w-44 rounded-lg" />
      </div>

      <ProductGridSkeleton count={6} />
    </div>
  );
}