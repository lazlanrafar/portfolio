/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || "https://lazlanrafar.com",
  generateRobotsTxt: true,
  changefreq: "weekly",
  priority: 0.7,
  sitemapSize: 7000,

  // Additional paths to include
  additionalPaths: async (config) => [
    await config.transform(config, "/about/personal.ts"),
    await config.transform(config, "/activity/languages"),
    await config.transform(config, "/activity/code-editor"),
    await config.transform(config, "/activity/operating-systems"),
    await config.transform(config, "/activity/weekly-activity"),
  ],

  // Exclude paths
  exclude: ["/api/*", "/admin/*", "/private/*", "/_next/*", "/404", "/500"],

  // Custom transformation for specific routes
  transform: async (config, path) => {
    // Custom priorities for different sections
    let priority = 0.7;
    let changefreq = "weekly";

    if (path === "/") {
      priority = 1.0;
      changefreq = "daily";
    } else if (path.startsWith("/projects")) {
      priority = 0.9;
      changefreq = "weekly";
    } else if (path.startsWith("/about")) {
      priority = 0.8;
      changefreq = "monthly";
    } else if (path.startsWith("/activity")) {
      priority = 0.6;
      changefreq = "weekly";
    }

    return {
      loc: path,
      changefreq,
      priority,
      lastmod: new Date().toISOString(),
    };
  },

  // Robot.txt configuration
  robotsTxtOptions: {
    policies: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/admin/", "/private/", "/_next/"],
      },
    ],
    additionalSitemaps: ["https://lazlanrafar.com/sitemap.xml"],
  },
};
