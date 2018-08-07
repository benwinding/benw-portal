<template>
  <div class="header">
    <router-link to="/">Home</router-link>
    <router-link to="/about">About</router-link>
    <router-link to="/projects">Projects</router-link>
    <router-link to="/contact">Contact</router-link>
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

  .router-link-exact-active {
    border-bottom: 3px solid #4A4A4A;
  }
</style>

