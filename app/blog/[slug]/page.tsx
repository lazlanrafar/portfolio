import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Share2, BadgeCheck } from "lucide-react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";

import { PageLayout } from "@/components/templates/page-layout";
import { PostToc } from "@/components/molecules/post-toc";
import { getAllPosts, getPost, formatPostDate } from "@/lib/posts";
import { siteConfig } from "@/lib/data";
import { getProfile } from "@/lib/profile";
import { mdxComponents } from "@/mdx-components";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) return { title: "Post Not Found" };

  const title = post.seo?.title ?? post.title;
  const description = post.seo?.description ?? post.description;
  const image = post.seo?.image ?? post.image;
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      images: image ? [{ url: image }] : [],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) notFound();
  const author = await getProfile();

  const shareUrl = `https://x.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(`${siteConfig.url}/blog/${slug}`)}`;

  return (
    <PageLayout>
      <article className="relative flex h-auto w-full grow px-4">
        <PostToc toc={post.toc} />

        <div className="mx-auto w-full max-w-lg space-y-10 md:max-w-md md:space-y-12 lg:max-w-lg lg:space-y-16">
          <div className="flex w-full items-center justify-between">
            <Link
              href="/blog"
              className="text-muted-foreground hover:text-foreground anim flex items-center gap-x-2"
            >
              <ArrowLeft className="size-4" />
              <p className="text-sm font-medium">Go back</p>
            </Link>
            <Link
              href={shareUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Tweet about ${post.title}`}
              className="text-muted-foreground hover:text-foreground anim flex size-9 items-center justify-center"
            >
              <Share2 className="size-4" />
            </Link>
          </div>

          <div className="flex w-full flex-col">
            <div className="mb-4 space-y-1 sm:mb-6">
              <h1 className="text-xl font-bold sm:text-2xl">{post.title}</h1>
              <p className="text-muted-foreground text-sm font-medium md:text-base">
                {formatPostDate(post.date)}
              </p>
            </div>

            {post.image && (
              <div className="relative mb-4 aspect-video h-auto w-full overflow-hidden sm:mb-6">
                <Image
                  src={post.image}
                  alt={`${post.title} cover image`}
                  fill
                  sizes="(min-width: 1024px) 512px, 90vw"
                  className="object-cover"
                  preload
                  placeholder={post.imageBlur ? "blur" : "empty"}
                  blurDataURL={post.imageBlur}
                />
              </div>
            )}

            <div className="mb-4 flex items-center gap-3">
              <div className="relative">
                <div className="size-11 overflow-hidden">
                  <Image
                    src="https://github.com/lazlanrafar.png"
                    alt={author.name}
                    width={44}
                    height={44}
                    className="object-cover"
                  />
                </div>
                <BadgeCheck
                  size={20}
                  className="text-background absolute -right-1 -bottom-1 fill-green-500"
                />
              </div>
              <div className="flex flex-col">
                <p className="text-foreground text-sm font-semibold">{author.name}</p>
                <p className="text-muted-foreground text-xs font-medium">
                  {author.role}
                </p>
              </div>
            </div>

            <div className="mdx">
              <MDXRemote
                source={post.content}
                components={mdxComponents}
                options={{
                  mdxOptions: {
                    remarkPlugins: [remarkGfm],
                    rehypePlugins: [
                      rehypeSlug,
                      [
                        rehypePrettyCode,
                        {
                          theme: { dark: "github-dark", light: "github-light" },
                          keepBackground: false,
                          onVisitLine(node: { children: { type: string; value: string }[] }) {
                            if (node.children.length === 0) {
                              node.children.push({ type: "text", value: " " });
                            }
                          },
                        },
                      ],
                      [
                        rehypeAutolinkHeadings,
                        {
                          behavior: "wrap",
                          properties: {
                            className: ["subheading-anchor"],
                            ariaLabel: "Link to section",
                          },
                        },
                      ],
                    ],
                  },
                }}
              />
            </div>
          </div>
        </div>
      </article>
    </PageLayout>
  );
}
