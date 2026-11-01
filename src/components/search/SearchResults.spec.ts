import { Project } from "components/projects";
import { BlogPost } from "../blog/useBlogPosts";
import { SearchResult, SearchTag } from "./SearchResult";
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

function aProject(opts: Partial<SearchResult> & { wip?: boolean }): SearchResult {
  const { wip, ...rest } = opts;
  return {
    title: "",
    href: "",
    date: new Date(),
    tags: [],
    image: undefined,
    ...rest,
    type: "project",
    project: { wip } as Project,
  };
}

function tags(...labels: string[]): SearchTag[] {
  return labels.map(label => ({ label, href: `/tags/${label}` }));
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
  describe("matches tags", () => {
    const taggedResult = aBlog({ title: "Some Title", tags: tags("react", "typescript") });
    it("exact tag", () => {
      const results = SearchResults([taggedResult], { searchText: "react" });
      expect(results.map(r => r.title)).toEqual([taggedResult.title]);
    });
    it("partial tag", () => {
      const results = SearchResults([taggedResult], { searchText: "type" });
      expect(results.map(r => r.title)).toEqual([taggedResult.title]);
    });
  });
  describe("matches result chips", () => {
    const blog = aBlog({ title: "A Blog" });
    const project = aProject({ title: "A Project" });
    it("blog chip", () => {
      const results = SearchResults([blog, project], { searchText: "blog" });
      expect(results.map(r => r.title)).toEqual([blog.title]);
    });
    it("project chip", () => {
      const results = SearchResults([blog, project], { searchText: "project" });
      expect(results.map(r => r.title)).toEqual([project.title]);
    });
    it("wip chip only matches wip projects", () => {
      const wipProject = aProject({ title: "Wip", wip: true });
      const doneProject = aProject({ title: "Done", wip: false });
      const results = SearchResults([blog, wipProject, doneProject], { searchText: "wip" });
      expect(results.map(r => r.title)).toEqual([wipProject.title]);
    });
  });
});
