"use client"
import React from "react";

export type BlogPost = {
  title: string;
  link: string;
  path: string;
  date: string;
};

async function getBlogPosts() {
  const response = await fetch("https://blog.benwinding.com/feed.json")
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