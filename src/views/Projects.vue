<template>
  <div>
    <rainbow-text text="Projects"></rainbow-text>
    <div class="card-filters">

      <ul class="filter-icon-all">
        <li>
          <label>
            <input id="icon-input" type='checkbox' v-model="chkAll">
            <span class="filter-icon fa fa-star-of-life"></span>
          </label>
        </li>
      </ul>
      <ul v-for="(icon) in iconsAll" :key="icon">
        <li>
          <label>
            <input type="checkbox" 
              :id="icon" 
              :value="icon" 
              v-model="icons">
            <span v-bind:class="'filter-icon '+icon"></span>
          </label>
        </li>
      </ul>
    </div>
    <div class="cards">
      <transition name="fade" mode="out-in" v-for="(project, index) in projects" :key="index">
        <card :project="project"></card>
      </transition>
    </div>
  </div>
</template>

<script>
import RainbowText from "@/components/RainbowText"
import Card from "@/components/Card"

import projectsAll from "../data/projects.json"
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
  .card-filters input {
    display: none; /* hide the default checkbox */
  }

  .card-filters span {
    height: 40px;
    width: 40px;
    border: 0px solid grey;
    display: inline-block;
    position: relative;
    color: black;
  }

  .card-filters [type=checkbox] + span:before {
    color: #00000033;
  }

  .card-filters [type=checkbox]:checked + span:before {
    position: absolute;
    color: black;
  }

  .filter-icon {
    font-size: 40px;
  }

  .card-filters {
    margin: 8px;
  }

  .card-filters > .filter-icon-all {
    background-color: yellow;
  }
  
  .card-filters ul {
    display: inline-block;
    list-style: none;
    margin: 8px 8px 0px 0px;
    padding: 5px;
    vertical-align: middle;
    background-color: cyan;
  }

  .card-filters input {
    margin: 10px;
    vertical-align: middle;
    transform: scale(2);
  }
  
  .card-filters span {
    vertical-align: middle;
  }

  .cards {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 10px;
    
    @media (max-width: 1050px) {
      grid-template-columns: repeat(2, 1fr);
    }

    @media (max-width: 650px) {
      grid-template-columns: repeat(1, 1fr);
    }
  }

  .cards div:nth-child(10n+1) {
    background-color: #ef5350;
  }
  
  .cards div:nth-child(10n+2) {
    background-color: #ab47bc;
  }
  
  .cards div:nth-child(10n+3) {
    background-color: #651fff;
  }
  
  .cards div:nth-child(10n+5) {
    background-color: #3949ab;
  }
  
  .cards div:nth-child(10n+4) {
    background-color: #2196f3;
  }
  
  .cards div:nth-child(10n+6) {
    background-color: #00bcd4;
  }
  
  .cards div:nth-child(10n+7) {
    background-color: #4caf50;
  }
  
  .cards div:nth-child(10n+8) {
    background-color: #ffc107;
  }
  
  .cards div:nth-child(10n+9) {
    background-color: #ff80ab;
  }
  
  .cards div:nth-child(10n+10) {
    background-color: #ff8f00;
  }

  .fade-enter-active, .fade-leave-active {
    transition: opacity 1s, transform 1s;
  }
  .fade-enter, .fade-leave-to {
    opacity: 0;
    transform: translateY(20%);
  }
</style>

