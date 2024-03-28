"use client";
import { useBlogPosts } from "components/blog/useBlogPosts";
import { GetProjectsAll } from "components/projects";
import dayjs from "dayjs";
import { orderBy } from "lodash";
import React from "react";
import { SearchResult } from "./SearchResult";
import { SearchResults } from "./SearchResults";

const projects = GetProjectsAll();

const BLOG_BASE_URL = "https://blog.benwinding.com/";

function useAllResults(): SearchResult[] {
  const blogPosts = useBlogPosts();

  const allResults = React.useMemo(() => {
    const itemsProjects = projects.map((project): SearchResult => ({
      title: project.name,
      href: `/projects/${project.slug}`,
      date: dayjs(`${project.year}`).toDate(),
      tags: project.tags || [],
      image: undefined,
      type: "project",
      project: project,
    }));
    const itemsBlog = blogPosts.map((blog): SearchResult => ({
      title: blog.title,
      href: BLOG_BASE_URL + blog.path,
      date: dayjs(`${blog.date}`).toDate(),
      tags: blog?.tags.map(t => t.name) || [],
      image: blog?.photos?.[0],
      type: "blog",
      blog: blog,
    }));
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
