<template>
  <div class="border-2 rounded-md">
    <p class="text-gray-700 m-1 my-0">Filter Projects:</p>
    <div>
      <filter-container label="Type">
        <div class="flex flex-wrap">
          <projects-filter-tag
            v-for="tag in allTags"
            :key="tag.key"
            :iconLabel="tag.key"
            :enabled="tag.enabled"
            v-on:clickedItem="clickedTag(tag)"
          >
          </projects-filter-tag>
        </div>
      </filter-container>
      <filter-container label="Year">
        <div class="flex flex-col">
          <projects-filter-item
            v-for="year in allYears"
            :key="year.key"
            iconName="plus"
            :iconLabel="year.key"
            :enabled="year.enabled"
            v-on:clickedItem="clickedYear(year)"
          >
          </projects-filter-item>
        </div>
      </filter-container>
      <filter-container label="Tech">
        <div class="flex flex-col">
          <projects-filter-item
            v-for="icon in allIcons"
            :key="icon.key"
            :iconName="icon.key"
            :iconLabel="icon.key"
            :enabled="icon.enabled"
            v-on:clickedItem="clickedIcon(icon)"
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
  props: ["projectsall"],
  components: {
    FilterContainer,
    ProjectsFilterItem,
    ProjectsFilterTag
  },
  data() {
    return {
      selectedYears: new Set(),
      selectedTags: new Set(),
      selectedIcons: new Set(),
      allYears: [],
      allTags: [],
      allIcons: [],
    };
  },
  watch: {
    projectsall: {
      immediate: true,
      handler(newVal, oldVal) {
        this.allYears = this.MakeAllYears();
        this.allTags = this.MakeAllTags();
        this.allIcons = this.MakeAllIcons();
      }
    },
  },
  computed: {
    projectsAllSafe() {
      const all = this.projectsall;
      if (!all || !all.length) {
        return [];
      }
      return all;
    }
  },
  methods: {
    MakeAllYears() {
      const years = this.projectsAllSafe.map(val => val.year);
      const unique = Array.from(new Set(years));
      unique.sort((a, b) => b - a);
      const uniqueObj = this.ConvertToEnabledObjs(unique) 
      return uniqueObj;
    },
    MakeAllTags() {
      const tags = this.projectsAllSafe
        .map(val => val.tags)
        .reduce((acc, cur) => acc.concat(cur), []);
      const unique = Array.from(new Set(tags));
      unique.sort();
      const uniqueObj = this.ConvertToEnabledObjs(unique) 
      return uniqueObj;
    },
    MakeAllIcons() {
      const icons = this.projectsAllSafe
        .map(val => val.icons)
        .reduce((acc, cur) => acc.concat(cur), []);
      const unique = Array.from(new Set(icons));
      unique.sort();
      const uniqueObj = this.ConvertToEnabledObjs(unique) 
      return uniqueObj;
    },
    ConvertToEnabledObjs(unique) {
      return unique.map(u => {
        return {
          key: u,
          enabled: false
        }
      })
    },
    toggle(inputSet, inputVal) {
      if (inputSet.has(inputVal)) {
        inputVal.enabled = false;
        inputSet.delete(inputVal);
      } else {
        inputVal.enabled = true;
        inputSet.add(inputVal);
      }
    },
    clickedIcon(icon) {
      this.toggle(this.selectedIcons, icon);
      this.emitChanged();
    },
    clickedYear(year) {
      this.toggle(this.selectedYears, year);
      this.emitChanged();
    },
    clickedTag(tag) {
      this.toggle(this.selectedTags, tag);
      this.emitChanged();
    },
    emitChanged() {
      function GetVal(inputSet) {
        return [...inputSet].map(a => a.key);
      }
      const filterChangedEvent = {
        years: GetVal(this.selectedYears),
        tags: GetVal(this.selectedTags),
        icons: GetVal(this.selectedIcons)
      };
      console.log('emitChanged', {filterChangedEvent})
      this.$emit("filterChanged", filterChangedEvent);
    }
  }
};
</script>
