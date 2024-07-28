"use client";
import React from "react";
import { BlogPost, fetchAllBlogPosts } from "./fetchAllBlogPosts";

export type { BlogPost };

export function useBlogPosts() {
  const [blogPosts, setBlogPosts] = React.useState<BlogPost[]>([]);

  React.useEffect(() => {
    let mounted = true;
    fetchAllBlogPosts().then(data => {
      mounted && setBlogPosts(data);
    });
    return () => {
      mounted = false;
    };
  }, []);

  return blogPosts;
}
