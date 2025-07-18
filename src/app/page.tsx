import { Suspense } from "react";
import dynamic from "next/dynamic";
import { Metadata } from "next";

import { siteConfig } from "@/constants";

// Lazy load components for better performance
const HomeWelcome = dynamic(
  () => import("@/components/organisms/home-welcome"),
  {
    ssr: true,
  }
);

// Enhanced metadata for better SEO
export const metadata: Metadata = {
  title: `${siteConfig.name} - Software Developer`,
  description: siteConfig.description,
  keywords: [
    "Software Developer",
    "React Developer",
    "Next.js Developer",
    "TypeScript Developer",
    "Frontend Developer",
    "Web Developer",
    "Portfolio",
    "L Azlan Rafar",
    "lazlanrafar",
    "Indonesia Developer",
  ],
  openGraph: {
    title: `${siteConfig.name} - Software Developer`,
    description: siteConfig.description,
    url: siteConfig.url,
    type: "website",
    images: [
      {
        url: `${siteConfig.url}/opengraph-image.png`,
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} - Software Developer Portfolio`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} - Software Developer`,
    description: siteConfig.description,
    images: [`${siteConfig.url}/opengraph-image.png`],
  },
  alternates: {
    canonical: siteConfig.url,
  },
};

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative">
        <Suspense
          fallback={
            <div className="animate-pulse h-screen bg-gradient-to-br from-background to-muted" />
          }
        >
          <HomeWelcome />
        </Suspense>
      </section>

      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            name: siteConfig.author,
            jobTitle: "Software Developer",
            description: siteConfig.description,
            url: siteConfig.url,
            sameAs: [
              siteConfig.links.github,
              siteConfig.links.linkedin,
              siteConfig.links.instagram,
            ],
            knowsAbout: [
              "React",
              "Next.js",
              "TypeScript",
              "JavaScript",
              "Web Development",
              "Frontend Development",
              "Software Development",
            ],
            worksFor: {
              "@type": "Organization",
              name: "Freelance",
            },
            nationality: {
              "@type": "Country",
              name: "Indonesia",
            },
          }),
        }}
      />
    </main>
  );
}
