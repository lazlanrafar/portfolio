import type { Metadata } from "next";
import { Noto_Sans_JP, Plus_Jakarta_Sans } from "next/font/google";
import "../globals.css";
import { Providers } from "@/components/providers";
import { GoogleAnalytics } from "@/components/atoms/google-analytics";
import { siteConfig } from "@/lib/data";
import { getDictionary, langFrom } from "@/lib/dictionary";
import { LOCALES } from "@/lib/i18n";
import { getProfile } from "@/lib/profile";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

// Plus Jakarta Sans has no Japanese glyphs. Used only on /ja pages, and not preloaded.
const notoSansJp = Noto_Sans_JP({
  variable: "--font-noto-sans-jp",
  weight: ["400", "500", "600", "700"],
  display: "swap",
  preload: false,
});

/** Only the site's languages; anything else under [lang] is a 404. */
export const dynamicParams = false;

export function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }));
}

interface Props {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  // Site-wide defaults only. Each page sets its own canonical URL, language alternates and
  // share card (lib/seo.ts pageMetadata); a canonical here would point every page at the home page.
  const lang = await langFrom(params);
  const { name, role } = await getProfile(lang);
  return {
    title: {
      default: `${name} — ${role}`,
      template: `%s | ${siteConfig.name}`,
    },
    description: getDictionary(lang).meta.site,
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
    authors: [{ name, url: siteConfig.url }],
    creator: name,
    metadataBase: new URL(siteConfig.url),
    openGraph: {
      type: "website",
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

export default async function RootLayout({ children, params }: Props) {
  const lang = await langFrom(params);
  const fonts = [
    plusJakartaSans.variable,
    lang === "ja" ? notoSansJp.variable : "",
  ].join(" ");
  return (
    <html lang={lang} suppressHydrationWarning className={fonts}>
      <body className="min-h-screen flex flex-col">
        <Providers>{children}</Providers>
        <GoogleAnalytics />
      </body>
    </html>
  );
}
