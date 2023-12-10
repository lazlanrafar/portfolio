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

import { La_Belle_Aurore } from "next/font/google";
const LaBelleAurore = La_Belle_Aurore({
  weight: ["400"],
  subsets: ["latin"],
  variable: "--font-la-belle-aurore",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: siteConfig.name,
  description: siteConfig.description,
  openGraph: {
    title: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    type: "website",
  },
  twitter: {
    title: siteConfig.name,
    card: "summary_large_image",
  },
  icons: [
    {
      url: "/favicon.ico",
      sizes: "192x192",
      type: "image/png",
    },
    {
      url: "/android-chrome-512x512.png",
      sizes: "512x512",
      type: "image/png",
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
            <div className="h-full w-full relative">
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
          </>
        )}
        <ResponsiveIndicator />
      </body>
    </html>
  );
}
