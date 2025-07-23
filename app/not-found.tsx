import { FadeIn } from "@/components/atoms/fade-in";
import { Button } from "@/components/atoms/button";
import { AlertTriangle, Home, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex-1 h-full flex items-center justify-center">
      <FadeIn>
        <div className="text-center max-w-md mx-auto px-6">
          <div className="mb-6">
            <AlertTriangle className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h1 className="text-xl font-bold text-foreground mb-2">
              Page Not Found
            </h1>
            <p className="text-muted-foreground text-xs">
              The page you're looking for doesn't exist. It might have been
              moved, deleted, or you entered the wrong URL.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Button size={"xs"} asChild>
              <Link href="/" className="flex items-center gap-2">
                <Home className="w-4 h-4" />
                Go Home
              </Link>
            </Button>
            <Button
              size={"xs"}
              variant="outline"
              onClick={() => window.history.back()}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Go Back
            </Button>
          </div>
        </div>
      </FadeIn>
    </div>
  );
}
