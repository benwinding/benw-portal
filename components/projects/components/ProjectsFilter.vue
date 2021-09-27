<template>
  <div class="border-2 rounded-md">
    <div class="m-1">
      <p class="text-gray-700 -mt-1">Filter Projects:</p>
      <div class="mx-0 relative">
        <input
          v-bind:value="searchText"
          @keydown="onTextChanged"
          :class="'text-xl pl-10 py-1 mb-1 rounded w-full border-2 transition-all ' + (hasText ? 'pr-10' : 'pr-0') "
          type="text"
          placeholder="Filter projects"
        />
        <svg
          class="absolute left-0 top-0 mt-2 ml-2 text-gray-400"
          viewBox="0 0 32 32"
          width="24"
          height="24"
          fill="none"
          stroke="currentcolor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
        >
          <circle cx="14" cy="14" r="12" />
          <path d="M23 23 L30 30" />
        </svg>
        <svg
          :class="'absolute cursor-pointer right-0 top-0 mt-3 mr-2 transition-all duration-500 ' + (hasText ? 'text-gray-900' : 'text-transparent')"
          @click="clickedClearSearch"
          viewBox="0 0 32 32"
          width="20"
          height="20"
          fill="none"
          stroke="currentcolor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="4"
        >
          <path d="M2 30 L30 2 M30 30 L2 2" />
        </svg>
      </div>
      <div>
        <div class="flex flex-wrap items-center">
          <span class="text-xs mb-1">Filters: </span>
          <projects-filter-tag
            v-for="tag in selectedTags"
            :key="tag"
            :iconLabel="tag"
            :enabled="tag"
            v-on:clickedItem="clickedTagStr(tag)"
          >
          </projects-filter-tag>
          <projects-filter-tag
            v-for="year in selectedYears"
            :key="year"
            :iconLabel="year"
            :enabled="year"
            v-on:clickedItem="clickedYearStr(year)"
          >
          </projects-filter-tag>
          <projects-filter-tag
            v-for="icon in selectedIcons"
            :key="icon"
            :iconLabel="icon"
            :enabled="icon"
            v-on:clickedItem="clickedIconStr(icon)"
          >
          </projects-filter-tag>
          <projects-filter-tag
            v-if="hasAnyEnabled"
            iconLabel="clear all"
            color="orange"
            :enabled="true"
            v-on:clickedItem="clickedClearAll()"
          >
          </projects-filter-tag>
          <span class="mb-1 ml-1" v-if="!hasAnyEnabled">-</span>
        </div>
        <div class="text-xs">Found: {{ foundCount }} projects</div>
      </div>
    </div>
    <div>
      <filter-container label="Type">
        <div class="flex flex-wrap">
          <projects-filter-tag
            v-for="tag in allTags"
            :key="tag.key"
            :iconLabel="tag.key"
            :count="tag.count"
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
import ProjectsFilterItem from "./ProjectsFilterItem";
import ProjectsFilterTag from "./ProjectsFilterTag";
import FilterContainer from "./FilterContainer";

