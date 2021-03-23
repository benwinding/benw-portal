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
            v-on:clickedItem="clickedTag(tag)"
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
            v-on:clickedItem="clickedYear(year)"
          >
          </projects-filter-item>
        </div>
      </filter-container>
      <filter-container label="Tech">
        <div class="flex flex-col">
          <projects-filter-item
            iconName="checkall"
            :iconLabel="filterall"
            :enabled="currentfilter === filterall"
            v-on:clickedItem="clickedIcon(filterall)"
          >
          </projects-filter-item>
          <projects-filter-item
            v-for="iconName in iconsAll"
            :key="iconName"
            :iconName="iconName"
            :iconLabel="iconName"
            :enabled="currentfilter === iconName"
            v-on:clickedItem="clickedIcon(iconName)"
          >
          </projects-filter-item>
        </div>
      </filter-container>
    </div>
  </div>
</template>

<script>
import Icon from "~/components/Icon";
import ProjectsFilterItem from "./ProjectsFilterItem";
import ProjectsFilterTag from "./ProjectsFilterTag";
import FilterContainer from "./FilterContainer";

export default {
  props: ["filterall", "projectsall", "currentfilter"],
  components: {
    FilterContainer,
    ProjectsFilterItem,
    ProjectsFilterTag,
  },
  data() {
    return {
      selectedYears: new Set(),
      selectedTags: new Set(),
      selectedIcons: new Set(),
    }
  },
  computed: {
    projectsAllSafe() {
      const all = this.projectsall;
      if (!all || !all.length) {
        return [];
      }
      return all;
    },
    iconsAll() {
      const icons = this.projectsAllSafe
        .map(val => val.icons)
        .reduce((acc, cur) => acc.concat(cur), []);
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
        .reduce((acc, cur) => acc.concat(cur), []);
      const tagsUnique = Array.from(new Set(tags));
      tagsUnique.sort();
      return tagsUnique;
    }
  },
  methods: {
    toggle(inputSet, inputVal) {
      if (inputSet.has(inputVal)) {
        inputSet.delete(inputVal);
      } else {
        inputSet.add(inputVal);
      }
    },
    clickedIcon(iconName) {
      this.toggle(this.selectedIcons, iconName)
      this.emitChanged()
    },
    clickedYear(year) {
      this.toggle(this.selectedYears, year)
      this.emitChanged()
    },
    clickedTag(tag) {
      this.toggle(this.selectedTags, tag)
      this.emitChanged()
    },
    emitChanged() {
      const filterChangedEvent = {
        years: Array.from(this.selectedYears),
        tags: Array.from(this.selectedTags),
        icons: Array.from(this.selectedIcons),
      }
      this.$emit("filterChanged", filterChangedEvent);
    }
  }
};
</script>
