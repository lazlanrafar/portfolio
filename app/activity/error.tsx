"use client";

import { FadeIn } from "@/components/atoms/fade-in";
import { Button } from "@/components/atoms/button";
import { AlertTriangle, RefreshCw, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";

export default function ActivityError({
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
    <div className="flex-1 h-full flex items-center justify-center">
      <FadeIn>
        <div className="text-center max-w-md mx-auto px-6">
          <div className="mb-6">
            <AlertTriangle className="w-16 h-16 text-destructive mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-foreground mb-2">
              Failed to Load Activity
            </h1>
            <p className="text-muted-foreground">
              An error occurred while loading activity data. Please try again.
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
  );
}
