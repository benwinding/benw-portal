import { IconName } from "components/icons/icons";
import { orderBy } from "lodash";
import projects from "./projects.json";

export interface Project {
  name: string;
  slug: string;
  description: string;
  year: number;
  wip?: boolean;
  tags?: string[];
  code_link?: string;
  deploy_link?: string;
  article_link?: string;
  presentation_link?: string;
  tools?: string[];
  icons?: IconName[];
  open_same_page?: boolean;
}

export enum ProjectOrderType {
  NAME = "name",
  YEAR = "year",
}

export function GetProjectsAll() {
  const projectsAll = projects.all as Project[];
  const projectsOrdered = orderBy(projectsAll, ["year", "name"], ["desc", "asc"]);
  return projectsOrdered;
}

type FilterObj = {
  years: number[] | undefined;
  tags: string[] | undefined;
  icons: string[] | undefined;
  order: ProjectOrderType;
  ascending: boolean | undefined;
  group: string | undefined;
  searchText: string | undefined;
};

export function FilterProjects(_allProjects: Project[], args: FilterObj): Project[] {
  const allProjects = [..._allProjects];
  const {
    years,
    tags,
    icons,
    order,
    ascending,
    searchText,
  } = args;
  const yearsSet = new Set(years);
  const tagsSet = new Set(tags);
  const iconsSet = new Set(icons);

  const HasNoFilters = !yearsSet.size && !tagsSet.size && !iconsSet.size && !searchText;
  const orderDir = ascending ? "asc" : "desc";
  if (HasNoFilters) {
    return orderBy(allProjects, [order], [orderDir]);
  }

  function MatchItem(p: Project): boolean {
    if (
      searchText && TextMatches(
        searchText,
        p.tags,
        p.year,
        p.name + " " + p.description,
      )
    ) {
      return true;
    }
    if (yearsSet.has(p.year)) {
      return true;
    }
    if (Array.isArray(p.icons) && p.icons.some(icon => iconsSet.has(icon))) {
      return true;
    }
    if (Array.isArray(p.tags) && p.tags.some(tag => tagsSet.has(tag))) {
      return true;
    }
    return false;
  }
  const projectsFiltered = allProjects.filter(p => MatchItem(p));
  return orderBy(projectsFiltered, [order], [orderDir]);
}

function TextMatches(
  input: string,
  tags: string[] | undefined,
  year: number,
  title: string,
): boolean {
  if (!input) {
    return true;
  }
  const str1 = `${(tags || []).join(" ")} | ${year} | ${title}`;
  if (IsInputIncluded(input, str1)) {
    return true;
  }
  return false;
}

function IsInputIncluded(input: string, b: string): boolean {
  const inputSafe = (input || "").toString().toLowerCase();
  const bSafe = (b || "").toString().toLowerCase();
  return bSafe.includes(inputSafe);
}
