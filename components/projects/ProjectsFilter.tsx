import classNames from "classnames";
import { Icon, IconName } from "components/icons/icons";
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
    setAllYears(MakeAllYears(projectsSafe));
    setAllTags(MakeAllTags(projectsSafe));
    setAllIcons(MakeAllIcons(projectsSafe));
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
          <ProjectFiltersSelectedTags items={allTags} selected={selectedTags} clickedItem={clickedTagStr}/>
          <ProjectFiltersSelectedTags items={allYears} selected={selectedYears} clickedItem={clickedYearStr}/>
          <ProjectFiltersSelectedTags items={allIcons} selected={selectedIcons} clickedItem={clickedIconStr}/>
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
      <FilterContainer label="Type">
        <div className="flex flex-wrap">
          <ProjectsFilterTagList items={allTags} clickedItem={clickedTagStr} selected={undefined} />
        </div>
      </FilterContainer>
      <FilterContainer label="Year">
        <div className="flex flex-col">
          <ProjectsFilterItemList items={allYears} clickedItem={clickedYearStr} selected={undefined} />
        </div>
      </FilterContainer>
      <FilterContainer label="Tech">
        <div className="flex flex-col">
          <ProjectsFilterItemList items={allIcons} clickedItem={clickedIconStr} selected={undefined} />
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
  count: number | undefined,
  iconName: IconName | undefined,
}

function MakeAllYears(projectsAll: Project[]): FilterItem[] {
  const years = projectsAll.map((val) => val.year);
  const unique = Array.from(new Set(years));
  unique.sort((a, b) => b - a);
  return unique.map((u) => {
    return {
      key: str(u),
      label: str(u),
      iconName: undefined,
    } as FilterItem;
  });
}

function MakeAllTags(projectsAll: Project[]): FilterItem[] {
  const tags = projectsAll
    .map((val) => val.tags)
    .flat();
  const tagsMap: Partial<Record<IconName, number>> = tags.reduce((acc, cur) => {
    if (!Number.isFinite(acc[cur])) {
      acc[cur] = 0;
    }
    acc[cur]++;
    return acc;
  }, {});
  const tagsArr: KeyCount[] = Object.entries(tagsMap).map(([tag, count]: [IconName, number]) => {
    return { key: tag, count };
  });
  tagsArr.sort((a, b) => b.count - a.count);
  return tagsArr.map((u) => {
    return {
      key: str(u.key),
      count: u.count,
      label: str(u.key),
      iconName: undefined,
    } as FilterItem;
  });
}

function MakeAllIcons(projectsAll: Project[]): FilterItem[] {
  const icons: IconName[] = projectsAll
    .map((val) => val.icons)
    .reduce((acc, cur) => acc.concat(cur), []);
  const unique = Array.from(new Set(icons));
  unique.sort();
  return unique.map((u) => {
    return {
      key: str(u),
      label: str(u),
      iconName: u,
    } as FilterItem;
  });
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

function str(input: number | string | undefined) : string {
  return (input || '') + '';
}