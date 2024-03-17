import { GetProjectsAll, Project } from 'components/projects';
import {LayoutProject } from 'components/projects/LayoutProject';
import React from 'react';

const allProjects = GetProjectsAll();

type PageInitialProps = {
  params: {
    slug: string,
  }
}

const Page = async (props: PageInitialProps) => {
  const project = await getProjectFromSlug(props.params.slug);
  return <LayoutProject project={project} />;
}
export default Page

export async function generateStaticParams() {
  return allProjects.map((project) => ({
    slug: project.slug,
  }))
}

const getProjectFromSlug = async (slug: string): Promise<Project> => {
  const post = allProjects.find((project) => project.slug === slug);
  if (!post) {
    throw new Error(`No project found with slug ${slug}`);
  }
  return post;
}
