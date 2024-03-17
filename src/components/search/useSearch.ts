"use client"
import { BlogPost, useBlogPosts } from "components/blog/useBlogPosts";
import { GetProjectsAll, Project } from "components/projects";
import React from "react";
import dayjs from "dayjs";
import { orderBy } from "lodash";

export type SearchResult = {
  title: string,
  date: Date,
  href: string,
  tags: string[],
} & ({
  type: 'project',
  project: Project,
} | {
  type: 'blog',
  blog: BlogPost,
})

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
      type: 'project',
      project: project,
    }));
    const itemsBlog = blogPosts.map((blog): SearchResult => ({
      title: blog.title,
      href: BLOG_BASE_URL + blog.path,
      date: dayjs(`${blog.date}`).toDate(),
      tags: blog?.tags.map(t => t.name) || [],
      type: 'blog',
      blog: blog,
    }));
    const allResults = [
      ...itemsProjects, 
      ...itemsBlog,
    ];
    return orderBy(allResults, ["date"], ['desc']);
  }, [blogPosts]);

  return allResults;
}

export function useSearch() {
  const [searchText, setSearchText] = React.useState("");
  const allResults = useAllResults();

  const results = React.useMemo(() => {
    return SearchResults(allResults, {
      searchText,
    })
  }, [allResults, searchText]);
  return {setSearchText, results};
}

function SearchResults(allResults: SearchResult[], opts: { searchText: string }): SearchResult[] {
  const filteredResults: (SearchResult & {rank: ResultRank})[] = []
  // 1. Filter results
  allResults.forEach(result => {
    // 2. Rank result
    const rank = GetResultRank(result, opts.searchText);
    const nothingMatched = !rank.tagsRank && !rank.titleRank;
    if (nothingMatched) {
      return;
    }
    filteredResults.push({...result, rank});
  });
  // 3. Order by rank
  const ordered = orderBy(filteredResults, ["rank.titleRank", "rank.tagsRank", "rank.recencyRank"], ['desc', 'desc', 'desc']);
  return ordered
}

type ResultRank = {
  titleRank: number,
  recencyRank: number,
  tagsRank: number,
};

const MAX_DATE = Number(new Date());
function GetResultRank(result: SearchResult, searchText: string): ResultRank {
  const titleRank = GetTitleRank(result.title, searchText);
  const recencyRank = 1 - ((MAX_DATE - Number(result.date)) / MAX_DATE);
  const tagsRank = GetTagsRank(result.tags, searchText);
  return {
    titleRank,
    recencyRank,
    tagsRank,
  };
}

function GetTagsRank(tags: string[], searchText: string): number {
  const searchTextLower = searchText.toLowerCase();
  const searchParts = searchTextLower.split(" ");
  const tagMatchCount = searchParts.reduce((count, part) => {
    const isInTags = tags.includes(part);
    if (isInTags) {
      return count + 1;
    }
    const partialMatch = tags.find(tag => tag.includes(part));
    if (partialMatch) {
      return count + 0.5;
    }
    return count;
  }, 0);
  return tagMatchCount;
}

function GetTitleRank(title: string, searchText: string): number {
  const startsWithCase = title.startsWith(searchText);
  if (startsWithCase) {
    return 1;
  }
  const titleLower = title.toLowerCase();
  const searchTextLower = searchText.toLowerCase();
  const startsWithOutCase = titleLower.startsWith(searchTextLower);
  if (startsWithOutCase) {
    return 0.9;
  }
  const matchesWithoutCase = titleLower.includes(searchTextLower);
  if (matchesWithoutCase) {
    return 0.7;
  }
  const titleReverseMatches = searchTextLower.includes(titleLower);
  if (titleReverseMatches) {
    return 0.6;
  }
  const wordsInTitleCount = searchTextLower.split(' ').reduce((prev, searchPart) => {
    const hasSearchPart = titleLower.includes(searchPart);
    return hasSearchPart ? prev + 1 : prev;
  }, 0);
  const percentOfWordsInTitle = wordsInTitleCount / titleLower.split(' ').length;
  return percentOfWordsInTitle;
}
