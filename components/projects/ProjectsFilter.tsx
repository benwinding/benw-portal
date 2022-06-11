import classNames from "classnames";
import { Icon, IconName } from "components/icons/icons";
import { OrderArr } from "components/utils/OrderArr";
import React from "react";
import { FilterContainer } from "./components/FilterContainer";
import { ProjectsFilterItem } from "./components/ProjectsFilterItem";
import { ProjectsFilterTag } from "./components/ProjectsFilterTag";
import { Project } from "./projects-service";

export type FilterChangedEvent = {
  years?: number[],
  tags?: string[],
  icons?: string[],
  searchText?: string,
}

export function ProjectsFilter(props: {
  projectsAll: Project[],
  foundCount: number,
  onFilterChanged: (event: FilterChangedEvent) => void
}) {
  const [allYears, setAllYears] = React.useState<FilterItem[]>([]);
  const [allTags, setAllTags] = React.useState<FilterItem[]>([]);
  const [allIcons, setAllIcons] = React.useState<FilterItem[]>([]);

  React.useEffect(() => {
    const projectsSafe = props.projectsAll || []
    const res = MakeAll(projectsSafe);
    setAllYears(res.years);
    setAllTags(res.tags);
    setAllIcons(res.icons);
  }, [props.projectsAll]);

  const [selectedYears, setSelectedYears] = React.useState<string[]>([]);
  const [selectedTags, setSelectedTags] = React.useState<string[]>([]);
  const [selectedIcons, setSelectedIcons] = React.useState<string[]>([]);
  const [searchText, setSearchText] = React.useState<string>('');

  const hasAnyEnabled = selectedYears?.length || selectedTags?.length || selectedIcons?.length;

  const toggleIcon = (key: string) => {
    toggleInArray(selectedIcons, key);
    setSelectedIcons([...selectedIcons]);
  }
  const toggleYear = (key: string) => {
    toggleInArray(selectedYears, key);
    setSelectedYears([...selectedYears]);
  }
  const toggleTag = (key: string) => {
    toggleInArray(selectedTags, key);
    setSelectedTags([...selectedTags]);
  }

  const clickedClearSearch = () => setSearchText('');
  const clickedIconStr = (icon: string) => toggleIcon(icon);
  const clickedYearStr = (year: string) => toggleYear(year);
  const clickedTagStr = (tag: string) => toggleTag(tag);

  const clickedClearAll = () => {
    setSelectedIcons([]);
    setSelectedYears([]);
    setSelectedTags([]);
  }

  React.useEffect(() => {
    props.onFilterChanged({
      years: selectedYears.map(y => parseInt(y)),
      icons: selectedIcons,
      tags: selectedTags,
      searchText,
    });
  }, [selectedIcons, selectedTags, selectedYears, searchText])

  return <div className="border-2 rounded-md">
    <div className="m-1">
      <p className="text-gray-700 -mt-1">Filter Projects:</p>
      <SearchField
        searchText={searchText}
        clickedClearSearch={clickedClearSearch}
        onTextChanged={text => setSearchText(text)}
      />
      <div>
        <div className="flex flex-wrap items-center">
          <span className="text-xs mb-1">Filters: </span>
          <ProjectFiltersSelectedTags items={allTags} selected={selectedTags} clickedItem={clickedTagStr} />
          <ProjectFiltersSelectedTags items={allYears} selected={selectedYears} clickedItem={clickedYearStr} />
          <ProjectFiltersSelectedTags items={allIcons} selected={selectedIcons} clickedItem={clickedIconStr} />
          {hasAnyEnabled && <ProjectsFilterTag
            iconLabel="clear all"
            color="orange"
            enabled={true}
            clickedItem={clickedClearAll}
          />}
          <span className="mb-1 ml-1" v-if="!hasAnyEnabled">-</span>
        </div>
        <div className="text-xs">Found: {props.foundCount} projects</div>
      </div>
    </div>
    <div>
      <FilterContainer label="Tags">
        <div className="flex flex-wrap">
          <ProjectsFilterTagList items={allTags} clickedItem={clickedTagStr} selected={selectedTags} />
        </div>
      </FilterContainer>
      <FilterContainer label="Year">
        <div className="flex flex-col">
          <ProjectsFilterItemList items={allYears} clickedItem={clickedYearStr} selected={selectedYears} />
        </div>
      </FilterContainer>
      <FilterContainer label="Tech">
        <div className="flex flex-col">
          <ProjectsFilterItemList items={allIcons} clickedItem={clickedIconStr} selected={selectedIcons} />
        </div>
      </FilterContainer>
    </div>
  </div>
}

