import { Skeleton, SectionSkeleton } from "@/components/ui/Skeleton";

export default function Loading() {
  return (
    <>
      <section className="mx-auto max-w-6xl px-4 pt-6 sm:pt-8">
        <div className="surface px-5 py-8 sm:px-8 sm:py-10">
          <div className="grid items-center gap-8 md:grid-cols-[1.4fr_1fr]">
            <div className="space-y-4">
              <Skeleton className="h-6 w-44 rounded-full" />
              <Skeleton className="h-9 w-4/5" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-11 w-40 rounded-lg" />
            </div>
            <Skeleton className="mx-auto h-40 w-56 rounded-2xl md:ml-auto md:mr-0" />
          </div>
        </div>
      </section>

      <SectionSkeleton count={6} />
      <SectionSkeleton count={6} />
      <SectionSkeleton count={9} />
    </>
  );
}