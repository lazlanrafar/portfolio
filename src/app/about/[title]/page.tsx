import { MDXComponent } from "@/components/molecules/mdx-component";
import { allAbouts } from "contentlayer/generated";
import { notFound } from "next/navigation";

type ParamsProps = {
  title: string;
};

async function getContent(params: ParamsProps) {
  const post = allAbouts.find((post) => post.title === params.title);
  if (!post) null;
  return post;
}

export default async function AboutPage({ params }: { params: ParamsProps }) {
  const content = await getContent(params);
  if (!content) return notFound();

  return <MDXComponent code={content.body.code} />;
}
