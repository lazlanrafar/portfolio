import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";
import { GoogleAnalytics } from "@/components/atoms/google-analytics";
import { siteConfig } from "@/lib/data";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: `${siteConfig.author.name} — ${siteConfig.author.role}`,
    template: `%s | ${siteConfig.name}`,
  },
  description:
    "Software Engineer from Bali, Indonesia. Specializing in React, Vue.js, Node.js, and cloud infrastructure on AWS.",
  keywords: [
    "software engineer",
    "full-stack engineer",
    "frontend developer",
    "React developer",
    "Vue.js developer",
    "Node.js developer",
    "Laravel developer",
    "web development",
    "Bali",
    "Indonesia",
    "Next.js",
    "TypeScript",
  ],
  authors: [{ name: siteConfig.author.name, url: siteConfig.url }],
  creator: siteConfig.author.name,
  metadataBase: new URL(siteConfig.url),
  alternates: {
    canonical: siteConfig.url,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: `${siteConfig.author.name} — ${siteConfig.author.role}`,
    description:
      "Software Engineer from Bali, Indonesia. Specializing in React, Vue.js, Node.js, and cloud infrastructure on AWS.",
    siteName: siteConfig.name,
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.author.name} — ${siteConfig.author.role}`,
    description:
      "Software Engineer from Bali, Indonesia. Specializing in React, Vue.js, Node.js, and cloud infrastructure on AWS.",
    creator: "@lazlanrafar",
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={plusJakartaSans.variable}>
      <body className="min-h-screen flex flex-col">
        <Providers>{children}</Providers>
        <GoogleAnalytics />
      </body>
    </html>
  );
}