export default {
  props: ["projectsall", "foundCount"],
  components: {
    FilterContainer,
    ProjectsFilterItem,
    ProjectsFilterTag,
  },
  data() {
    return {
      selectedYears: [],
      selectedTags: [],
      selectedIcons: [],
      allYears: [],
      allTags: [],
      allIcons: [],
      searchText: "",
    };
  },
  watch: {
    projectsall: {
      immediate: true,
      handler(newVal, oldVal) {
        this.allYears = this.MakeAllYears();
        this.allTags = this.MakeAllTags();
        this.allIcons = this.MakeAllIcons();
      },
    },
  },
  computed: {
    projectsAllSafe() {
      const all = this.projectsall;
      if (!all || !all.length) {
        return [];
      }
      return all;
    },
    hasAnyEnabled() {
      return (
        !!this.selectedYears.length ||
        !!this.selectedTags.length ||
        !!this.selectedIcons.length
      );
    },
    hasText() {
      return !!this.searchText;
    }
  },
  methods: {
    MakeAllYears() {
      const years = this.projectsAllSafe.map((val) => val.year);
      const unique = Array.from(new Set(years));
      unique.sort((a, b) => b - a);
      const uniqueObj = ConvertToEnabledObjs(unique);
      return uniqueObj;
    },
    MakeAllTags() {
      const tags = this.projectsAllSafe
        .map((val) => val.tags)
        .reduce((acc, cur) => acc.concat(cur), []);
      const tagsMap = tags.reduce((acc, cur) => {
        if (!Number.isFinite(acc[cur])) {
          acc[cur] = 0;
        }
        acc[cur]++;
        return acc;
      }, {});
      const tagsArr = Object.entries(tagsMap).map(([tag, count]) => {
        return { key: tag, count };
      });
      tagsArr.sort((a, b) => b.count - a.count);
      const uniqueObj = ConvertToEnabledObjs2(tagsArr);
      console.log({ tagsArr, uniqueObj });
      return uniqueObj;
    },
    MakeAllIcons() {
      const icons = this.projectsAllSafe
        .map((val) => val.icons)
        .reduce((acc, cur) => acc.concat(cur), []);
      const unique = Array.from(new Set(icons));
      unique.sort();
      const uniqueObj = ConvertToEnabledObjs(unique);
      return uniqueObj;
    },
    toggle(inputArr, inputVal) {
      const index = inputArr.findIndex((a) => a === inputVal.key);
      if (index >= 0) {
        inputVal.enabled = false;
        inputArr.splice(index, 1);
      } else {
        inputVal.enabled = true;
        inputArr.push(inputVal.key);
      }
    },
    clickedClearSearch() {
      this.searchText = '';
      this.emitChanged();
    },
    clickedIconStr(iconStr) {
      const icon = this.allIcons.find((i) => i.key === iconStr);
      this.toggleIcon(icon);
    },
    clickedYearStr(yearStr) {
      const year = this.allYears.find((i) => i.key === yearStr);
      this.toggleYear(year);
    },
    clickedTagStr(tagStr) {
      const tag = this.allTags.find((i) => i.key === tagStr);
      this.toggleTag(tag);
    },
    clickedIcon(icon) {
      this.toggleIcon(icon);
    },
    clickedYear(year) {
      this.toggleYear(year);
    },
    clickedTag(tag) {
      this.toggleTag(tag);
    },
    toggleIcon(icon) {
      this.toggle(this.selectedIcons, icon);
      this.selectedIcons = this.selectedIcons;
      this.emitChanged();
    },
    toggleYear(year) {
      this.toggle(this.selectedYears, year);
      this.selectedYears = this.selectedYears;
      this.emitChanged();
    },
    toggleTag(tag) {
      this.toggle(this.selectedTags, tag);
      this.selectedTags = this.selectedTags;
      this.emitChanged();
    },
    clickedClearAll() {
      this.allYears.map((a) => (a.enabled = false));
      this.allTags.map((a) => (a.enabled = false));
      this.allIcons.map((a) => (a.enabled = false));
      this.selectedYears = [];
      this.selectedTags = [];
      this.selectedIcons = [];
      this.emitChanged();
    },
    onTextChanged(e) {
      setTimeout(() => {
        this.searchText = e.target.value;
        this.emitChanged();
      });
    },
    emitChanged() {
      const filterChangedEvent = {
        years: this.selectedYears,
        tags: this.selectedTags,
        icons: this.selectedIcons,
        searchText: this.searchText,
      };
      // console.log("emitChanged", { filterChangedEvent });
      this.$emit("filterChanged", filterChangedEvent);
    },
  },
};

function ConvertToEnabledObjs(unique) {
  return unique.map((u) => {
    return {
      key: u,
      enabled: false,
    };
  });
}

function ConvertToEnabledObjs2(unique) {
  return unique.map((u) => {
    return {
      ...u,
      enabled: false,
    };
  });
}
</script>
