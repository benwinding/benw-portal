import { cachedFetchAllBlogPosts } from "components/blog/serverFetchAllBlogPosts";
import { ResultsList } from "components/search/ResultsList";
import { blog2Result, makePathSafe, project2Result } from "components/search/SearchResult";
import React from "react";
import { PROJECTS, TAGS } from "src/projects.generated";
import { HeadingTag } from "./HeadingTag";

type PageParams = {
  slug: string;
};

type PageInitialProps = {
  params: PageParams;
};

const Page = async (props: PageInitialProps) => {
  const slug = props.params.slug;

  const { allResults, allTags } = await fetchAllResults();
  const matchingResults = allResults.filter(result => result.tags.some(tag => makePathSafe(tag.label) === slug));

  return (
    <div className="flex flex-col gap-3">
      <h1 className="flex flex-row gap-2 items-center">
        <span>Tag</span>
        <span>→</span>
        <HeadingTag allTags={allTags || []} value={slug} />
      </h1>
      <ResultsList results={matchingResults || []} selectedTagLabel={slug} />
    </div>
  );
};
export default Page;

export async function generateStaticParams(): Promise<PageParams[]> {
  const { allTags } = await fetchAllResults();
  return allTags.map((tag) => ({
    slug: makePathSafe(tag),
  }));
}

const fetchAllResults = async () => {
  const allBlogPosts = await cachedFetchAllBlogPosts();
  const blogPostTags = allBlogPosts.flatMap(post => post.tags).map(tag => tag.name);
  const allTags = Array.from(new Set([...TAGS, ...blogPostTags])).sort();

  const allProjects = PROJECTS.map(project2Result);
  const allItemsBlog = allBlogPosts.map(blog2Result);

  const allResults = Array.from(
    new Set([
      ...allProjects,
      ...allItemsBlog,
    ]),
  );
  return { allResults, allTags };
};
