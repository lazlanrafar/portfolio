"use client";

import { FadeIn } from "@/components/atoms/fade-in";
import { Button } from "@/components/atoms/button";
import { AlertTriangle, RefreshCw, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";

export default function ProjectsError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section className="overflow-y-auto relative h-full">
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-base font-bold text-foreground mb-1">Projects</h1>
          <p className="text-muted-foreground text-xs">
            Something went wrong while loading projects.
          </p>
        </div>

        {/* Error Content */}
        <FadeIn>
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="mb-6">
              <AlertTriangle className="w-16 h-16 text-destructive mx-auto mb-4" />
              <h2 className="text-xl font-bold text-foreground mb-2">
                Failed to Load Projects
              </h2>
              <p className="text-muted-foreground max-w-md">
                An error occurred while fetching the projects. Please try again
                or check your connection.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Button onClick={reset} className="flex items-center gap-2">
                <RefreshCw className="w-4 h-4" />
                Try Again
              </Button>
              <Button variant="outline" asChild>
                <Link href="/" className="flex items-center gap-2">
                  <ArrowLeft className="w-4 h-4" />
                  Go Home
                </Link>
              </Button>
            </div>

            {error.digest && (
              <p className="text-xs text-muted-foreground mt-4">
                Error ID: {error.digest}
              </p>
            )}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
