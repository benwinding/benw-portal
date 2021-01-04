<template>
  <div>
    <div class="header">
      <nuxt-link to="/">Home</nuxt-link>
      <nuxt-link to="/about">About</nuxt-link>
      <nuxt-link to="/projects">Projects</nuxt-link>
      <nuxt-link to="/contact">Contact</nuxt-link>
    </div>
    <a class="donut" href="/eat-the-donut.html"></a>
  </div>
</template>

<script></script>

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
  color: #4a4a4a;

  @media (max-width: 650px) {
    font-size: 15px;
  }
}

.donut {
  margin: 0px;
  position: absolute;
  border: 6px solid #faae6e66;
  border-radius: 100px;
  left: 10px;
  bottom: 20px;
  width: 18px;
  height: 18px;
  transform: scale(1.4);
  transform-origin: top left;
}

.nuxt-link-exact-active {
  border-bottom: 3px solid #4a4a4a;
}
</style>
