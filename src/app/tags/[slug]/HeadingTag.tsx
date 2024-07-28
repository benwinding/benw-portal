"use client";
import { makePathSafe } from "components/search/SearchResult";
import React from "react";

export function HeadingTag(props: { allTags: string[]; value: string }) {
  const onSelect = (newTag: string) => {
    window.location.href = `/tags/${makePathSafe(newTag)}`;
  };
  return (
    <span className="text-2xl border-4 border-red-500 text-red-500 rounded-full px-3 py-0">
      <select className=" bg-transparent " value={props.value} onChange={e => onSelect(e.target.value)}>
        {props.allTags.map((tag) => <option key={tag} value={tag}>{tag}</option>)}
      </select>
    </span>
  );
}
