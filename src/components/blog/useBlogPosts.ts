"use client";
import React from "react";
import { BlogPost, fetchAllBlogPosts } from "./fetchAllBlogPosts";

export type { BlogPost };

export function useBlogPosts() {
  const [blogPosts, setBlogPosts] = React.useState<BlogPost[]>([]);
  const [loaded, setLoaded] = React.useState(false);

  React.useEffect(() => {
    let mounted = true;
    fetchAllBlogPosts().then(data => {
      if (!mounted) return;
      setBlogPosts(data);
      setLoaded(true);
    });
    return () => {
      mounted = false;
    };
  }, []);

  return { blogPosts, loaded };
}
