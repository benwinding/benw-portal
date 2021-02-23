<template>
  <div
    class="p-3 h-full flex items-center flex-col border-2 w-full rounded-md text-center hover:border-red-700 hover:bg-gray-700 hover:text-white"
  >
    <p class="text-xl font-bold">{{ project.name }}</p>
    <div class="flex">
      <span v-for="(iconName, index) in project.icons" :key="index">
        <Icon class="mx-1" v-bind:iconName="iconName" />
      </span>
    </div>
    <p class="my-2">{{ project.tools.join(", ") }}</p>
    <div class="underline flex flex-col items-center">
      <a v-if="project.deploy_link" :href="project.deploy_link">Live Site</a>
      <a v-if="project.code_link" :href="project.code_link">View Code</a>
      <a v-if="project.article_link" :href="project.article_link"
        >View Article</a
      >
      <a v-if="project.presentation_link" :href="project.presentation_link"
        >View Presentation</a
      >
    </div>
    <p class="mt-2 mb-0">{{ project.description }}</p>
  </div>
</template>

<script>
import colorKeys from "~/assets/icon-color-keys.json";

import Icon from "~/components/Icon";

export default {
  data() {
    return {
      index: 0,
      icon: "",
      colorKeys: colorKeys
    };
  },
  props: ["project"],
  components: {
    Icon
  }
};
</script>
