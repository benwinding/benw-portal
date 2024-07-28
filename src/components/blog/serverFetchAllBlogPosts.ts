import { getCachedData, setCachedData } from "./cache";
import { BlogPost, fetchAllBlogPosts } from "./fetchAllBlogPosts";

const CACHE_KEY = "blogPosts";
export async function cachedFetchAllBlogPosts(): Promise<BlogPost[]> {
  const cachedData = getCachedData(CACHE_KEY);
  if (cachedData) {
    return cachedData;
  }
  const blogPosts = await fetchAllBlogPosts();
  setCachedData(CACHE_KEY, blogPosts);
  return blogPosts;
}
