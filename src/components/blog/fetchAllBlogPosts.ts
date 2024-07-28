export type BlogPost = {
  title: string;
  permalink: string;
  tags: BlogTag[];
  path: string;
  thumbnail?: string;
  date: string;
};

type BlogTag = {
  name: string;
  slug: string;
  permalink: string;
};

export const BLOG_BASE_URL = "https://blog.benwinding.com";

export async function fetchAllBlogPosts() {
  const response = await fetch(`${BLOG_BASE_URL}/feed.json`);
  const data = await response.json() as BlogPost[];
  const dataWithPhotoUrls = data.map(post => ({
    ...post,
    thumbnail: post.thumbnail?.startsWith("http") ? post.thumbnail : `${BLOG_BASE_URL}/${post.thumbnail}`,
  }));
  return dataWithPhotoUrls;
}
