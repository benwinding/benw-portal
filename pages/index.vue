<template>
  <div>
    <div class="v-center">
      <transition name="bounce" mode="out-in">
        <rainbow-text v-show="loaded" text="Ben Winding" :large="true"></rainbow-text>
      </transition>

      <h2 class="intro">Let's build things that people want</h2>
    </div>
  </div>
</template>

<script>
  import RainbowText from "~/components/RainbowText"

  export default {
    head: {
      meta: [
        { property:"og:image", content:"https://i.imgur.com/orqq5jB.jpg" },
        { property:"og:title", content:"Home - Ben Winding" },
        { property:"og:description", content:"A web developer from Adelaide, South Australia." },
      ],
      title: 'Home'
    },
    components: {
      'rainbow-text': RainbowText,
    },    
    data() {
      return {
        loaded: false
      }
    },
    mounted() {
      this.$nextTick(() => {
        this.loaded = true;
        console.log("mounted: home page, loaded=" + this.loaded);
      })
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
