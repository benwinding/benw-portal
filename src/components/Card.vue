<template>
  <div class="card">
    <h5>{{ project.name }}</h5>
    <div class="icons">
      <i v-for="(icon, index) in project.icons" :key="index" :class="icon"></i>
    </div>
    <p>
      {{ project.tools.join(', ') }}
    </p>
    <ul>
      <li v-if="project.deploy_link">
        <a :href="project.deploy_link">View Project</a>
      </li>
      <li v-if="project.code_link">
        <a :href="project.code_link">View Code</a>
      </li>
      <li v-if="project.article_link">
        <a :href="project.article_link">View Article</a>
      </li>
      <li v-if="project.presentation_link">
        <a :href="project.presentation_link">View Presentation</a>
      </li>
    </ul>
    <p>
      {{ project.description }}
    </p>
  </div>
</template>

<script>
export default {
  data () {
    return {
      index: 0,
      icon: ""
    }
  },
  props: ["project"]
}
</script>

<style lang="scss" scoped>
  h5 {
    font-size: 20px;
    line-height: 150%;
  }
  
  a {
    color: white;
  }

  i {
    margin-left: 10px;
  }

  ul {
    list-style-type: none;
    padding: 0;
    margin: 0;
  }

  li {
    line-height: 150%;
  }

  .card {
    margin: .5rem .5rem 1rem .5rem;
    padding: .5rem 1rem 1rem 1rem;
    border-radius: 2px;
    color: #fff;
    text-align: center;
    font-size: 1.3em;
    font-family: 'Lato', sans-serif;
    transition: top .5s, left .5s; 
  }

  .card:hover {
    position: relative;
    top: -5px;
    left: -5px;
    box-shadow: 5px 5px 5px #969696;
  }

  .icons {
    margin-top: -30px;
    margin-bottom: -10px;
    font-size: 40px;
  }
</style>

