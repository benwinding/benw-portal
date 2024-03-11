import classNames from "classnames";
import { Icon, IconName } from "components/icons/icons";
import { orderBy } from "lodash";
import React from "react";
import { FilterContainer } from "./components/FilterContainer";
import { ProjectsFilterItem } from "./components/ProjectsFilterItem";
import { ProjectsFilterTag } from "./components/ProjectsFilterTag";
import { Project } from "./projects-service";

export type ProjectFilterValue = {
  years?: number[];
  tags?: string[];
  icons?: string[];
  searchText?: string;
};

export function ProjectsFilter(props: {
  projectsAll: Project[];
  foundCount: number;
  value: ProjectFilterValue,
  onFilterChanged: (value: ProjectFilterValue) => void;
}) {
  const {
    years: allYears,
    tags: allTags,
    icons: allIcons,
  } = React.useMemo(() => {
    const projectsSafe = props.projectsAll || [];
    return MakeAll(projectsSafe);
  }, [props.projectsAll]);

  const {
    years: selectedYears,
    tags: selectedTags,
    icons: selectedIcons,
    searchText,
  } = props.value;

  const hasAnyEnabled = selectedYears?.length || selectedTags?.length || selectedIcons?.length;

  const onTextChanged = (text: string) => props.onFilterChanged({
    searchText: text,
  });
  const clickedClearSearch = () => props.onFilterChanged({
    searchText: '',
  });
  const clickedIconStr = (icon: string) => props.onFilterChanged({ 
    icons: toggleInArray(selectedIcons, icon)
  });
  const clickedYearStr = (year: string) => props.onFilterChanged({ 
    years: toggleInArray(selectedYears, parseInt(year))
  });
  const clickedTagStr = (tag: string) => props.onFilterChanged({ 
    tags: toggleInArray(selectedTags, tag)
  });

  const selectedYearsStr = selectedYears.map(y => y+'');

  const clickedClearAll = () => {
    props.onFilterChanged({
      years: [],
      tags: [],
      icons: [],
    })
  };

  return (
    <div className="border-2 rounded-md">
      <div className="m-1">
        <p className="text-gray-700 -mt-1">Filter Projects:</p>
        <SearchField
          searchText={searchText}
          clickedClearSearch={clickedClearSearch}
          onTextChanged={onTextChanged}
        />
        <div>
          <div className="flex flex-wrap items-center">
            <span className="text-xs mb-1">Filters:</span>
            <ProjectFiltersSelectedTags items={allTags} selected={selectedTags} clickedItem={clickedTagStr} />
            <ProjectFiltersSelectedTags items={allYears} selected={selectedYearsStr} clickedItem={clickedYearStr} />
            <ProjectFiltersSelectedTags items={allIcons} selected={selectedIcons} clickedItem={clickedIconStr} />
            {hasAnyEnabled && (
              <ProjectsFilterTag
                iconLabel="clear all"
                color="orange"
                enabled={true}
                clickedItem={clickedClearAll}
              />
            )}
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
            <ProjectsFilterItemList items={allYears} clickedItem={clickedYearStr} selected={selectedYearsStr} />
          </div>
        </FilterContainer>
        <FilterContainer label="Tech">
          <div className="flex flex-col">
            <ProjectsFilterItemList items={allIcons} clickedItem={clickedIconStr} selected={selectedIcons} />
          </div>
        </FilterContainer>
      </div>
    </div>
  );
}

function ProjectsFilterItemList(
  props: { items: FilterItem[]; selected: string[]; clickedItem: (key: string) => void },
) {
  return (
    <>
      {props.items?.map(item => (
        <ProjectsFilterItem
          key={item.label}
          iconName={item.iconName}
          iconLabel={item.label}
          enabled={props.selected?.includes(item.key)}
          clickedItem={() => props.clickedItem(item.key)}
        />
      ))}
    </>
  );
}

function ProjectsFilterTagList(props: { items: FilterItem[]; selected: string[]; clickedItem: (key: string) => void }) {
  return (
    <>
      {props.items?.map(item => (
        <ProjectsFilterTag
          key={item.label}
          iconLabel={item.label}
          enabled={props.selected?.includes(item.key)}
          clickedItem={() => props.clickedItem(item.key)}
          count={str(item.count)}
          color={""}
        />
      ))}
    </>
  );
}

function ProjectFiltersSelectedTags(
  props: { items: FilterItem[]; selected: string[]; clickedItem: (key: string) => void },
) {
  return (
    <>
      {props.items?.map(item =>
        props.selected?.includes(item.key) && (
          <ProjectsFilterTag
            key={item.label}
            iconLabel={item.label}
            enabled={true}
            clickedItem={() => props.clickedItem(item.key)}
            count={str(item.count)}
            color={""}
          />
        )
      )}
    </>
  );
}

function SearchField(
  props: { searchText: string; onTextChanged: (text: string) => void; clickedClearSearch: () => void },
) {
  const hasText = !!props.searchText;
  return (
    <div className="mx-0 relative">
      <input
        value={props.searchText}
        onChange={e => props.onTextChanged(e.currentTarget.value)}
        className={classNames(
          hasText ? "pr-10" : "pr-0",
          "text-xl pl-10 py-1 mb-1 rounded w-full border-2 transition-all",
        )}
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
        className={classNames(
          hasText ? "text-gray-900 cursor-pointer" : "text-transparent",
          "absolute right-0 top-0 mt-3 mr-2 transition-all duration-500",
        )}
        iconName="closex"
      />
    </div>
  );
}

type FilterItem = {
  key: string;
  label: string;
  count?: number;
  iconName?: IconName;
};

function MakeAll(projectsAll: Project[]) {
  const yearsUnique = new Set<string>();
  const tagsUniqueCount: Record<string, number> = {};
  const iconsUnique = new Set<IconName>();
  projectsAll.map((project) => {
    yearsUnique.add(str(project.year));
    project.tags?.map(tag => {
      if (!tagsUniqueCount[tag]) tagsUniqueCount[tag] = 0;
      tagsUniqueCount[tag]++;
    });
    project.icons?.map(icon => iconsUnique.add(icon));
  });
  const yearsStrings = Array.from(yearsUnique).sort();
  const iconsString = Array.from(iconsUnique).sort();
  const tagCounts = Object.entries(tagsUniqueCount).map(([key, count]) => {
    return { key, count } as KeyCount;
  });
  // Years
  function YearToFilter(year: string): FilterItem {
    return {
      key: str(year),
      label: str(year),
    };
  }
  const years = yearsStrings.map(YearToFilter);
  // Tags
  function TagToFilter(tag: KeyCount): FilterItem {
    return {
      key: str(tag.key),
      label: str(tag.key),
      count: tag.count,
    };
  }
  const tagCountsSorted = orderBy(tagCounts, "count", 'asc');
  const tags = tagCountsSorted.map(TagToFilter);
  // Icons
  function IconToFilter(iconName: IconName): FilterItem {
    return {
      key: str(iconName),
      label: str(iconName),
      iconName,
    };
  }
  const icons = iconsString.map(IconToFilter);

  return {
    years,
    tags,
    icons,
  };
}

type KeyCount = {
  key: IconName;
  count: number;
};

function toggleInArray<T>(arr: T[], value: T) {
  const arrCopy = [...arr];
  if (arrCopy.includes(value)) {
    arrCopy.splice(arrCopy.findIndex(v => v === value), 1);
  } else {
    arrCopy.push(value);
  }
  return arrCopy;
}

function str(input: number | string | undefined): string {
  return (input || "") + "";
}
