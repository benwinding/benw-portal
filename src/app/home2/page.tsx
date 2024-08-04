"use client";
import classNames from "classnames";
import { ResultsList } from "components/search/ResultsList";
import { useSearch } from "components/search/useSearch";
import React from "react";

export default function Page() {
  const { setSearchText, results, blogsLoaded } = useSearch();

  return (
    <div className="flex flex-col gap-3 pt-2">
      <Search onSearchChange={setSearchText} />
      <div
        className={classNames("transition-opacity", {
          "opacity-0": !blogsLoaded,
          "opacity-100": blogsLoaded,
        })}
      >
        <ResultsList results={results} />
      </div>
    </div>
  );
}

function Search(props: { onSearchChange: (searchText: string) => void }) {
  return (
    <div className="block w-full">
      <input
        onChange={e => props.onSearchChange(e.target.value)}
        type="text"
        className="w-full p-2 border-2 rounded-lg border-gray-500"
        placeholder="Search for stuff here"
      >
      </input>
    </div>
  );
}
