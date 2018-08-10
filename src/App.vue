<template>
  <div>
    <header-component />
    <div class="content">
      <transition name="fade" mode="out-in">
        <router-view />
      </transition>
    </div>
    <background />
  </div>
</template>

<script>
import HeaderComponent from '@/components/HeaderComponent.vue'
import Background from '@/components/Background.vue'

export default {
  name: 'app',
  components: { 
    'header-component': HeaderComponent,
    'background': Background
  }
}
</script>

<style lang="scss">
  @import url('https://fonts.googleapis.com/css?family=Lato:400,800');

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
