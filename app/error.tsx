"use client";

import { FadeIn } from "@/components/atoms/fade-in";
import { Button } from "@/components/atoms/button";
import { AlertTriangle, RefreshCw, Home } from "lucide-react";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="flex-1 h-full flex items-center justify-center">
      <FadeIn>
        <div className="text-center max-w-md mx-auto px-6">
          <div className="mb-6">
            <AlertTriangle className="w-16 h-16 text-destructive mx-auto mb-4" />
            <h1 className="text-xl font-bold text-foreground mb-2">
              Something went wrong!
            </h1>
            <p className="text-muted-foreground text-xs">
              An unexpected error occurred. Please try again or go back to the
              homepage.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Button
              size={"xs"}
              onClick={reset}
              className="flex items-center gap-2"
            >
              <RefreshCw className="w-4 h-4" />
              Try again
            </Button>
            <Button size={"xs"} variant="outline" asChild>
              <a href="/" className="flex items-center gap-2">
                <Home className="w-4 h-4" />
                Go Home
              </a>
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
