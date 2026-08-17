import { LayoutProject } from "components/projects/LayoutProject";
import { PhotoGallery } from "components/projects/PhotoGallery";
import { getPostBySlug } from "components/projects/projects-service2";
import React from "react";
import { PROJECTS } from "src/projects.generated";
import "github-markdown-css/github-markdown.css";

type PageParams = {
  slug: string;
};

type PageInitialProps = {
  params: PageParams;
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
  const gallery = item.metadata.gallery != null
    ? <PhotoGallery photoUrls={item.metadata.gallery} />
    : null;
  return <LayoutProject project={item.metadata} >
    {gallery}
    {markdownRendered}
  </LayoutProject>;
};
export default Page;

export async function generateStaticParams(): Promise<PageParams[]> {
  return PROJECTS.map(({ slug }) => ({ slug }));
}
