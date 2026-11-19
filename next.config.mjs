import legacyProjectIds from "./lib/legacy-project-ids.json" with { type: "json" };

// Images come from KadoCMS (KADOCMS_URL), already resized there.
const kadoHost = process.env.KADOCMS_URL ? new URL(process.env.KADOCMS_URL).hostname : null;

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // KadoCMS media URLs never change content (immutable), so optimized copies can live long.
    minimumCacheTTL: 31536000,
    remotePatterns: [
      ...(kadoHost ? [{ protocol: "https", hostname: kadoHost }] : []),
      {
        protocol: "https",
        hostname: "github.com",
      },
    ],
  },
  // Project pages moved from microCMS ids to KadoCMS slugs; old links keep working.
  async redirects() {
    return [
      // One host: www would otherwise serve a duplicate of every page.
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.lazlanrafar.com" }],
        destination: "https://lazlanrafar.com/:path*",
        permanent: true,
      },
      ...Object.entries(legacyProjectIds).map(([id, slug]) => ({
        source: `/projects/${id}`,
        destination: `/projects/${slug}`,
        permanent: true,
      })),
    ];
  },
};

export default nextConfig;
