<template>
  <div>
    <rainbow-text text="Projects"></rainbow-text>
    <div class="flex flex-col sm:flex-row items-start">
      <div class="sm:w-64 w-full pb-2 pr-0 sm:pr-2">
        <projects-filter
          v-bind:filter_all="FILTER_ALL"
          v-bind:projects_all="projectsAll"
          v-bind:currentfilter="currentFilter"
          v-on:iconClicked="clickedIcon($event)"
        ></projects-filter>
      </div>
      <div
        class="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2"
      >
        <div
          v-for="(project, index) in projectsEnabled"
          :key="index + project.name"
        >
          <card-project
            :project="project"
            :class="project.bg"
            v-on:iconClicked="clickedIcon($event)"
          ></card-project>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import RainbowText from "~/components/RainbowText";
import CardProject from "~/components/CardProject";
import ProjectsFilter from "~/components/ProjectsFilter";

import projectsData from "~/assets/projects.json";
import colorKeys from "~/assets/icon-color-keys.json";

const projectsAll = projectsData.all;

const FILTER_ALL = "filter-all";

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
      projectsEnabled: [],
      projectsAll: projectsAll,
      FILTER_ALL: FILTER_ALL
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.addAll();
    });
  },
  methods: {
    addAll() {
      projectsAll.map(project => {
        if (!this.isProjectEnabled(project)) {
          this.addProject(project);
        }
      });
    },
    isProjectEnabled(project) {
      return this.projectsEnabled.reduce((acc, enabledProject) => {
        return acc || enabledProject.name == project.name;
      }, false);
    },
    addProject(project) {
      if (this.isProjectEnabled(project)) return;
      this.projectsEnabled.push(project);
    },
    removeProject(project) {
      this.projectsEnabled = this.projectsEnabled.filter(
        item => item.name !== project.name
      );
    },
    clickedIcon(icon) {
      const isAlreadySelected = this.currentFilter === icon;
      this.currentFilter = icon;
      if (isAlreadySelected) {
        this.currentFilter = FILTER_ALL;
      }
      const isAllSelected = this.currentFilter == FILTER_ALL;
      if (isAllSelected) {
        this.addAll();
        return;
      }

      projectsAll.map(project => {
        if (!project.icons.includes(this.currentFilter)) {
          this.removeProject(project);
        } else {
          this.addProject(project);
        }
      });
    }
  }
};
</script>
