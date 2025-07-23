"use client";

import { FadeIn } from "@/components/atoms/fade-in";
import { Button } from "@/components/atoms/button";
import { AlertTriangle, RefreshCw, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";

export default function ProjectDetailError({
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
      <div className="container mx-auto px-6 py-8 max-w-4xl">
        {/* Back Navigation */}
        <FadeIn>
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Projects
          </Link>
        </FadeIn>

        {/* Error Content */}
        <FadeIn>
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="mb-6">
              <AlertTriangle className="w-16 h-16 text-destructive mx-auto mb-4" />
              <h1 className="text-2xl font-bold text-foreground mb-2">
                Failed to Load Project
              </h1>
              <p className="text-muted-foreground max-w-md">
                An error occurred while loading this project. It might be
                temporarily unavailable.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Button onClick={reset} className="flex items-center gap-2">
                <RefreshCw className="w-4 h-4" />
                Try Again
              </Button>
              <Button variant="outline" asChild>
                <Link href="/projects" className="flex items-center gap-2">
                  <ArrowLeft className="w-4 h-4" />
                  View All Projects
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
