<template>
  <div>
    <div class="text-right text-blue-800 text md:text-2xl mt-4">
      <nuxt-link class="mr-3" to="/">Home</nuxt-link>
      <nuxt-link class="mr-3" to="/about">About</nuxt-link>
      <nuxt-link class="mr-3" to="/projects">Projects</nuxt-link>
      <nuxt-link class="mr-3" to="/contact">Contact</nuxt-link>
      <span v-if="false" title="more of ben">[More]</span>
    </div>
    <a class="fixed border-8 border-red-400 opacity-50 bottom-0 left-0 w-6 h-6 m-2 rounded-full" href="/eat-the-donut.html"></a>
  </div>
</template>

<script></script>

<style lang="scss" scoped>
.nuxt-link-exact-active {
  border-bottom: 2px solid #2c5282;
}
</style>
