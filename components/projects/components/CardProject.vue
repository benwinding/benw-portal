<template>
  <div
    class="p-3 h-full flex items-center flex-col border-2 w-full rounded-md text-center hover:border-red-700 hover:bg-gray-700 hover:text-white"
  >
    <p class="text-xl font-bold">{{ project.name }}</p>
    <div class="flex">
      <span
        v-for="(iconName, index) in project.icons"
        :key="index"
        v-on:click.stop.prevent="() => clickedIcon(iconName)"
      >
        <Icon class="mx-1" v-bind:iconName="iconName" />
      </span>
    </div>
    <div class="mt-2 text-black flex justify-around">
      <span
        class="px-2 rounded-xl bg-gray-400"
        v-on:click.stop.prevent="() => clickedIcon()"
      >
        {{ project.year }}
      </span>
    </div>
    <p class="mb-2">{{ project.tools.join(", ") }}</p>
    <div class="underline flex flex-col items-center">
      <ProjectLink
        :href="project.deploy_link"
        label="Live Site"
        icon="live"
        iconColor="blue"
      />
      <ProjectLink
        :href="project.code_link"
        label="View Code"
        icon="github"
        iconColor="black"
      />
      <ProjectLink
        :href="project.article_link"
        label="View Docs"
        icon="book"
        iconColor="maroon"
      />
      <ProjectLink
        :href="project.presentation_link"
        label="View Presentation"
        icon="play"
        iconColor="maroon"
      />
    </div>
    <p class="mt-2 mb-0">{{ project.description }}</p>
  </div>
</template>

<script>
import colorKeys from "~/assets/icon-color-keys.json";

import Icon from "~/components/Icon";
import ProjectLink from "./ProjectLink";

export default {
  components: {
    Icon,
    ProjectLink
  },
  data() {
    return {
      index: 0,
      icon: "",
      colorKeys: colorKeys
    };
  },
  props: ["project"],
  methods: {
    clickedIcon(icon) {
      this.$emit("iconClicked", icon);
    }
  }
};
</script>
