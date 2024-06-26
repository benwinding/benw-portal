import { ResultsList } from "components/search/ResultsList";
import { makePathSafe, project2Result } from "components/search/SearchResult";
import React from "react";
import { PROJECTS, TAGS } from "src/projects.generated";
import { HeadingTag } from "./HeadingTag";

type PageParams = {
  slug: string;
};

type PageInitialProps = {
  params: PageParams;
};

const Page = (props: PageInitialProps) => {
  const slug = props.params.slug;
  const tagLabel = TAGS.find((tag) => makePathSafe(tag) === slug);
  const matchingResults = PROJECTS.filter(post => post.tags.some(t => makePathSafe(t) === slug)).map(project2Result);
  return (
    <div className="flex flex-col gap-3">
      <h1 className="flex flex-row gap-2 items-center">
        <span>Tag</span>
        <span>→</span>
        <HeadingTag value={tagLabel} />
      </h1>
      <ResultsList results={matchingResults} selectedTagLabel={tagLabel} />
    </div>
  );
};
export default Page;

export async function generateStaticParams(): Promise<PageParams[]> {
  return TAGS.map((tag) => ({ slug: makePathSafe(tag) }));
}
