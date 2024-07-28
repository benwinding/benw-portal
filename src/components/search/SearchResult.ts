import { BlogPost } from "components/blog/useBlogPosts";
import { Project } from "components/projects";
import dayjs from "dayjs";

export type SearchResult =
  & {
    title: string;
    date: Date;
    href: string;
    tags: SearchTag[];
    image: string | undefined;
  }
  & ({
    type: "project";
    project: Project;
  } | {
    type: "blog";
    blog: BlogPost;
  });

export type SearchTag = {
  label: string;
  href: string;
};

const BLOG_BASE_URL = "https://blog.benwinding.com/";

export const project2Result = (project: Project): SearchResult => ({
  title: project.name,
  href: `/projects/${project.slug}`,
  date: dayjs(`${project.year}`).toDate(),
  tags: (project.tags || []).map(tag => ({ label: tag, href: `/tags/${makePathSafe(tag)}` })),
  image: project.thumbnail,
  type: "project",
  project: project,
});

export const blog2Result = (blog: BlogPost): SearchResult => ({
  title: blog.title,
  href: BLOG_BASE_URL + blog.path,
  date: dayjs(`${blog.date}`).toDate(),
  tags: (blog.tags || []).map(tag => ({ label: tag.name, href: tag.permalink })),
  image: blog?.thumbnail,
  type: "blog",
  blog: blog,
});

export function makePathSafe(str: string) {
  // Convert to lowercase
  const lowerCased = str.toLowerCase();
  // Replace spaces with underscores
  const noSpaces = lowerCased.replace(/\s+/g, "_");
  // Remove any characters that are not letters, numbers, underscores, or dashes
  const sanitized = noSpaces.replace(/[^a-z0-9_\-]/g, "");
  return sanitized;
}
