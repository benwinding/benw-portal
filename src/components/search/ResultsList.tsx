"use client";
import dayjs from "dayjs";
import Link from "next/link";
import styles from "./ResultsList.module.css";
import { SearchResult } from "./SearchResult";

export function ResultsList(props: { results: SearchResult[]; selectedTagLabel?: string }) {
  return (
    <div className="w-full">
      <div className="flex flex-col gap-2">
        {props.results.map(result => (
          <ResultCard key={result.href} result={result} selectedTagLabel={props.selectedTagLabel} />
        ))}
      </div>
    </div>
  );
}

function ResultCard(props: { result: SearchResult; selectedTagLabel?: string }) {
  return (
    <div className="flex flex-row items-center gap-2">
      {props.result.image
        ? (
          <MultiLink href={props.result.href} className="shrink-0">
            <div
              className="w-14 h-14 bg-cover"
              style={{
                backgroundImage: `url(${props.result.image})`,
              }}
            >
            </div>
          </MultiLink>
        )
        : null}
      <div className="flex flex-col">
        <MultiLink href={props.result.href}>{props.result.title}</MultiLink>
        <div className="flex flex-row flex-wrap items-center gap-1">
          <span className="text-xs text-gray-500">{formatDate(props.result.date)}</span>
          <ResultTagList result={props.result} selectedTagLabel={props.selectedTagLabel} />
        </div>
      </div>
    </div>
  );
}

function ResultTagList(props: { result: SearchResult; selectedTagLabel?: string }) {
  return (
    <>
      <TinyResultType type={props.result.type} isSelected={props.selectedTagLabel === props.result.type} />
      {props.result.type === "project" && props.result.project.wip ? <WipTag /> : null}
      {props.result.tags.map(tag => (
        <Tag
          key={tag.href}
          href={tag.href}
          label={tag.label}
          classNames={props.selectedTagLabel === tag.label
            ? "border-red-500 text-red-500"
            : "border-gray-500 text-gray-500"}
        />
      ))}
    </>
  );
}

function WipTag() {
  return <Tag href="" label="wip" classNames={styles.hazardBorder + " border-gray-900 text-gray-900"} />;
}

function TinyResultType(props: { type: SearchResult["type"]; isSelected: boolean }) {
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
  if (props.isSelected) {
    colorClasses = "border-red-500 text-red-500";
  }
  return <Tag label={label} href={`/tags/${props.type}`} classNames={colorClasses} />;
}

function Tag(props: { href: string; label: string; classNames: string }) {
  return (
    <MultiLink href={props.href} className={`text-xs border-2 ${props.classNames} px-2 py-0 rounded-full`}>
      {props.label}
    </MultiLink>
  );
}

function MultiLink(props: { href: string; className?: string; children: React.ReactNode | React.ReactNode[] }) {
  if (props.href.startsWith("http")) {
    return <a {...props} />;
  }
  return <Link {...props} />;
}

function formatDate(date: Date) {
  return dayjs(date).format("YYYY");
}
