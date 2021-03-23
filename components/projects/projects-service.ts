import * as data from "./projects.json";

interface Project {
  name: string;
  description: string;
  year: number;
  tags?: string[];
  code_link?: string;
  deploy_link?: string;
  article_link?: string;
  presentation_link?: string;
  tools?: string[];
  icons?: string[];
}

const projectsAll = data.all as Project[];
projectsAll.sort((a, b) => b.year - a.year);

export function GetProjectsAll() {
  return projectsAll;
}

export function FilterProjects(
  years: number[],
  tags: string[],
  icons: string[]
) {
  const yearsSet = new Set(years);
  const tagsSet = new Set(tags);
  const iconsSet = new Set(icons);

  const HasNoFilters = !yearsSet.size && !tagsSet.size && !iconsSet.size;
  if (HasNoFilters) {
    return projectsAll;
  }

  function MatchItem(p: Project): boolean {
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
  const projectsFiltered = projectsAll.filter(p => MatchItem(p));
  return projectsFiltered;
}
