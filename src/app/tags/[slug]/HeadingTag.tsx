"use client";
import { makePathSafe } from "components/search/SearchResult";
import React from "react";
import { TAGS } from "src/projects.generated";

export function HeadingTag(props: { value: string }) {
  const onSelect = (newTag: string) => {
    window.location.href = `/tags/${makePathSafe(newTag)}`;
  };
  return (
    <span className="text-2xl border-4 border-red-500 text-red-500 rounded-full px-3 py-0">
      <select className=" bg-transparent " value={props.value} onChange={e => onSelect(e.target.value)}>
        {TAGS.map((tag) => <option key={tag} value={tag}>{tag}</option>)}
      </select>
    </span>
  );
}
