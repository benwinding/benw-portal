<template>
  <div class="row">
    <div class="col-12">
      <rainbow-text text="Projects"></rainbow-text>
      <div class="card-filters">
        <ul class="nav nav-tabs">
          <li class="nav-item">
            <label>
              <IconSelectAll
                id="icon"
                style="fill: black;"
                height="40"
                width="40"
                v-on:click="clickedIcon('filter-all')"
              />
            </label>
            <label v-for="(iconName) in iconsAll" :key="iconName">
              <Icon id="icon" v-bind:iconName="iconName" v-on:click="clickedIcon(iconName)" />
            </label>
          </li>
        </ul>
      </div>
    </div>
    <div class="card-container">
      <transition-group name="list" tag="div">
        <div v-for="(project, index) in projectsEnabled" :key="index + project.name">
          <card-project :project="project" :class="project.bg"></card-project>
        </div>
      </transition-group>
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
      projectsEnabled: []
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
        delayMs += 100;
        if (!this.isProjectEnabled(project)) {
          this.addProject(project, delayMs);
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
      setTimeout(() => {
        // console.log('adding: ', project)
        this.projectsEnabled.push(project);
      }, delayMs);
    },
    removeProject(project, delayMs) {
      setTimeout(() => {
        // console.log('removing: ', project)
        this.projectsEnabled = this.projectsEnabled.filter(
          item => item.name !== project.name
        );
      }, delayMs);
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
<style lang="scss" scoped>
$grid-gutter-width: 10px;
@import "~/node_modules/bootstrap/scss/bootstrap.scss";

.card-filters input {
  display: none; /* hide the default checkbox */
}

#icon {
  background-color: #33b1eb3d;
  border-radius: 7px 7px 0px 0px;
  border: 0px solid grey;
  color: white;
  display: inline-block;
  font-size: 40px;
  margin-right: 8px;
  padding: 4px;
  position: relative;
  text-align: center;
  transition: transform 0.5s;
  vertical-align: middle;
  width: 50px;
}

#icon.icon-selected {
  background-color: orange;
  transform: scale(1.2) translateY(-9%);
}

#icon:hover {
  opacity: 0.65;
  box-shadow: 0px -5px 10px #969696;
}

.row > div {
  margin-bottom: 10px;
}

.border {
  margin-bottom: 15px;
}

.card-container > div {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;

  div {
    margin: 0px 2px 8px 2px;
  }

  @media (max-width: 576px) {
    div {
      width: 100%;
    }
  }

  .list-enter-active,
  .list-leave-active {
    transition: all 1s;
  }
  .list-enter,
  .list-leave-to {
    opacity: 0;
    transform: translateY(50%);
  }
}
</style>
