<template>
  <div class="row">
    <div class="col-12">            
      <rainbow-text text="Projects"></rainbow-text>
      <div class="card-filters">
        <ul class="filter-all">
          <li>
            <label>
              <input id="filter-input" type='checkbox' v-model="chkAll">
              <span class="filter-icon fa fa-star-of-life"></span>
            </label>
          </li>
        </ul>
        <ul class="filter-each-icon" v-for="(icon) in iconsAll" :key="icon">
          <li>
            <label>
              <input id="filter-input" type="checkbox" 
                :id="icon" 
                :value="icon" 
                v-model="icons">
              <span v-bind:class="'filter-icon '+icon"></span>
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
      icons: iconsUnique,
      chkAll: true
    }
  },
  computed: {
    iconsAll: function() {
      return iconsUnique
    },
    projects: function() {
      const activeicons = this.icons
      const activeProjects = projectsAll.reduce((acc, cur) => {
        for (const tag of cur.icons) {
          if (!activeicons.includes(tag)) {
            return acc;
          }
        }
        acc.push(cur);
        return acc;
      }, [])
      return activeProjects;
    }
  },
  watch: {
    chkAll: function(val) {
      if (val)
        this.icons = this.iconsAll;
      else
        this.icons = [];
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

  .filter-icon {
    height: 40px;
    width: 40px;
    border: 0px solid grey;
    display: inline-block;
    position: relative;
  }

  .card-filters [type=checkbox] + span:before {
    color: #00000033;
  }

  .card-filters [type=checkbox]:checked + span:before {
    position: absolute;
    color: #0062ff;
    color: blue;
    color: black;
  }

  .filter-icon {
    font-size: 40px;
    vertical-align: middle;
  }

  .filter-all:hover, .filter-each-icon:hover {
    transition: box-shadow 0.15s;
    position: relative;
    box-shadow: 0px 0px 3px 3px blue;
  }

  .card-filters > .filter-all {
    background-color: orange;
  }

  .card-filters > .filter-each-icon {
    background-color: #bdffe1;
  }
  
  .filter-all, .filter-each-icon {
    display: inline-block;
    list-style: none;
    margin: 8px 8px 0px 0px;
    padding: 5px;
    vertical-align: middle;
  }

  #filter-input {
    margin: 10px;
    vertical-align: middle;
    transform: scale(2);
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

