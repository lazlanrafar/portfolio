import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";
import { GoogleAnalytics } from "@/components/atoms/google-analytics";
import { siteConfig } from "@/lib/data";
import { getProfile } from "@/lib/profile";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export async function generateMetadata(): Promise<Metadata> {
  // Site-wide defaults only. Each page sets its own canonical URL and share card
  // (lib/seo.ts pageMetadata); a canonical here would point every page at the home page.
  const { name, role } = await getProfile();
  return {
    title: {
      default: `${name} — ${role}`,
      template: `%s | ${siteConfig.name}`,
    },
    description: siteConfig.description,
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
    authors: [{ name: name, url: siteConfig.url }],
    creator: name,
    metadataBase: new URL(siteConfig.url),
    openGraph: {
      type: "website",
      locale: "en_US",
      siteName: siteConfig.name,
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
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={plusJakartaSans.variable}
    >
      <body className="min-h-screen flex flex-col">
        <Providers>{children}</Providers>
        <GoogleAnalytics />
      </body>
    </html>
  );
}
