import { NAVIGATION, siteConfig } from "@/constants";
import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const tabs = NAVIGATION.find((nav) => nav.title === "About")?.children;
  if (!tabs) return [];

  return tabs.map((item) => ({
    url: `${siteConfig.url}${item.path}`,
    changeFrequency: "daily",
    priority: 0.7,
  }));
}
