"use client";
import { BlogPost } from "components/blog/useBlogPosts";
import { Project } from "components/projects";

export type SearchResult =
  & {
    title: string;
    date: Date;
    href: string;
    tags: string[];
  }
  & ({
    type: "project";
    project: Project;
  } | {
    type: "blog";
    blog: BlogPost;
  });