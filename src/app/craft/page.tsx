"use client";
import { GetProjectsAll, Project } from "components/projects";
import { RainbowText } from "components/RainbowText";
import { project2Result, SearchResult } from "components/search/SearchResult";
import dayjs from "dayjs";
import Link from "next/link";
import React from "react";

export default function Page() {
  return (
    <div className="flex flex-col gap-6 pt-2">
      <RainbowText text="BenWinding" />
      <Blurb />
      <CraftProjects />
    </div>
  );
}

function Blurb() {
  return <div>
    <h1 className="text-3xl pb-4">Craft projects</h1>
    <p>I've always enjoyed the satisfaction of building things and watching them come to life. I prefer working with wood, but have ventured into welding too. Here's a gallery of some projects throughout the years</p>
  </div>
}

function CraftProjects() {
  // TODO (add list only projects tagged with craft)
  // Each item in list should link to the main page

  const craftProjects = GetProjectsAll().filter(({tags}) => tags.includes('craft'))
  return <div className="flex flex-col gap-3">
    {craftProjects.map(project => <CraftProjectItem key={project.name} project={project} />)}
  </div>
}

function CraftProjectItem(props: { project: Project }) { 
  const {tags, href, date} = project2Result(props.project);
  return <div className="flex flex-row items-center gap-2">
      {props.project.thumbnail
        ? (
          <MultiLink href={props.project.slug} className="shrink-0">
            <div
              className="w-14 h-14 bg-cover"
              style={{
                backgroundImage: `url(${props.project.thumbnail})`,
              }}
            >
            </div>
          </MultiLink>
        )
        : null}
      <div className="flex flex-col">
        <MultiLink href={href}>
          <span>{props.project.name}</span>
        </MultiLink>
        <div className="flex flex-row flex-wrap items-center gap-1">
          <span className="text-xs text-gray-500">{formatDate(date)}</span>
          <ResultTagList tags={tags} />
        </div>
      </div>
    </div>
}

function ResultTagList(props: { tags: SearchResult['tags'] } ) {
  return (
    <>
      {props.tags.map(tag => (
        <Tag
          key={tag.href}
          href={tag.href}
          label={tag.label}
          classNames={"border-gray-500 text-gray-500"}
        />
      ))}
    </>
  );
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
