import type { Metadata, Viewport } from "next";
import { Suspense } from "react";

// Assets
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { La_Belle_Aurore } from "next/font/google";
import "./globals.css";

import { ResponsiveIndicator } from "@/components/atoms/responsive-indicator";
import { ThemeWrapper } from "@/components/atoms/theme-wrapper";
import { siteConfig } from "@/constants";

import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

import { GoogleAnalytics } from "@next/third-parties/google";
import { AnimatedGridPattern } from "@/components/magicui/animated-grid-pattern";

import { AppLayout } from "@/layouts/app.layout";

const LaBelleAurore = La_Belle_Aurore({
  weight: ["400"],
  subsets: ["latin"],
  variable: "--font-la-belle-aurore",
  display: "swap",
  preload: true,
});

// Viewport configuration
export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  colorScheme: "dark light",
};

// Enhanced metadata with better SEO
export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.subtitle,
  keywords: [
    "Software Developer",
    "Frontend Developer",
    "React Developer",
    "Next.js Developer",
    "TypeScript Developer",
    "Web Developer",
    "JavaScript Developer",
    "Indonesia Developer",
    "Portfolio",
    "L Azlan Rafar",
    "lazlanrafar",
  ],
  authors: [
    {
      name: siteConfig.author,
      url: siteConfig.url,
    },
  ],
  creator: siteConfig.author,
  publisher: siteConfig.author,
  category: "Technology",
  classification: "Portfolio",

  // OpenGraph
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: `${siteConfig.url}/opengraph-image.png`,
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
  },

  // Twitter
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    images: [`${siteConfig.url}/opengraph-image.png`],
    creator: "@lazlanrafar",
  },

  // Robots
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  // Icons with proper sizing
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "32x32", type: "image/x-icon" },
      { url: "/assets/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/assets/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      {
        url: "/assets/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
    other: [
      {
        url: "/assets/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        url: "/assets/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  },

  // Canonical URL
  alternates: {
    canonical: siteConfig.url,
  },

  // Verification
  verification: {
    google: "your-google-site-verification-code", // Replace with actual code
  },

  // JSON-LD structured data
  other: {
    "application/ld+json": JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Person",
      name: siteConfig.author,
      url: siteConfig.url,
      description: siteConfig.description,
      jobTitle: "Software Developer",
      worksFor: {
        "@type": "Organization",
        name: "Freelance",
      },
      sameAs: [
        siteConfig.links.github,
        siteConfig.links.linkedin,
        siteConfig.links.instagram,
      ],
    }),
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${GeistSans.variable} ${GeistMono.variable} ${LaBelleAurore.variable}`}
      suppressHydrationWarning
    >
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#000000" />
        <meta name="msapplication-TileColor" content="#000000" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="L Azlan Rafar" />
        <link
          rel="preload"
          href="/assets/android-chrome-192x192.png"
          as="image"
          type="image/png"
        />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.googleapis.com"
          crossOrigin=""
        />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />
      </head>
      <body className="font-mono relative antialiased">
        <ThemeWrapper
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <Suspense fallback={<div className="loading-spinner" />}>
            <AppLayout>{children}</AppLayout>
          </Suspense>
        </ThemeWrapper>

        {/* Performance and Analytics - Only in production */}
        {process.env.NODE_ENV === "production" && (
          <Suspense fallback={null}>
            <Analytics />
            <SpeedInsights />
            <GoogleAnalytics gaId="G-1PMGV3HD5T" />
          </Suspense>
        )}

        {/* Development only indicators */}
        {process.env.NODE_ENV === "development" && <ResponsiveIndicator />}

        {/* Background effects */}
        <AnimatedGridPattern className="opacity-20 fixed inset-0 pointer-events-none" />
        <div className="grain-noise pointer-events-none fixed inset-0 opacity-30" />
      </body>
    </html>
  );
}
