import fs from "fs";
import { join } from "path";
import util from "util";

import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";
import { PROJECTS } from "src/projects.generated";

const readFile = util.promisify(fs.readFile);

const POSTS_DIR = join(process.cwd(), "src/projects");

export const getPostBySlug = async (slug: string) => {
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
};
