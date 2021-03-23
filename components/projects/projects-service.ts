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

export function GetProjectsAll() {
  const data = require("./projects.json");
  const projectsAll = data.all as Project[];
  // projectsAll.sort((a, b) => b.year - a.year)
  return projectsAll;
}

export function FilterProjects(
  years: number[],
  tags: string[],
  icons: string[],
  order: string,
  isReversed: boolean,
  group: string
) {
  const yearsSet = new Set(years);
  const tagsSet = new Set(tags);
  const iconsSet = new Set(icons);

  const HasNoFilters = !yearsSet.size && !tagsSet.size && !iconsSet.size;
  const allProjects = GetProjectsAll();

  if (HasNoFilters) {
    OrderArr(allProjects, order, isReversed);
    return allProjects;
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
  const projectsFiltered = allProjects.filter(p => MatchItem(p));
  OrderArr(projectsFiltered, order, isReversed);
  return projectsFiltered;
}

function OrderArr(arr: any[], field: string, reverse?: boolean): void {
  function SortByField(a: any, b: any) {
    const aVal = (a[field] + "").toLowerCase();
    const bVal = (b[field] + "").toLowerCase();
    return aVal > bVal ? (reverse ? 1 : -1) : reverse ? -1 : 1;
  }
  arr.sort(SortByField);
}
