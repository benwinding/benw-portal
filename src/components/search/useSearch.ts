"use client";
import { BlogPost, useBlogPosts } from "components/blog/useBlogPosts";
import { GetProjectsAll, Project } from "components/projects";
import dayjs from "dayjs";
import { orderBy } from "lodash";
import React from "react";
import { blog2Result, project2Result, SearchResult } from "./SearchResult";
import { SearchResults } from "./SearchResults";

const projects = GetProjectsAll();

function useAllResults(): SearchResult[] {
  const blogPosts = useBlogPosts();

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

  return allResults;
}

export function useSearch() {
  const [searchText, setSearchText] = React.useState("");
  const allResults = useAllResults();

  const results = React.useMemo(() => {
    const searched = SearchResults(allResults, {
      searchText,
    });
    // console.log({allResults, searched});
    return searched;
  }, [allResults, searchText]);
  return { setSearchText, results };
}
