import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { PageLayout } from "@/components/templates/page-layout";
import { getAllPosts, formatPostDate } from "@/lib/posts";
import { siteConfig } from "@/lib/data";

export const metadata: Metadata = {
  title: "Blog",
  description: "Thoughts on code, design, and software engineering.",
  openGraph: {
    title: `Blog | ${siteConfig.name}`,
    description: "Thoughts on code, design, and software engineering.",
  },
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <PageLayout>
      <section className="mx-auto w-full max-w-lg space-y-10 px-4 py-16 md:space-y-12 lg:space-y-16">
        <div className="space-y-1">
          <h1 className="text-xl font-bold sm:text-2xl">Blog</h1>
          <p className="text-muted-foreground text-sm md:text-base">
            Thoughts on code, design, and software engineering.
          </p>
        </div>

        {posts.length === 0 ? (
          <p className="text-muted-foreground text-sm">No posts yet.</p>
        ) : (
          <ul className="space-y-8">
            {posts.map((post) => (
              <li key={post.slug}>
                <Link href={`/blog/${post.slug}`} className="group block space-y-3">
                  <div className="relative aspect-video w-full overflow-hidden">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="space-y-1">
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
                    <p className="text-muted-foreground text-xs">{formatPostDate(post.date)}</p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>
    </PageLayout>
  );
}
