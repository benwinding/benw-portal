<template>
  <div class="border-2 rounded-md">
    <p class="text-gray-700 m-1 my-0">Filter Projects:</p>
    <div>
      <filter-container label="Type"> </filter-container>
      <filter-container label="Year"></filter-container>
      <filter-container label="Tech">
        <div class="flex flex-wrap mb-2">
          <label>
            <IconSelectAll
              :class="currentfilter === filter_all ? 'bg-blue-400' : ''"
              class="hover:shadow-xl p-1 hover:bg-gray-700"
              style="fill: black;"
              height="40"
              width="40"
              v-on:click="clickedIcon('filter-all')"
            ></IconSelectAll>
          </label>
          <label
            :class="currentfilter === iconName ? 'bg-blue-400' : ''"
            class="hover:shadow-xl hover:bg-gray-700"
            v-for="iconName in iconsAll"
            :key="iconName"
          >
            <Icon
              class="p-1"
              v-bind:iconName="iconName"
              v-on:click="clickedIcon(iconName)"
            ></Icon>
          </label>
        </div>
      </filter-container>
    </div>
  </div>
</template>

<script>
import Icon from "~/components/Icon";
import FilterContainer from "~/components/FilterContainer";
import IconSelectAll from "~/assets/icons/material/check-box-multiple-outline.svg";

export default {
  props: ["filter_all", "projects_all", "currentfilter"],
  components: {
    Icon,
    IconSelectAll,
    FilterContainer
  },
  computed: {
    iconsAll() {
      const all = this.projects_all;
      if (!all || !all.length) {
        return [];
      }
      const icons = all
        .map(val => val.icons)
        .reduce((acc, cur) => acc.concat(cur));
      const iconsUnique = Array.from(new Set(icons));
      return iconsUnique;
    }
  },
  data() {
    return {};
  },
  methods: {
    clickedIcon(iconName) {
      this.$emit("iconClicked", iconName);
    }
  }
};
</script>
