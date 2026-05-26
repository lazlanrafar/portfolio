import type { MDXComponents } from "mdx/types";
import Image, { type ImageProps } from "next/image";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

type ComponentsProps = React.HTMLAttributes<HTMLElement>;

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return { ...components };
}

export const mdxComponents: MDXComponents = {
  h1: ({ className, ...props }: ComponentsProps) => (
    <h1 className={cn("mt-6 mb-4 text-2xl font-bold", className)} {...props} />
  ),
  h2: ({ className, ...props }: ComponentsProps) => (
    <h2 className={cn("mt-6 mb-4 text-xl font-bold", className)} {...props} />
  ),
  h3: ({ className, ...props }: ComponentsProps) => (
    <h3 className={cn("mt-6 mb-4 text-base font-bold", className)} {...props} />
  ),
  h4: ({ className, ...props }: ComponentsProps) => (
    <h4 className={cn("mt-6 mb-4 text-base font-semibold", className)} {...props} />
  ),
  p: ({ className, ...props }: ComponentsProps) => (
    <p className={cn("text-muted-foreground mb-4 text-sm md:text-base", className)} {...props} />
  ),
  a: ({ className, href, children, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <a
      className={cn("text-foreground hover:underline font-medium", className)}
      href={href}
      target={href?.startsWith("http") ? "_blank" : undefined}
      rel={href?.startsWith("http") ? "noopener noreferrer" : undefined}
      {...props}
    >
      {children}
    </a>
  ),
  blockquote: ({ className, ...props }: ComponentsProps) => (
    <blockquote
      className={cn(
        "mb-4 border-s-2 border-zinc-500 bg-linear-to-r from-zinc-500/20 to-transparent px-4 py-2 text-sm text-zinc-600 md:text-base dark:text-zinc-400 [&>p]:mb-0",
        className,
      )}
      {...props}
    />
  ),
  code: ({ className, children, ...props }: ComponentsProps) => {
    const isBlock = !!(props as Record<string, unknown>)["data-theme"];
    if (isBlock) {
      return (
        <code className={className} {...props}>
          {children}
        </code>
      );
    }
    return (
      <code
        className={cn(
          "border-border bg-muted text-foreground border px-1.5 py-0.5 font-mono text-sm",
          className,
        )}
        {...props}
      >
        {children}
      </code>
    );
  },
  pre: ({ className, children, ...props }: ComponentsProps) => (
    <div className="mb-4 w-full max-w-lg border-2 border-dashed p-1 sm:p-2">
      <div className="no-scrollbar relative min-h-8 w-full overflow-x-auto bg-[#f7f7f7] text-sm dark:bg-[#101010]">
        <pre className={cn("p-4", className)} {...props}>
          {children}
        </pre>
      </div>
    </div>
  ),
  ul: ({ className, ...props }: React.HTMLAttributes<HTMLUListElement>) => (
    <ul className={cn("my-4 list-none [&_li]:text-muted-foreground", className)} {...props} />
  ),
  ol: ({ className, ...props }: React.HTMLAttributes<HTMLOListElement>) => (
    <ol
      className={cn(
        "my-4 list-decimal pl-5 [&_li]:pl-2 [&_li]:text-muted-foreground",
        className,
      )}
      {...props}
    />
  ),
  li: ({ className, ...props }: React.HTMLAttributes<HTMLLIElement>) => (
    <li className="mt-2 flex items-start gap-2">
      <ChevronRight size={12} className="text-foreground mt-[5px] shrink-0" />
      <span className={cn("text-sm [&>p]:mb-0 [&>p]:text-sm", className)} {...props} />
    </li>
  ),
  strong: ({ className, ...props }: React.HTMLAttributes<HTMLElement>) => (
    <strong className={cn("text-foreground font-semibold", className)} {...props} />
  ),
  em: ({ className, ...props }: React.HTMLAttributes<HTMLElement>) => (
    <em className={cn("text-muted-foreground italic", className)} {...props} />
  ),
  hr: () => (
    <div className="text-muted-foreground/60 relative my-6 h-8 text-center font-mono text-sm tracking-normal">
      ︵︵﹆ . ⁺ . ✦ ﹒₊˚𓂃 ★﹒₊‧
    </div>
  ),
  img: ({
    className,
    alt = "",
    src,
    width = 800,
    height = 450,
    ...props
  }: Omit<ImageProps, "src"> & { src: string }) => (
    <div className="relative mb-4 aspect-video w-full max-w-lg overflow-hidden border-2 border-dashed p-1 sm:p-2">
      <Image
        className={cn("h-auto w-full object-cover", className)}
        alt={alt}
        src={src}
        width={width as number}
        height={height as number}
        loading="lazy"
        {...props}
      />
    </div>
  ),
};
