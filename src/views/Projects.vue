<template>
  <div>
    <rainbow-text text="Projects"></rainbow-text>
    <div class="cards">
      <card :project="project" v-for="(project, index) in projects" :key="index"></card>
    </div>
  </div>
</template>

<script>
import RainbowText from "@/components/RainbowText"
import Card from "@/components/Card"

import projects from "../data/projects.json"

export default {
  data () {
    return {
      projects
    }
  },
  components: {
    'rainbow-text': RainbowText,
    'card': Card
  } 
}
</script>

<style lang="scss" scoped>

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
</style>

