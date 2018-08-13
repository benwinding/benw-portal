<template>
  <div class="header">
    <nuxt-link to="/">Home</nuxt-link>
    <nuxt-link to="/about">About</nuxt-link>
    <nuxt-link to="/projects">Projects</nuxt-link>
    <nuxt-link to="/contact">Contact</nuxt-link>
  </div>
</template>

<script>

</script>

<style lang="scss" scoped>
  .header {
    margin-top: 20px;
    text-align: right;
    margin-right: 130px;

    @media (max-width: 650px) {
      text-align: left;
    }
  }

  a {
    margin-left: 30px;
    font-size: 30px;
    text-decoration: none;
    color: #4A4A4A;

    @media (max-width: 650px) {
      font-size: 15px;
    }
  }

  .nuxt-link-exact-active {
    border-bottom: 3px solid #4A4A4A;
  }
</style>

