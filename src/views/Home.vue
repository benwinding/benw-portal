<template>
  <div>
    <div class="v-center">
      <rainbow-text text="Ben Winding" :large="true"></rainbow-text>

      <h2 class="intro">Let's make things</h2>
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

  .intro {
    margin-bottom: -10px;
    font-size: 2em;
    font-weight: normal;
    color: #4A4A4A;

    @media (max-width: 650px) {
      font-size: 1.5em;
    }
  }


  .intro a {
    text-decoration: none;
    color: #2196f3;
  }

  .v-center {
    padding-top: 21vh;
  }
</style>
