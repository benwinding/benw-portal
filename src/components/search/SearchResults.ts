"use client";
import { orderBy } from "lodash";
import { SearchResult } from "./SearchResult";

export function SearchResults(allResults: SearchResult[], opts: { searchText: string }): SearchResult[] {
  const filteredResults: (SearchResult & { rank: ResultRank })[] = [];
  // 1. Filter results
  allResults.forEach(result => {
    // 2. Rank result
    const rank = GetResultRank(result, opts.searchText);
    const nothingMatched = !rank.tagsRank && !rank.titleRank;
    if (nothingMatched) {
      return;
    }
    filteredResults.push({ ...result, rank });
  });
  // 3. Order by rank
  const ordered = orderBy(filteredResults, ["rank.titleRank", "rank.tagsRank", "rank.recencyRank"], [
    "desc",
    "desc",
    "desc",
  ]);
  return ordered;
}

export type ResultRank = {
  titleRank: number;
  recencyRank: number;
  tagsRank: number;
};

export function GetResultRank(result: SearchResult, searchText: string): ResultRank {
  const searchParts = getSearchParts(searchText.toLowerCase());
  const titleRank = GetTitleRank(result.title, searchText, searchParts);
  const tagsRank = GetTagsRank(result, searchParts);
  const recencyRank = GetRecencyRank(result.date);
  return {
    titleRank,
    tagsRank,
    recencyRank,
  };
}

const MAX_DATE = Number(new Date());
function GetRecencyRank(date: Date) {
  return 1 - ((MAX_DATE - Number(date)) / MAX_DATE);
}

function tagsRank(tags: string[], searchPart: string): number {
  const isInTags = tags.includes(searchPart);
  if (isInTags) {
    return 1;
  }
  const partialMatch = tags.find(tag => tag.includes(searchPart));
  if (partialMatch) {
    return 0.5;
  }
  const partialMatchInverse = tags.find(tag => searchPart.includes(tag));
  if (partialMatchInverse) {
    return 0.4;
  }
  return 0;
}

const TOOLS_WEIGHTING = 0.6;
function GetTagsRank(result: SearchResult, searchParts: string[]): number {
  const tagMatchCount = searchParts.reduce((count, searchPart) => {
    const res = tagsRank(result.tags, searchPart);
    let tools = 0;
    if (result.type === 'project') {
      tools += tagsRank(result.project.tools, searchPart) * TOOLS_WEIGHTING;
      tools += tagsRank(result.project.tags, searchPart) * TOOLS_WEIGHTING;
    }
    return count + res + tools;
  }, 0);
  return tagMatchCount / searchParts.length;
}

function GetTitleRank(title: string, searchText: string, searchParts: string[]): number {
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
  const wordsInTitleCount = searchParts
    .reduce((prev, searchPart) => {
      const hasSearchPart = titleLower.includes(searchPart);
      return hasSearchPart ? prev + 1 : prev;
    }, 0);
  const percentOfWordsInTitle = wordsInTitleCount / titleLower.split(" ").length;
  return percentOfWordsInTitle;
}

function getSearchParts(searchTextLower: string) {
  return searchTextLower.split(" ")
    .map(searchPart => searchPart.trim())
    .filter(searchPart => !!searchPart);
}
