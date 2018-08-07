<template>
  <div>
    <div class="v-center">
      <h1>What?</h1>
      This website is an evolving expression of who I am and what I've done.

      <h1>How?</h1>
      This website is based on the code provided by Ali
Spittel. The current technology stack is:
      <ul>
        <li>Vue js</li>
        <li>Webpack</li>
        <li>Sass</li>
        <li>Font Awesome</li>
      </ul>

    </div>
  </div>
</template>

<script>
  import RainbowText from "../components/RainbowText"

  export default {
    components: {
      'rainbow-text': RainbowText,
    }
  }
</script>

<style lang="scss">
</style>
