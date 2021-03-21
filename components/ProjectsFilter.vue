<template>
  <div class="border-2 rounded-md">
    <p class="text-gray-700 m-1 my-0">Filter Projects:</p>
    <div>
      <filter-container label="Type"> </filter-container>
      <filter-container label="Year"></filter-container>
      <filter-container label="Tech">
        <div class="flex flex-wrap mb-2">
          <projects-filter-item
            iconName="checkall"
            iconLabel="- All -"
            :enabled="currentfilter === filter_all"
            v-on:clickedIcon="clickedIcon(iconName)"
          >
          </projects-filter-item>
          <projects-filter-item
            v-for="iconName in iconsAll"
            :key="iconName"
            :iconName="iconName"
            :iconLabel="iconName"
            :enabled="currentfilter === iconName"
            v-on:clickedIcon="clickedIcon(iconName)"
          >
          </projects-filter-item>
        </div>
      </filter-container>
    </div>
  </div>
</template>

<script>
import Icon from "~/components/Icon";
import ProjectsFilterItem from "~/components/ProjectsFilterItem";
import FilterContainer from "~/components/FilterContainer";

export default {
  props: ["filter_all", "projects_all", "currentfilter"],
  components: {
    FilterContainer,
    ProjectsFilterItem
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
      iconsUnique.sort();
      return iconsUnique;
    }
  },
  methods: {
    clickedIcon(iconName) {
      this.$emit("iconClicked", iconName);
    }
  }
};
</script>
