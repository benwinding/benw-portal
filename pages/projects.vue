<template>
  <div>
    <rainbow-text text="Projects"></rainbow-text>
    <div class="flex flex-col sm:flex-row items-start">
      <div class="sm:w-64 w-full pb-2 pr-0 sm:pr-2">
        <projects-filter
          v-bind:projectsall="projectsAll"
          v-on:filterChanged="filterChanged($event)"
        ></projects-filter>
      </div>
      <div
        class="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2"
      >
        <div
          v-for="(project, index) in projectsEnabled"
          :key="index + project.name"
        >
          <card-project :project="project" :class="project.bg"></card-project>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import RainbowText from "~/components/RainbowText";
import {
  CardProject,
  ProjectsFilter,
  GetProjectsAll,
  FilterProjects,
  FILTER_ALL
} from "~/components/projects";

const projectsAll = GetProjectsAll();

export default {
  components: {
    RainbowText,
    CardProject,
    ProjectsFilter
  },
  head: {
    meta: [
      { property: "og:image", content: "https://i.imgur.com/orqq5jB.jpg" },
      { property: "og:title", content: "Projects - Ben Winding" },
      {
        property: "og:description",
        content: "A web developer from Adelaide, South Australia."
      }
    ],
    title: "Projects"
  },
  data() {
    return {
      currentFilter: FILTER_ALL,
      projectsEnabled: projectsAll,
      projectsAll: projectsAll,
      FILTER_ALL: FILTER_ALL
    };
  },
  methods: {
    filterChanged(filterObj) {
      const { years, tags, icons } = filterObj;
      this.projectsEnabled = FilterProjects(years, tags, icons)
    }
  }
};
</script>
