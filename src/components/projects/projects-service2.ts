import fs from "fs";
import { join } from "path";
import util from "util";

import matter from "gray-matter";
import { memoize, orderBy } from "lodash";
import { remark } from "remark";
import html from "remark-html";
import { PROJECTS } from "src/projects.generated";

const readFile = util.promisify(fs.readFile);

const POSTS_DIR = join(process.cwd(), "src/projects");

async function getPosts() {
  // console.log(`.....getPosts`);
  const projectMdPaths = fs.readdirSync(POSTS_DIR);
  const projectsAll = await Promise.all(projectMdPaths.map(async fileName => getPostBySlug(fileNameToSlug(fileName))));
  const projectsOrdered = orderBy(projectsAll, ["year", "name"], ["desc", "asc"]);
  return projectsOrdered;
}

function fileNameToSlug(fileName: string) {
  // Remove ".md" from file name to get slug
  const slug = fileName.replace(/\.md$/, "");
  return slug;
}

export const getPostBySlug = memoize(async (slug: string) => {
  // console.log(`getPostBySlug: ${slug}`);
  // Read markdown file as string
  const fullPath = join(POSTS_DIR, `${slug}.md`);
  const fileContents = await readFile(fullPath, "utf8");

  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents);

  // Use remark to convert markdown into HTML string
  const processedContent = await remark()
    .use(html)
    .process(matterResult.content);
  const contentHtml = processedContent.toString();

  const metadata = PROJECTS.find(p => p.slug === slug);

  return { slug, contentHtml, metadata };
});

const allPosts = getPosts();

export async function GetProjectsAll2() {
  return allPosts;
}
