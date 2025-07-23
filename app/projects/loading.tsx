import { Skeleton, CardSkeleton } from "@/components/atoms/skeleton";
import { Card, CardContent, CardHeader } from "@/components/atoms/card";

export default function Loading() {
  return (
    <section className="h-full overflow-y-auto">
      <div className="container mx-auto px-6 py-8">
        {/* Header Skeleton */}
        <div className="mb-8">
          <Skeleton className="h-8 w-48 mb-4" />
          <Skeleton className="h-4 w-96" />
        </div>

        {/* Sticky Filter Section Skeleton */}
        <div className="sticky top-0 z-10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border/40 mb-8 pb-4 -mx-6 px-6">
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
            <div className="flex flex-col sm:flex-row gap-4 flex-1">
              {/* Filter Skeletons */}
              <div className="space-y-2">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-9 w-32" />
              </div>
              <div className="space-y-2">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-9 w-28" />
              </div>
              <div className="space-y-2">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-9 w-24" />
              </div>
              <div className="space-y-2">
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-9 w-20" />
              </div>
            </div>
            <Skeleton className="h-9 w-24" />
          </div>
        </div>

        {/* Projects Grid Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <Card
              key={i}
              className="group hover:shadow-md transition-all duration-300"
            >
              <CardHeader className="p-0">
                <Skeleton className="w-full h-48 rounded-t-lg" />
              </CardHeader>
              <CardContent className="p-6">
                {/* Project Title */}
                <Skeleton className="h-6 w-3/4 mb-3" />

                {/* Project Description */}
                <div className="space-y-2 mb-4">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-5/6" />
                  <Skeleton className="h-4 w-2/3" />
                </div>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {Array.from({
                    length: Math.floor(Math.random() * 3) + 2,
                  }).map((_, j) => (
                    <Skeleton key={j} className="h-5 w-16" />
                  ))}
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between pt-4 border-t">
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-4 w-4" />
                    <Skeleton className="h-4 w-20" />
                  </div>
                  <div className="flex gap-2">
                    <Skeleton className="h-8 w-8 rounded" />
                    <Skeleton className="h-8 w-8 rounded" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Pagination Skeleton */}
        <div className="flex justify-center items-center gap-2 mt-12">
          <Skeleton className="h-9 w-20" />
          <Skeleton className="h-9 w-8" />
          <Skeleton className="h-9 w-8" />
          <Skeleton className="h-9 w-8" />
          <Skeleton className="h-9 w-20" />
        </div>
      </div>
    </section>
  );
}
