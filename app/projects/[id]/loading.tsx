import {
  Skeleton,
  TextSkeleton,
  CardSkeleton,
} from "@/components/atoms/skeleton";
import { Card, CardContent, CardHeader } from "@/components/atoms/card";

export default function ProjectDetailLoading() {
  return (
    <section className="overflow-y-auto relative h-full">
      <div className="container mx-auto px-6 py-8 max-w-4xl">
        {/* Sticky Header Skeleton */}
        <div className="sticky top-0 z-10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border/40 mb-8 pb-4 -mx-6 px-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="flex-1">
              <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-3">
                <Skeleton className="h-6 w-48" />
                <Skeleton className="h-5 w-16" />
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-4 w-36" />
              </div>
            </div>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <Skeleton className="h-8 w-20" />
              <Skeleton className="h-8 w-24" />
            </div>
          </div>
        </div>

        {/* Project Image Skeleton */}
        <div className="mb-8 rounded-xl overflow-hidden border bg-muted/30">
          <Skeleton className="w-full h-64 md:h-80 lg:h-96" />
        </div>

        {/* Description Skeleton */}
        <div className="mb-10">
          <TextSkeleton lines={5} />
        </div>

        {/* Tech Stack Section Skeleton */}
        <div className="mb-10">
          <Skeleton className="h-6 w-48 mb-6" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="space-y-3">
                <div className="flex items-center gap-2">
                  <Skeleton className="h-4 w-4" />
                  <Skeleton className="h-4 w-20" />
                </div>
                <div className="flex flex-wrap gap-2">
                  {Array.from({
                    length: Math.floor(Math.random() * 3) + 2,
                  }).map((_, j) => (
                    <Skeleton key={j} className="h-6 w-16" />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Project Information Cards Skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
          {/* Project Details Card Skeleton */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Skeleton className="h-4 w-4" />
                <Skeleton className="h-5 w-32" />
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Skeleton className="h-3.5 w-3.5" />
                      <Skeleton className="h-4 w-16" />
                    </div>
                    <Skeleton className="h-5 w-20" />
                  </div>
                  {i < 3 && <div className="h-px bg-border my-3" />}
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Quick Access Card Skeleton */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Skeleton className="h-4 w-4" />
                <Skeleton className="h-5 w-24" />
              </div>
              <Skeleton className="h-4 w-48" />
            </CardHeader>
            <CardContent className="space-y-3">
              {Array.from({ length: 2 }).map((_, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between p-4 rounded-lg border"
                >
                  <div className="flex items-center gap-3">
                    <Skeleton className="w-10 h-10 rounded-lg" />
                    <div>
                      <Skeleton className="h-4 w-20 mb-1" />
                      <Skeleton className="h-3 w-32" />
                    </div>
                  </div>
                  <Skeleton className="w-4 h-4" />
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Navigation Skeleton */}
        <div className="flex justify-center pt-8 border-t">
          <Skeleton className="h-9 w-32" />
        </div>
      </div>
    </section>
  );
}
