"use client";
import { SearchResult } from "components/search/SearchResult";
import { useSearch } from "components/search/useSearch";
import dayjs from "dayjs";
import React from "react";
import styles from "./home2.module.css";

export default function Page() {
  const { setSearchText, results } = useSearch();

  return (
    <div className="flex flex-col gap-3 pt-2">
      <Search onSearchChange={setSearchText} />
      <Results results={results} />
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

function Results(props: { results: SearchResult[] }) {
  return (
    <div className="w-full">
      <div className="flex flex-col gap-2">
        {props.results.map(result => <ResultCard key={result.href} result={result} />)}
      </div>
    </div>
  );
}

function ResultCard(props: { result: SearchResult }) {
  return (
    <a href={props.result.href} className="flex flex-row items-center gap-2">
      {props.result.image ? <img src={props.result.image} className="w-14 h-14" /> : null}
      <div className="flex flex-col">
        <p>{props.result.title}</p>
        <div className="flex flex-row items-center gap-1">
          <span className="text-xs text-gray-500">{formatDate(props.result.date)}</span>
          <TinyResultType type={props.result.type} />
          {props.result.type === 'project' && props.result.project.wip ? <WipTag/> : null}
          {props.result.tags.map(tag => <Tag key={tag} label={tag} classNames="border-gray-500 text-gray-500" />)}
        </div>
      </div>
    </a>
  );
}

function WipTag() {
  return <Tag label="wip" classNames={styles.hazardBorder + " border-gray-900 text-gray-900"} />;
}

function TinyResultType(props: { type: SearchResult["type"] }) {
  let colorClasses;
  let label;
  switch (props.type) {
    case "project":
      colorClasses = "border-green-500 text-green-500";
      label = "Project";
      break;
    case "blog":
    default:
      colorClasses = "border-blue-500 text-blue-500";
      label = "Blog";
      break;
  }
  return <Tag label={label} classNames={colorClasses} />;
}

function Tag(props: { label: string; classNames: string }) {
  return <span className={`text-xs border-2 ${props.classNames} px-2 py-0 rounded-full`}>{props.label}</span>;
}

function formatDate(date: Date) {
  return dayjs(date).format("YYYY");
}
