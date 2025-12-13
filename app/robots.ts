import { siteConfig } from "@/constants";
import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/private/",
        "/*.ts$",
        "/*.tsx$",
        "/*.js$",
        "/*.json$",
        "/*.woff*$",
        "/_next/static/",
      ],
    },
    sitemap: [
      `${siteConfig.url}/sitemap.xml`,
      `${siteConfig.url}/about/sitemap.xml`,
      `${siteConfig.url}/activity/sitemap.xml`,
    ],
  };
}
