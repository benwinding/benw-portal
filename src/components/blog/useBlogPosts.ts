"use client";
import React from "react";

export type BlogPost = {
  title: string;
  permalink: string;
  tags: BlogTag[];
  path: string;
  photos?: string[];
  date: string;
};

type BlogTag = {
  name: string;
  slug: string;
  permalink: string;
};

const BLOG_BASE_URL = "https://blog.benwinding.com";

async function getBlogPosts() {
  const response = await fetch(`${BLOG_BASE_URL}/feed.json`);
  const data = await response.json() as BlogPost[];
  const dataWithPhotoUrls = data.map(post => ({
    ...post,
    photos: post.photos.map(photoPath => photoPath.startsWith("http") ? photoPath : `${BLOG_BASE_URL}/${photoPath}`),
  }));
  return dataWithPhotoUrls;
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
