import { ResultsList } from "components/search/ResultsList";
import { makePathSafe, project2Result } from "components/search/SearchResult";
import React from "react";
import { PROJECTS, TAGS } from "src/projects.generated";

type PageParams = {
  slug: string;
};

type PageInitialProps = {
  params: PageParams;
};

const Page = (props: PageInitialProps) => {
  const slug = props.params.slug;
  const matchingResults = PROJECTS.filter(post => post.tags.some(t => makePathSafe(t) === slug)).map(project2Result);
  return (
    <div>
      <h1>Tag: {props.params.slug}</h1>
      <ResultsList results={matchingResults} />
    </div>
  );
};
export default Page;

export async function generateStaticParams(): Promise<PageParams[]> {
  return TAGS.map((tag) => ({ slug: makePathSafe(tag) }));
}
