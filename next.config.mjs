import createMDX from "@next/mdx";

import remarkGfm from "remark-gfm";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  pageExtensions: ["js", "jsx", "ts", "tsx", "md", "mdx"],
  images: {
    remotePatterns: [{ hostname: "images.microcms-assets.io" }],
  },
  experimental: {
    webpackBuildWorker: true,
    serverActions: {
      enabled: true,
    },
  },
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  redirects() {
    return [
      {
        source: "/about",
        destination: "/about/personal.ts",
        permanent: true,
      },
      {
        source: "/activity",
        destination: "/activity/languages",
        permanent: true,
      },
    ];
  },
};

const withMDX = createMDX({
  options: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [
      rehypeSlug,
      rehypeAutolinkHeadings,
      [
        rehypePrettyCode,
        {
          theme: {
            dark: "github-dark-dimmed",
            light: "github-light",
          },
          keepBackground: false,
        },
      ],
    ],
  },
});

export default withMDX(nextConfig);
