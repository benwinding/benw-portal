import axios from "axios";

export type BlogPost = {
  title: string;
  link: string;
  path: string;
  date: string;
};

export async function getBlogPosts() {
  const response = await axios
    .get("https://blog.benwinding.com/feed.json", {
      responseType: "json",
    });
  return response.data as BlogPost[];
}
