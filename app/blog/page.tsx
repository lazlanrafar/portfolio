import Link from "next/link";
import Image from "next/image";
import { JsonLd } from "@/components/atoms/json-ld";
import { breadcrumbLd, collectionLd, graph, pageMetadata } from "@/lib/seo";
import type { Metadata } from "next";
import { PageLayout } from "@/components/templates/page-layout";
import { SectionWrapper } from "@/components/motion/section-wrapper";
import { getAllPosts, formatPostDate } from "@/lib/posts";
import { FilterableList } from "@/components/organisms/filterable-list";

export const metadata: Metadata = pageMetadata({
  title: "Blog",
  description: "Thoughts on code, design, and software engineering.",
  path: "/blog",
});

export default async function BlogPage() {
  const posts = await getAllPosts();

  return (
    <PageLayout>
      <JsonLd
        data={graph(
          collectionLd(
            "Blog",
            "/blog",
            "Thoughts on code, design, and software engineering.",
            posts.map((p) => ({ name: p.title, path: `/blog/${p.slug}` })),
          ),
          breadcrumbLd([
            { name: "Home", path: "/" },
            { name: "Blog", path: "/blog" },
          ]),
        )}
      />
      <SectionWrapper
        id="blog"
        className="flex flex-col items-center gap-y-16 px-4 md:gap-y-20 md:px-8 lg:gap-y-24 lg:px-16"
      >
        <div className="w-full space-y-8">
          <div className="w-full space-y-4">
            <div className="flex h-8 w-full items-center">
              <h1 className="text-foreground text-sm font-bold uppercase leading-none">
                Blog
              </h1>
            </div>
            <p className="text-muted-foreground text-sm md:text-base">
              Thoughts on code, design, and software engineering.
            </p>
          </div>

          {posts.length === 0 ? (
            <p className="text-muted-foreground text-sm">No posts yet.</p>
          ) : (
            <FilterableList
              noun="posts"
              nounOne="post"
              listClassName="flex flex-col gap-6"
              items={posts.map((post, i) => ({
                id: post.slug,
                text: [post.title, post.description, ...post.tags].join(" "),
                tags: post.tags,
                node: (
                  <Link
                    href={`/blog/${post.slug}`}
                    className="group flex items-start gap-4"
                  >
                    <div className="bg-muted relative aspect-video w-32 shrink-0 overflow-hidden sm:w-56">
                      {post.image && (
                        <Image
                          src={post.image}
                          alt={post.title}
                          fill
                          sizes="(min-width: 640px) 224px, 128px"
                          loading={i === 0 ? "eager" : "lazy"}
                          fetchPriority={i === 0 ? "high" : "auto"}
                          placeholder={post.imageBlur ? "blur" : "empty"}
                          blurDataURL={post.imageBlur}
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      )}
                    </div>
                    <div className="min-w-0 flex-1 space-y-1">
                      <div className="flex flex-wrap gap-2">
                        {post.tags.map((tag) => (
                          <span
                            key={tag}
                            className="bg-muted text-muted-foreground px-2 py-0.5 text-xs font-medium"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <h2 className="text-foreground text-base font-semibold group-hover:underline">
                        {post.title}
                      </h2>
                      <p className="text-muted-foreground line-clamp-2 text-sm">
                        {post.description}
                      </p>
                      <p className="text-muted-foreground text-xs">
                        {formatPostDate(post.date)}
                      </p>
                    </div>
                  </Link>
                ),
              }))}
            />
          )}
        </div>
      </SectionWrapper>
    </PageLayout>
  );
}
