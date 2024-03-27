"use server";
import { readdirSync, readFileSync } from "fs";
import matter from "gray-matter";
import { orderBy } from "lodash";
import { join } from "path";
import { Project } from "./projects-service";

const POSTS_DIR = join(process.cwd(), "src/projects");

export async function getPosts() {
  const projectMdxPaths = readdirSync(POSTS_DIR);
  const allPostsData = projectMdxPaths.map(fileName => {
    // Remove ".mdx" from file name to get id
    const id = fileName.replace(/\.mdx$/, "");

    // Read markdown file as string
    const fullPath = join(POSTS_DIR, fileName);
    const fileContents = readFileSync(fullPath, "utf8");

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents);
    const obj = { slug: id, ...matterResult.data };

    return obj;
  });
  // Return posts data
  return allPostsData;
}

const allPosts2 = getPosts();
export async function GetProjectsAll2(): Promise<Project[]> {
  const projectsAll = (await allPosts2) as unknown as Project[];
  const projectsOrdered = orderBy(projectsAll, ["year", "name"], ["desc", "asc"]);
  return projectsOrdered;
}