function ProjectsFilterItemList(props: { items: FilterItem[], selected: string[], clickedItem: (key: string) => void }) {
  return <>{props.items?.map(item => <ProjectsFilterItem
    key={item.label}
    iconName={item.iconName}
    iconLabel={item.label}
    enabled={props.selected?.includes(item.key)}
    clickedItem={() => props.clickedItem(item.key)}
  />)}
  </>;
}

function ProjectsFilterTagList(props: { items: FilterItem[], selected: string[], clickedItem: (key: string) => void }) {
  return <>{props.items?.map(item => <ProjectsFilterTag
    key={item.label}
    iconLabel={item.label}
    enabled={props.selected?.includes(item.key)}
    clickedItem={() => props.clickedItem(item.key)}
    count={str(item.count)}
    color={""}
  />)}
  </>;
}

function ProjectFiltersSelectedTags(props: { items: FilterItem[], selected: string[], clickedItem: (key: string) => void }) {
  return <>{props.items?.map(item => props.selected?.includes(item.key) && <ProjectsFilterTag
    key={item.label}
    iconLabel={item.label}
    enabled={true}
    clickedItem={() => props.clickedItem(item.key)}
    count={str(item.count)}
    color={""}
  />)}
  </>;
}

function SearchField(props: { searchText: string, onTextChanged: (text: string) => void, clickedClearSearch: () => void }) {
  const hasText = !!props.searchText;
  return <div className="mx-0 relative">
    <input
      value={props.searchText}
      onChange={e => props.onTextChanged(e.currentTarget.value)}
      className={classNames(hasText ? 'pr-10' : 'pr-0', "text-xl pl-10 py-1 mb-1 rounded w-full border-2 transition-all")}
      type="text"
      placeholder="Filter projects"
    />
    <Icon
      width={24}
      className="absolute left-0 top-0 mt-2 ml-2 text-gray-400"
      iconName="search"
    />
    <Icon
      width={20}
      onClick={props.clickedClearSearch}
      className={classNames(hasText ? 'text-gray-900 cursor-pointer' : 'text-transparent', "absolute right-0 top-0 mt-3 mr-2 transition-all duration-500")}
      iconName="closex"
    />
  </div>;
}


type FilterItem = {
  key: string,
  label: string,
  count?: number,
  iconName?: IconName,
}

function MakeAll(projectsAll: Project[]) {
  const yearsUnique = new Set<string>();
  const tagsUniqueCount: Record<string, number> = {};
  const iconsUnique = new Set<IconName>();
  projectsAll.map((project) => {
    yearsUnique.add(str(project.year));
    project.tags?.map(tag => {
      if (!tagsUniqueCount[tag]) tagsUniqueCount[tag] = 0;
      tagsUniqueCount[tag]++;
    })
    project.icons?.map(icon => iconsUnique.add(icon))
  });
  const yearsStrings = Array.from(yearsUnique).sort();
  const iconsString = Array.from(iconsUnique).sort();
  const tagCounts = Object.entries(tagsUniqueCount).map(([key, count]) => {
    return {key, count} as KeyCount;
  });
  OrderArr(tagCounts, 'count', false);
  // Years
  function YearToFilter(year: string): FilterItem {
    return {
      key: str(year),
      label: str(year),
    }
  }
  const years = yearsStrings.map(YearToFilter)
  // Tags
  function TagToFilter(tag: KeyCount): FilterItem {
    return {
      key: str(tag.key),
      label: str(tag.key),
      count: tag.count,
    }
  }
  const tags = tagCounts.map(TagToFilter)
  // Icons
  function IconToFilter(iconName: IconName): FilterItem {
    return {
      key: str(iconName),
      label: str(iconName),
      iconName,
    }
  }
  const icons = iconsString.map(IconToFilter)

  return {
    years,
    tags,
    icons,
  };
}

type KeyCount = {
  key: IconName,
  count: number,
}

function toggleInArray<T>(set: T[], value: T) {
  if (set.includes(value)) {
    set.splice(set.findIndex(v => v === value), 1);
  } else {
    set.push(value);
  }
}

function str(input: number | string | undefined): string {
  return (input || '') + '';
}