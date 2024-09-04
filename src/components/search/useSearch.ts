"use client";
import { useBlogPosts } from "components/blog/useBlogPosts";
import { GetProjectsAll } from "components/projects";
import { debounce, orderBy } from "lodash";
import React from "react";
import { blog2Result, project2Result } from "./SearchResult";
import { SearchResults } from "./SearchResults";

const projects = GetProjectsAll();

function useAllResults() {
  const { blogPosts, loaded: blogsLoaded } = useBlogPosts();

  const allResults = React.useMemo(() => {
    const itemsProjects = projects.map(project2Result);
    const itemsBlog = blogPosts.map(blog2Result);

    const allResults = [
      ...itemsProjects,
      ...itemsBlog,
    ];
    const ordered = orderBy(allResults, ["date"], ["desc"]);
    // console.log({allResults, ordered})
    return ordered;
  }, [blogPosts]);

  return { allResults, blogsLoaded };
}

export function useSearch() {
  const [searchText, setSearchText] = React.useState("");
  const { allResults, blogsLoaded } = useAllResults();

  const results = React.useMemo(() => {
    const searched = SearchResults(allResults, {
      searchText,
    });
    // console.log({allResults, searched});
    return searched;
  }, [allResults, searchText]);

  const setSearchTextDebounced = debounce(setSearchText, 200);
  return { setSearchText: setSearchTextDebounced, results, blogsLoaded };
}
