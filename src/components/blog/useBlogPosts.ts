"use client";
import React from "react";

export type BlogPost = {
  title: string;
  permalink: string;
  tags: BlogTag[];
  path: string;
  date: string;
};

type BlogTag = {
  name: string;
  slug: string;
  permalink: string;
};

async function getBlogPosts() {
  const response = await fetch("https://blog.benwinding.com/feed.json");
  const data = await response.json() as BlogPost[];
  return data;
}

export function useBlogPosts() {
  const [blogPosts, setBlogPosts] = React.useState<BlogPost[]>([]);

  React.useEffect(() => {
    let mounted = true;
    getBlogPosts().then(data => {
      mounted && setBlogPosts(data);
    });
    return () => {
      mounted = false;
    };
  }, []);

  return blogPosts;
}
