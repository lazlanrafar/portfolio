import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Share2, BadgeCheck } from "lucide-react";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/atoms/json-ld";
import {
  pageUrl,
  breadcrumbLd,
  graph,
  pageMetadata,
  personRef,
  shareImage,
} from "@/lib/seo";
import type { Metadata } from "next";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";

import { PageLayout } from "@/components/templates/page-layout";
import { PostToc } from "@/components/molecules/post-toc";
import { getAllPosts, getPost, formatPostDate } from "@/lib/posts";
import { getProfile } from "@/lib/profile";
import { getDictionary, langFrom } from "@/lib/dictionary";
import { format, localePath } from "@/lib/i18n";
import { mdxComponents } from "@/mdx-components";

interface Props {
  params: Promise<{ lang: string; slug: string }>;
}

export async function generateStaticParams() {
  // Slugs are shared by every language.
  const posts = await getAllPosts("en");
  return posts.map((post) => ({ slug: post.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const lang = await langFrom(params);
  const post = await getPost(slug, lang);

  if (!post) return { title: getDictionary(lang).blog.notFound };

  const image = post.seo?.image ?? post.image;
  return pageMetadata({
    lang,
    title: post.seo?.title ?? post.title,
    description: post.seo?.description ?? post.description,
    path: `/blog/${post.slug}`,
    image: image ? shareImage(image) : undefined,
    article: { publishedTime: post.date, authors: [pageUrl(lang, "/about")] },
  });
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const lang = await langFrom(params);
  const dict = getDictionary(lang);
  const post = await getPost(slug, lang);

  if (!post) notFound();
  const author = await getProfile(lang);
  const url = pageUrl(lang, `/blog/${slug}`);

  const shareUrl = `https://x.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(url)}`;

  return (
    <PageLayout lang={lang}>
      <JsonLd
        data={graph(
          {
            "@type": "BlogPosting",
            headline: post.title,
            description: post.description,
            url,
            mainEntityOfPage: url,
            ...(post.image && { image: shareImage(post.image) }),
            datePublished: post.date,
            author: personRef(author, lang),
            publisher: personRef(author, lang),
            inLanguage: lang,
          },
          breadcrumbLd(lang, [
            { name: dict.breadcrumb.home, path: "/" },
            { name: dict.blog.title, path: "/blog" },
            { name: post.title, path: `/blog/${post.slug}` },
          ]),
        )}
      />
      <article className="relative flex h-auto w-full grow px-4 md:px-8 lg:px-16">
        <PostToc toc={post.toc} title={dict.toc} />

        <div className="mx-auto w-full max-w-2xl space-y-10 md:space-y-12 lg:space-y-16">
          <div className="flex w-full items-center justify-between">
            <Link
              href={localePath(lang, "/blog")}
              aria-label={dict.blog.backLabel}
              className="text-muted-foreground hover:text-foreground anim flex items-center gap-x-2"
            >
              <ArrowLeft className="size-4" />
              <p className="text-sm font-medium">{dict.blog.back}</p>
            </Link>
            <Link
              href={shareUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={format(dict.blog.share, { title: post.title })}
              className="text-muted-foreground hover:text-foreground anim flex size-9 items-center justify-center"
            >
              <Share2 className="size-4" />
            </Link>
          </div>

          <div className="flex w-full flex-col">
            <div className="mb-4 space-y-1 sm:mb-6">
              <h1 className="text-xl font-bold sm:text-2xl">{post.title}</h1>
              <p className="text-muted-foreground text-sm font-medium md:text-base">
                {formatPostDate(post.date, lang)}
              </p>
            </div>

            {post.image && (
              <div className="relative mb-4 aspect-video h-auto w-full overflow-hidden sm:mb-6">
                <Image
                  src={post.image}
                  alt={format(dict.blog.cover, { title: post.title })}
                  fill
                  sizes="(min-width: 1024px) 672px, 90vw"
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
                <p className="text-foreground text-sm font-semibold">
                  {author.name}
                </p>
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
                          onVisitLine(node: {
                            children: { type: string; value: string }[];
                          }) {
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
