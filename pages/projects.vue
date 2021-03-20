<template>
  <div>
    <div class="container">
      <rainbow-text text="Projects"></rainbow-text>
      <projects-filter
        v-bind:filter_all="FILTER_ALL"
        v-bind:projects_all="projectsAll"
        v-bind:currentfilter="currentFilter"
        v-on:iconClicked="clickedIcon($event)"
      ></projects-filter>
    </div>
    <div
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2"
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
</template>

<script>
import RainbowText from "~/components/RainbowText";
import CardProject from "~/components/CardProject";
import ProjectsFilter from "~/components/ProjectsFilter";

import projectsData from "~/assets/projects.json";
import colorKeys from "~/assets/icon-color-keys.json";

const projectsAll = projectsData.all;

projectsAll.map(project => {
  const tag0 = project.icons[0];
  project.colour = colorKeys[tag0];
});

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
      FILTER_ALL: FILTER_ALL,
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.addAll();
    });
  },
  methods: {
    addAll() {
      let delayMs = 0;
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
    addProject(project, delayMs) {
      if (this.isProjectEnabled(project)) return;
      this.projectsEnabled.push(project);
    },
    removeProject(project, delayMs) {
      this.projectsEnabled = this.projectsEnabled.filter(
        item => item.name !== project.name
      );
    },
    clickedIcon(icon) {
      this.currentFilter = icon;
      if (this.currentFilter == FILTER_ALL) {
        this.addAll();
        return;
      }

      let delayMs = 0;
      for (const project of projectsAll) {
        if (!project.icons.includes(this.currentFilter)) {
          delayMs += 100;
          this.removeProject(project, delayMs);
        }
      }
      for (const project of projectsAll) {
        if (project.icons.includes(this.currentFilter)) {
          delayMs += 100;
          this.addProject(project, delayMs);
        }
      }
    }
  }
};
</script>
