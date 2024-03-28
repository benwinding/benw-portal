import { BlogPost } from "../blog/useBlogPosts";
import { SearchResult } from "./SearchResult";
import { SearchResults } from "./SearchResults";

function aBlog(opts: Partial<SearchResult>): SearchResult {
  return {
    title: "",
    href: "",
    date: new Date(),
    tags: [],
    image: undefined,
    ...opts,
    type: "blog",
    blog: {} as BlogPost,
  };
}

describe("SearchResults", () => {
  const bobResult = aBlog({ title: "Bob Blog 1", date: new Date("11/02/1989") });
  const billResult = aBlog({ title: "Bill Blog 1", date: new Date("11/02/1998") });
  const joeResult = aBlog({ title: "Joey Blog 1", date: new Date("11/02/1998") });
  const allResults = [
    bobResult,
    billResult,
    joeResult,
  ];
  describe("filters out non bobs", () => {
    it("normal case", () => {
      const searchText = "bob";
      const results = SearchResults(allResults, { searchText });
      expect(results.length).toBe(1);
      expect(results[0].title).toBe(bobResult.title);
    });
    it("works with spaces", () => {
      const searchText = " bob  ";
      const results = SearchResults(allResults, { searchText });
      expect(results.length).toBe(1);
      expect(results[0].title).toBe(bobResult.title);
    });
    it("case shouldn't matter", () => {
      const searchText = " bob  ";
      const results = SearchResults(allResults, { searchText });
      expect(results.length).toBe(1);
      expect(results[0].title).toBe(bobResult.title);
    });
  });
});
