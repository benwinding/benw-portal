<template>
  <div class="row">
    <div class="col-12">            
      <rainbow-text text="Projects"></rainbow-text>
      <div class="card-filters">
        <ul class="nav nav-tabs">
          <li class="nav-item">
            <label>
              <i id="icon" 
                v-bind:class="{
                  'fa fa-star-of-life': true,
                  'icon-selected': currentFilter == 'fa fa-star-of-life'
                }"
                v-on:click="clickedIcon('fa fa-star-of-life')"
                >
              </i>
            </label>
            <label v-for="(icon) in iconsAll" :key="icon">
              <i id="icon" 
                v-bind:class="getClasses(icon)"
                v-on:click="clickedIcon(icon)"
                >
              </i>
            </label>
          </li>
        </ul>
      </div>
    </div>
    <transition name="fade" mode="out-in" v-for="(project, index) in projects" :key="index">
      <div class="col-xs-12 col-sm-6 col-md-4 col-lg-3">            
        <card :project="project" v-bind:style="{backgroundColor: project.colour}"></card>
      </div>
    </transition>
  </div>
</template>

<script>
import RainbowText from "@/components/RainbowText"
import Card from "@/components/Card"

import projectsData from "../data/projects.json"
const projectsAll = projectsData.all
const icons = projectsAll.map((val) => val.icons)
  .reduce((acc, cur) => acc.concat(cur))
const iconsUnique = Array.from(new Set(icons))

export default {
  data () {
    return {
      currentFilter: 'fa fa-star-of-life'
    }
  },
  computed: {
    iconsAll: function() {
      return iconsUnique
    },
    projects: function() {
      if (this.currentFilter == 'fa fa-star-of-life')
        return projectsAll;
      const activeProjects = projectsAll.reduce((acc, cur) => {
        if (cur.icons.includes(this.currentFilter))
          acc.push(cur);
        return acc;            
      }, [])
      return activeProjects;
    }
  },
  watch: {
    chkdIcons: function(val) {
      console.log(val);
      if (val.length < 1)
        return;
      if (val.length == 1 && this.activeChkd == val[0])
        return;
      this.chkAll = false
      const index = val.indexOf(this.activeChkd);
      if (index != -1)
        val.splice(index, 1);

      this.activeChkd = val[0];
      this.chkdIcons = [this.activeChkd];
    },
    chkAll: function(val) {
      if (val == true) {
        this.chkdIcons = []
      }
    }
  },
  methods: {
    clickedIcon(icon) {
      console.log("clicked", icon);
      this.currentFilter = icon;
    },
    getClasses(icon) {
      let classes = icon
      if (icon == this.currentFilter)
        classes += ' icon-selected'
      return classes;
    }
  },
  components: {
    'rainbow-text': RainbowText,
    'card': Card
  }
}
</script>
<style lang="scss" scoped>
  $grid-gutter-width: 10px;
  @import '../../node_modules/bootstrap/scss/bootstrap.scss';

  .card-filters input {
    display: none; /* hide the default checkbox */
  }

  #icon {
    border: 0px solid grey;
    display: inline-block;
    color: white;
    position: relative;
    font-size: 40px;
    background-color: #33b1eb;
    margin-right: 8px;
    vertical-align: middle;
    padding: 4px;
    width: 50px;
    transition: transform 0.5s;
    border-radius: 7px 7px 0px 0px;
    text-align: center;
  }

  #icon.icon-selected {
    background-color: orange;
    transform: scale(1.2) translateY(-9%);
  }

  .row > div {
    margin-bottom: 10px;
  }

  .border {
    margin-bottom: 15px;
  }
  .fade-enter-active, .fade-leave-active {
    transition: opacity 1s, transform 1s;
    transition: all 1s;
  }
  .fade-enter, .fade-leave-to {
    opacity: 0;
    transform: translateY(20%);
  }
</style>

