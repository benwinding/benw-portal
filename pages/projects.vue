<template>
  <div>
    <rainbow-text text="Projects"></rainbow-text>
    <div class="flex flex-col md:flex-row items-start">
      <div class="md:w-64 w-full pb-2 pr-0 md:pr-2">
        <projects-filter
          :foundCount="projectsEnabled.length"
          :projectsall="projectsAll"
          v-on:filterChanged="filterChanged($event)"
        ></projects-filter>
        <projects-order
          :projectsall="projectsAll"
          v-on:orderChanged="orderChanged($event)"
        ></projects-order>
        <!--
        <projects-group
          :projectsall="projectsAll"
          v-on:groupChanged="groupChanged($event)"
        ></projects-group>
        -->
      </div>
      <div
        class="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2"
      >
        <div
          v-for="(project, index) in projectsEnabled"
          :key="index + project.name"
        >
          <card-project
            :key="index + project.name"
            :project="project"
          ></card-project>
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
  ProjectsOrder,
  ProjectsGroup,
  GetProjectsAll,
  FilterProjects
} from "~/components/projects";

export default {
  components: {
    RainbowText,
    CardProject,
    ProjectsFilter,
    ProjectsOrder,
    // ProjectsGroup
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
      projectsEnabled: GetProjectsAll(),
      projectsAll: GetProjectsAll(),
      currentFilter: {},
      currentOrder: {},
      currentGroup: {}
    };
  },
  methods: {
    filterChanged(filterObj) {
      this.currentFilter = filterObj;
      this.updateEnabled();
    },
    orderChanged(orderObj) {
      this.currentOrder = orderObj;
      this.updateEnabled();
    },
    groupChanged(groupObj) {
      this.currentGroup = groupObj;
      this.updateEnabled();
    },
    updateEnabled() {
      const { years, tags, icons } = this.currentFilter;
      const { order, isReversed } = this.currentOrder;
      const { group } = this.currentGroup;
      this.projectsEnabled = FilterProjects(
        years,
        tags,
        icons,
        order,
        isReversed,
        group
      );
    }
  }
};
</script>
