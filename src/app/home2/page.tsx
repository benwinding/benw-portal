"use client";
import { SearchResult, useSearch } from "components/search/useSearch";
import dayjs from "dayjs";
import React from "react";

export default function Page() {
  const { setSearchText, results } = useSearch();

  return (
    <div className="flex flex-col">
      <Search onSearchChange={setSearchText} />
      <Results results={results} />
    </div>
  );
}

function Search(props: { onSearchChange: (searchText: string) => void }) {
  return (
    <div className="bg-orange-300 block w-full">
      <input
        onChange={e => props.onSearchChange(e.target.value)}
        type="text"
        className="w-full p-2"
        placeholder="Search for stuff here"
      >
      </input>
    </div>
  );
}

function Results(props: { results: SearchResult[] }) {
  return (
    <div className="w-full">
      <div className="flex flex-col">
        {props.results.map(result => <ResultCard key={result.href} result={result} />)}
      </div>
    </div>
  );
}

function ResultCard(props: { result: SearchResult }) {
  return (
    <a href={props.result.href} className="flex flex-col">
      <p>{props.result.title}</p>
      <span className="text-xs text-gray-500">{formatDate(props.result.date)}</span>
    </a>
  );
}

function formatDate(date: Date) {
  return dayjs(date).format("YYYY");
}
