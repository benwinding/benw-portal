"use client";
import classNames from "classnames";
import { RainbowText } from "components/RainbowText";
import { ResultsList } from "components/search/ResultsList";
import { useSearch } from "components/search/useSearch";
import React from "react";

export default function Page() {
  const [hasText, setHasText] = React.useState(false);
  const { setSearchText, results, blogsLoaded } = useSearch();

  const onSearchChange = React.useCallback((searchText: string) => {
    setHasText(!!searchText.trim());
    setSearchText(searchText);
  }, []);

  return (
    <div className="flex flex-col gap-3 pt-2">
      <RainbowText text="BenWinding" />
      <Search
        placeholder="Search instantaneously..."
        onSearchChange={onSearchChange}
      />
      <div
        className={classNames("transition-opacity", {
          "opacity-0": !blogsLoaded,
          "opacity-100": blogsLoaded,
        })}
      >
        <h2 className="italic text-gray-500 flex">
          <span className="pr-1">List of</span>
          <span className="flex flex-col relative">
            <span
              className="absolute h-6 w-40 transition-all duration-1000"
              style={{
                bottom: hasText ? "1.5rem" : 0,
                opacity: hasText ? 0 : 1,
              }}
            >
              recent stuff
            </span>
            <span
              className="absolute h-6 w-40 transition-all duration-1000"
              style={{
                bottom: hasText ? "0" : "-1.5rem",
                opacity: hasText ? 1 : 0,
              }}
            >
              {results.length + " matches"}
            </span>
          </span>
        </h2>
        {results.length < 1
          ? (
            <h2 className="text-xl mt-10 text-gray-600">
              Nothing... yet
            </h2>
          )
          : null}

        <ResultsList results={results} />
      </div>
    </div>
  );
}

function Search(props: {
  placeholder: string;
  onSearchChange: (searchText: string) => void;
}) {
  return (
    <div className="block w-full">
      <input
        onChange={e => props.onSearchChange(e.target.value)}
        type="text"
        className="w-full p-2 border-2 rounded-lg border-gray-500"
        placeholder={props.placeholder}
      >
      </input>
    </div>
  );
}
