"use client";
import dayjs from "dayjs";
import styles from "./ResultsList.module.css";
import { SearchResult } from "./SearchResult";

export function ResultsList(props: { results: SearchResult[] }) {
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
          {props.result.type === "project" && props.result.project.wip ? <WipTag /> : null}
          {props.result.tags.map(tag => (
            <Tag key={tag.href} href={tag.href} label={tag.label} classNames="border-gray-500 text-gray-500" />
          ))}
        </div>
      </div>
    </a>
  );
}

function WipTag() {
  return <Tag href="" label="wip" classNames={styles.hazardBorder + " border-gray-900 text-gray-900"} />;
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
  return <Tag label={label} href="" classNames={colorClasses} />;
}

function Tag(props: { href: string; label: string; classNames: string }) {
  return <div className={`text-xs border-2 ${props.classNames} px-2 py-0 rounded-full`}>{props.label}</div>;
}

function formatDate(date: Date) {
  return dayjs(date).format("YYYY");
}
