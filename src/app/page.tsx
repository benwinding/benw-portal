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
        <h2
          className={classNames("transition-opacity italic text-gray-500", {
            "opacity-0": hasText,
            "opacity-100": !hasText,
          })}
        >
          Some recent stuff
        </h2>
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
