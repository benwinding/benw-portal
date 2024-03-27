"use server";
import { readdirSync, readFileSync } from "fs";
import matter from "gray-matter";
import { orderBy } from "lodash";
import { join } from "path";
import { remark } from "remark";
import html from "remark-html";
import { PROJECTS } from "src/projects.generated";

const POSTS_DIR = join(process.cwd(), "src/projects");

async function getPosts() {
  const projectMdxPaths = readdirSync(POSTS_DIR);
  const projectsAll = await Promise.all(projectMdxPaths.map(async fileName => getPost(fileName)));
  const projectsOrdered = orderBy(projectsAll, ["year", "name"], ["desc", "asc"]);
  return projectsOrdered;
}

async function getPost(fileName: string) {
  // Remove ".mdx" from file name to get slug
  const slug = fileName.replace(/\.mdx$/, "");

  // Read markdown file as string
  const fullPath = join(POSTS_DIR, fileName);
  const fileContents = readFileSync(fullPath, "utf8");

  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents);

  // Use remark to convert markdown into HTML string
  const processedContent = await remark()
    .use(html)
    .process(matterResult.content);
  const contentHtml = processedContent.toString();

  const metadata = PROJECTS.find(p => p.slug === slug);

  return { slug, contentHtml, metadata };
}

const allPosts = getPosts();

export async function GetProjectsAll2() {
  return allPosts;
}

export const getProjectFromSlug = async (slug: string) => {
  const projects = await allPosts;
  const post = projects.find((project) => project.slug === slug);
  if (!post) {
    throw new Error(`No project found with slug ${slug}`);
  }
  return post;
};
