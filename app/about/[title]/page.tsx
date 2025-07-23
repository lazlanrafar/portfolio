import { MDXComponent } from "@/components/molecules/mdx-component";
import { NAVIGATION } from "@/constants";
import { notFound } from "next/navigation";

type ParamsProps = {
  title: string;
};

async function getContent(params: ParamsProps) {
  const post = NAVIGATION.find((nav) => nav.title === "About")?.children?.find(
    (child) => child.path === `/about/${params.title}`
  );
  if (!post) null;
  return post;
}

export default async function AboutPage({
  params,
}: {
  params: Promise<ParamsProps>;
}) {
  const resolvedParams = await params;
  const content = await getContent(resolvedParams);
  if (!content) return notFound();

  return (
    <MDXComponent>
      <content.mdx_component />
    </MDXComponent>
  );
}
