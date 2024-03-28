import { LayoutProject } from "components/projects/LayoutProject";
import { getPostBySlug, GetProjectsAll2 } from "components/projects/projects-service2";
import React from "react";
import "github-markdown-css/github-markdown.css";

type PageInitialProps = {
  params: {
    slug: string;
  };
};

const Page = async (props: PageInitialProps) => {
  const item = await getPostBySlug(props.params.slug);
  const markdownRendered = (
    <article
      className="markdown-body w-full mx-auto pt-4"
      dangerouslySetInnerHTML={{ __html: item.contentHtml }}
    >
    </article>
  );
  return <LayoutProject project={item.metadata} content={markdownRendered} />;
};
export default Page;

export async function generateStaticParams() {
  const projects = await GetProjectsAll2();
  return projects.map((project) => ({
    slug: project.slug,
  }));
}
