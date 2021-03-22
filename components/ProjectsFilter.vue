<template>
  <div class="border-2 rounded-md">
    <p class="text-gray-700 m-1 my-0">Filter Projects:</p>
    <div>
      <filter-container label="Type"> 
        <div class="flex flex-wrap">
          <projects-filter-tag
            v-for="tag in tagsAll"
            :key="tag"
            :iconLabel="tag"
          >
          </projects-filter-tag>
        </div>
      </filter-container>
      <filter-container label="Year">
        <div class="flex flex-col">
          <projects-filter-item
            v-for="year in yearsAll"
            :key="year"
            iconName="plus"
            :iconLabel="year"
          >
          </projects-filter-item>
        </div>
      </filter-container>
      <filter-container label="Tech">
        <div class="flex flex-col">
          <projects-filter-item
            iconName="checkall"
            :iconLabel="filter_all"
            :enabled="currentfilter === filter_all"
            v-on:clickedIcon="clickedIcon(filter_all)"
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
import ProjectsFilterTag from "~/components/ProjectsFilterTag";
import FilterContainer from "~/components/FilterContainer";

export default {
  props: ["filter_all", "projects_all", "currentfilter"],
  components: {
    FilterContainer,
    ProjectsFilterItem,
    ProjectsFilterTag
  },
  computed: {
    projectsAllSafe() {
      const all = this.projects_all;
      if (!all || !all.length) {
        return [];
      }
      return all;
    },
    iconsAll() {
      const icons = this.projectsAllSafe
        .map(val => val.icons)
        .reduce((acc, cur) => acc.concat(cur));
      const iconsUnique = Array.from(new Set(icons));
      iconsUnique.sort();
      return iconsUnique;
    },
    yearsAll() {
      const years = this.projectsAllSafe
        .map(val => val.year);
      const yearsUnique = Array.from(new Set(years));
      yearsUnique.sort((a, b) => b - a);
      return yearsUnique;
    },
    tagsAll() {
      const tags = this.projectsAllSafe
        .map(val => val.tags)
        .reduce((acc, cur) => acc.concat(cur));
      const tagsUnique = Array.from(new Set(tags));
      tagsUnique.sort();
      return tagsUnique;
    }
  },
  methods: {
    clickedIcon(iconName) {
      this.$emit("iconClicked", iconName);
    }
  }
};
</script>
