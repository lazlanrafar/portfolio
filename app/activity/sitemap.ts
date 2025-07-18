import { LIST_ACTIVITY, siteConfig } from "@/constants";
import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const activities = LIST_ACTIVITY;

  return activities.map((item) => ({
    url: `${siteConfig.url}${item.path}`,
    changeFrequency: "daily",
    priority: 0.7,
  }));
}
