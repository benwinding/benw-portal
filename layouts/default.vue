<template>
  <div class="h-screen w-screen" style="overflow-y: overlay; padding-right: 10px;" >
    <section class="container mx-auto p-2">
      <header-component></header-component>
      <transition name="fade" mode="out-in">
        <nuxt />
      </transition>
    </section>
  </div>
</template>

<script>
import Header from "~/components/Header.vue";
import Background from "~/components/Background.vue";

export default {
  components: {
    "header-component": Header,
    // 'background-component': Background
  }
};
</script>

<style lang="css">
@import "https://fonts.googleapis.com/css?family=Lato:400,800";
</style>

<style lang="scss">
.fade-enter-active,
.fade-leave-active {
  transition: opacity 1s, transform 1s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
  transform: translateY(20%);
}
</style>
