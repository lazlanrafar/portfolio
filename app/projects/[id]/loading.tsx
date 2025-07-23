import { Skeleton } from "@/components/atoms/skeleton";

export default function ProjectDetailLoading() {
  return (
    <section className="overflow-y-auto relative h-full pb-10">
      <div className="container mx-auto px-6 py-8 max-w-4xl">
        {/* Back Navigation Skeleton */}
        <Skeleton className="w-32 h-5 mb-8" />

        {/* Project Header Skeleton */}
        <div className="mb-8">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <Skeleton className="w-64 h-8 mb-2" />
              <div className="flex items-center gap-4 mb-4">
                <Skeleton className="w-32 h-4" />
                <Skeleton className="w-20 h-4" />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Skeleton className="w-24 h-8" />
              <Skeleton className="w-20 h-8" />
            </div>
          </div>

          {/* Technologies Skeleton */}
          <div className="flex flex-wrap gap-2 mb-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="w-16 h-6" />
            ))}
          </div>
        </div>

        {/* Project Image Skeleton */}
        <Skeleton className="w-full h-64 md:h-80 lg:h-96 mb-8 rounded-lg" />

        {/* Separator */}
        <Skeleton className="w-full h-px my-8" />

        {/* Description Skeleton */}
        <div className="mb-8">
          <Skeleton className="w-40 h-6 mb-4" />
          <div className="space-y-2">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="w-full h-4" />
            ))}
            <Skeleton className="w-3/4 h-4" />
          </div>
        </div>

        {/* Project Details Skeleton */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <Skeleton className="w-32 h-5" />
            <div className="space-y-2">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="flex justify-between">
                  <Skeleton className="w-16 h-4" />
                  <Skeleton className="w-24 h-4" />
                </div>
              ))}
            </div>
          </div>
          <div className="space-y-4">
            <Skeleton className="w-16 h-5" />
            <div className="space-y-2">
              <Skeleton className="w-32 h-4" />
              <Skeleton className="w-28 h-4" />
            </div>
          </div>
        </div>

        {/* Navigation Skeleton */}
        <Skeleton className="w-full h-px my-8" />
        <div className="text-center">
          <Skeleton className="w-40 h-10 mx-auto" />
        </div>
      </div>
    </section>
  );
}
