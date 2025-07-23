import { FadeIn } from "@/components/atoms/fade-in";
import { Button } from "@/components/atoms/button";
import Link from "next/link";
import { ArrowLeft, AlertTriangle } from "lucide-react";

export default function ProjectNotFound() {
  return (
    <section className="overflow-y-auto relative h-full pb-10">
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

        {/* Not Found Content */}
        <FadeIn>
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="mb-6">
              <AlertTriangle className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h1 className="text-2xl font-bold text-foreground mb-2">
                Project Not Found
              </h1>
              <p className="text-muted-foreground max-w-md">
                The project you're looking for doesn't exist or may have been
                removed. Please check the URL or browse our other projects.
              </p>
            </div>

            <div className="flex items-center gap-4">
              <Button asChild>
                <Link href="/projects">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  View All Projects
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/">Go Home</Link>
              </Button>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
