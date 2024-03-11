"use client";
import { FilterProjects, GetProjectsAll, ProjectOrderType, ProjectsFilter, ProjectsOrder } from "components/projects";
import { AddFilterEvent, CardProject } from "components/projects/components/CardProject";
import { FilterChangedEvent } from "components/projects/ProjectsFilter";
import { OrderChangedEvent } from "components/projects/ProjectsOrder";
import { RainbowText } from "components/RainbowText";
import Head from "next/head";
import React from "react";

const projectsAll = GetProjectsAll();

const DEFAULT_ORDER: OrderChangedEvent = {
  orderBy: ProjectOrderType.YEAR,
  ascending: true,
};

const DEFAULT_FILTER: FilterChangedEvent = {
  tags: [],
  years: [],
  icons: [],
  searchText: undefined,
}

export default function Page() {
  const [filterEvent, setFilterEvent] = React.useState<FilterChangedEvent>(DEFAULT_FILTER);
  const [orderEvent, setOrderEvent] = React.useState<OrderChangedEvent>(DEFAULT_ORDER);

  const projectsEnabled = React.useMemo(() => {
    const { years, tags, icons, searchText } = filterEvent;
    const { orderBy, ascending } = orderEvent;
    const group = undefined;
    console.log({ filterEvent, orderEvent });
    const filteredProjects = FilterProjects(
      projectsAll,
      {
        years,
        tags,
        icons,
        order: orderBy,
        ascending,
        group,
        searchText,
      },
    );
    return filteredProjects;
  }, [filterEvent, orderEvent]);

  function onFilterChanged(event: FilterChangedEvent) {
    setFilterEvent(event);
  }

  function onOrderChanged(event: OrderChangedEvent): void {
    setOrderEvent(event);
  }

  function onAddFilterClick(event: AddFilterEvent): void {
    const { year, icon } = event;
    !filterEvent.icons && (filterEvent.icons = []);
    icon && filterEvent.icons.push(icon);
    !filterEvent.years && (filterEvent.years = []);
    year && filterEvent.years.push(year);
    setFilterEvent(filterEvent);
  }

  return (
    <>
      <Head>
        <title>Home</title>
        <meta property="og:image" content="/imgur/orqq5jB.jpg"></meta>
        <meta property="og:title" content="Home - Ben Winding"></meta>
        <meta property="og:description" content="A web developer from Adelaide, South Australia."></meta>
      </Head>

      <RainbowText text="Projects" />
      <div className="flex flex-col md:flex-row items-start">
        <div className="md:w-64 w-full pb-2 pr-0 md:pr-2">
          <ProjectsFilter
            foundCount={projectsEnabled.length}
            projectsAll={projectsAll}
            onFilterChanged={onFilterChanged}
          />
          <ProjectsOrder
            orderChangedEvent={onOrderChanged}
          />
          {
            /* <ProjectsGroup
          :projectsall="projectsAll"
          v-on:groupChanged="groupChanged($event)"
        /> */
          }
        </div>
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
          {projectsAll.map((project) => (
            <div
              v-for="(project, index) in projectsEnabled"
              key={project.name}
            >
              <CardProject
                project={project}
                onAddFilterClick={onAddFilterClick}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
