<template>
  <div>
    <div class="v-center">
      <transition name="bounce" mode="out-in">
        <rainbow-text v-if="loaded" text="Ben Winding" :large="true"></rainbow-text>
      </transition>

      <h2 class="intro">Let's build things that people want</h2>
    </div>
  </div>
</template>

<script>
  import RainbowText from "../components/RainbowText"

  export default {
    components: {
      'rainbow-text': RainbowText,
    },
    data() {
      return {
        loaded: false
      }
    },
    mounted() {
      this.loaded = true;
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

  .bounce-enter-active {
    animation: bouncein 1.9s cubic-bezier(0.47, 0, 0.745, 0.715) both;
  }
  @mixin ballb($yaxis: 0) {
    transform: translate3d(0, $yaxis, 0);
  }
  @keyframes bouncein { 
    1% { @include ballb(-400px); }
    20%, 40%, 60%, 80%, 95%, 99%, 100% { @include ballb() }
    30% { @include ballb(-80px); }
    50% { @include ballb(-40px); }
    70% { @include ballb(-30px); }
    90% { @include ballb(-15px); }
    97% { @include ballb(-10px); }
  }

</style>
