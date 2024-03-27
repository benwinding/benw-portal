import { Project } from "components/projects";
import { LayoutProject } from "components/projects/LayoutProject";
import { GetProjectsAll2 } from "components/projects/projects-service2";
import React from "react";

type PageInitialProps = {
  params: {
    slug: string;
  };
};

const Page = async (props: PageInitialProps) => {
  const project = await getProjectFromSlug(props.params.slug);
  return <LayoutProject project={project} />;
};
export default Page;

export async function generateStaticParams() {
  const projects = await GetProjectsAll2();
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

const getProjectFromSlug = async (slug: string): Promise<Project> => {
  const projects = await GetProjectsAll2();
  const post = projects.find((project) => project.slug === slug);
  if (!post) {
    throw new Error(`No project found with slug ${slug}`);
  }
  return post;
};
