<template>
  <div>
    <rainbow-text text="Projects"></rainbow-text>
    <div class="card-filters">
      <ul class="chk-all">
        <li>
          <input type="checkbox" v-model="chkAll">
          <span>All</span>
        </li>
      </ul>
      <ul v-for="(tag) in tagsAll" :key="tag">
        <li>
          <input type="checkbox" :id="tag" :value="tag" v-model="tags">
          <span>{{tag}}</span>
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
const tags = projectsAll.map((val) => val.tags)
  .reduce((acc, cur) => acc.concat(cur))
const tagsUnique = Array.from(new Set(tags))

export default {
  data () {
    return {
      tags: tagsUnique,
      chkAll: true
    }
  },
  computed: {
    tagsAll: function() {
      return tagsUnique
    },
    projects: function() {
      const activeTags = this.tags
      const activeProjects = projectsAll.reduce((acc, cur) => {
        for (const tag of cur.tags) {
          if (activeTags.includes(tag)) {
            acc.push(cur);
            break;
          }
        }
        return acc;
      }, [])
      return activeProjects;
    }
  },
  watch: {
    chkAll: function(val) {
      if (val)
        this.tags = this.tagsAll;
      else
        this.tags = [];
    }
  },
  components: {
    'rainbow-text': RainbowText,
    'card': Card
  } 
}
</script>

<style lang="scss" scoped>
  .card-filters {
    margin: 8px;
  }

  .card-filters > .chk-all {
    background-color: lightgrey;
  }
  
  .card-filters ul {
    display: inline-block;
    list-style: none;
    margin: 8px 8px 0px 0px;
    padding: 0px;
    vertical-align: middle;
    background-color: cyan;
  }
  .card-filters input {
    margin: 10px;
    vertical-align: middle;
    transform: scale(2);
  }
  .card-filters span {
    margin-right: 5px;
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

