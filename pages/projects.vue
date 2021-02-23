<template>
  <div>
    <div class="container">
      <rainbow-text text="Projects"></rainbow-text>
      <p class="text-xs text-gray-700">Filter Projects:</p>
      <div class="flex flex-wrap mb-2">
        <label>
          <IconSelectAll
            :class="currentFilter === FILTER_ALL ? 'bg-blue-400' : ''"
            class="hover:shadow-xl p-1 hover:bg-gray-700"
            style="fill: black;"
            height="40"
            width="40"
            v-on:click="clickedIcon('filter-all')"
          />
        </label>
        <label
          :class="currentFilter === iconName ? 'bg-blue-400' : ''"
          class="hover:shadow-xl hover:bg-gray-700"
          v-for="iconName in iconsAll"
          :key="iconName"
        >
          <Icon
            class="p-1"
            v-bind:iconName="iconName"
            v-on:click="clickedIcon(iconName)"
          />
        </label>
      </div>
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

import projectsData from "~/assets/projects.json";
import colorKeys from "~/assets/icon-color-keys.json";

import Icon from "~/components/Icon";
import IconSelectAll from "~/assets/icons/material/check-box-multiple-outline.svg";

const projectsAll = projectsData.all;

const icons = projectsAll
  .map(val => val.icons)
  .reduce((acc, cur) => acc.concat(cur));
const iconsUnique = Array.from(new Set(icons));

for (let project of projectsAll) {
  const tag0 = project.icons[0];
  project.colour = colorKeys[tag0];
}

const FILTER_ALL = "filter-all";

export default {
  components: {
    "rainbow-text": RainbowText,
    "card-project": CardProject,
    Icon: Icon,
    IconSelectAll: IconSelectAll
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
      FILTER_ALL: FILTER_ALL
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.addAll();
    });
  },
  computed: {
    iconsAll: function() {
      return iconsUnique;
    }
  },
  methods: {
    addAll() {
      let delayMs = 0;
      for (const project of projectsAll) {
        if (!this.isProjectEnabled(project)) {
          this.addProject(project);
        }
      }
    },
    isProjectEnabled(project) {
      for (const enabledProject of this.projectsEnabled) {
        if (enabledProject.name == project.name) return true;
      }
      return false;
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
