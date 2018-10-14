<template> 
  <section class="container"> 
    <header-component></header-component>
    <transition name="fade" mode="out-in">
      <nuxt/>      
    </transition>
    <background-component></background-component>
  </section> 
</template> 

<script>
import Header from '~/components/Header.vue'
import Background from '~/components/Background.vue'

export default {
  components: {
    'header-component': Header,
    'background-component': Background
  }
}
</script>

<style lang="css">
  @import "https://fonts.googleapis.com/css?family=Lato:400,800";
</style>

<style lang="scss">
  @import '~/node_modules/bootstrap/scss/bootstrap.scss';

  ::-moz-selection {
    background: #b39ddb;
  }

  ::selection {
    background: #b39ddb;
  }
  
  html, body, #app {
    height: 98%;
    font-family: 'Lato', sans-serif;
  }

  .content {
    font-size: 12px;
    margin-left: 100px;
    margin-right: 100px;
    display: flex;
    flex-direction: column;

    @media (max-width: 650px) {
      margin-left: 5px;
      margin-right: 5px;
    }

    @media (max-width: 1050px) {
      margin-left: 30px;
      margin-right: 30px;
    }
  }

  .fade-enter-active, .fade-leave-active {
    transition: opacity 1s, transform 1s;
  }
  .fade-enter, .fade-leave-to {
    opacity: 0;
    transform: translateY(20%);
  }
</style>

