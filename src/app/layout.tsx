import type { Metadata } from "next";

// Assets
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";

import { AppFooter, AppSidebar } from "@/components/app";
import { ResponsiveIndicator } from "@/components/atoms/responsive-indicator";
import { ThemeWrapper } from "@/components/atoms/theme-wrapper";
import { ThemeToggle } from "@/components/molecules/theme-toggle";
import { siteConfig } from "@/constants";

import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

import { GoogleAnalytics } from "@next/third-parties/google";

import { La_Belle_Aurore } from "next/font/google";
const LaBelleAurore = La_Belle_Aurore({
  weight: ["400"],
  subsets: ["latin"],
  variable: "--font-la-belle-aurore",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: siteConfig.name,
  description: siteConfig.subtitle,
  openGraph: {
    title: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  twitter: {
    title: siteConfig.name,
    card: "summary_large_image",
  },
  icons: [
    {
      url: "/favicon.ico",
      sizes: "32x32",
      type: "image/x-icon",
    },
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
    {
      url: "/assets/apple-touch-icon.png",
      sizes: "180x180",
      type: "image/png",
    },
    {
      url: "/assets/favicon-16x16.png",
      sizes: "16x16",
      type: "image/png",
    },
    {
      url: "/assets/favicon-32x32.png",
      sizes: "32x32",
      type: "image/png",
    },
  ],
  alternates: {
    canonical: siteConfig.url,
  },
  authors: [
    {
      name: siteConfig.author,
      url: siteConfig.url,
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${GeistSans.variable} ${GeistMono.variable} ${LaBelleAurore.variable} font-mono`}
      >
        <ThemeWrapper attribute="class" defaultTheme="dark" enableSystem>
          <main className="md:flex">
            <AppSidebar />
            <div className="h-full w-full relative overflow-y-auto">
              {children}

              <div className="absolute top-0 right-0 hidden md:block z-50">
                <div className="border-b border-l bg-background">
                  <ThemeToggle />
                </div>
              </div>
            </div>

            <AppFooter />
          </main>
        </ThemeWrapper>

        {process.env.NODE_ENV === "production" && (
          <>
            <Analytics />
            <SpeedInsights />
            <GoogleAnalytics gaId="G-1PMGV3HD5T" />
          </>
        )}

        <ResponsiveIndicator />
      </body>
    </html>
  );
}
