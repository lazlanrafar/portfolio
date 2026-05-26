import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // add images.microcms-assets.io
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.microcms-assets.io",
      },
      {
        protocol: "https",
        hostname: "github.com",
      },
    ],
  },
};

export default nextConfig;
