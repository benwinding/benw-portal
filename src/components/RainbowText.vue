<template>
  <div :class="{ large }">
    <span v-for="(letter, index) in text" :key="index">
      <rainbow-letter v-if="letter !== ' '" :letter="letter"
        v-bind:style="{ color: getColor(index) }"
      ></rainbow-letter>
      <br v-else>
    </span>
  </div>
</template>

<script>
  import RainbowLetter from './RainbowLetter'
  import * as interpolate from 'color-interpolate'

  export default {
    props: ['text', 'large'],
    components: {
      'rainbow-letter': RainbowLetter
    },
    methods: {
      getColor (index) {
        const colors = [
        '#800000',
        '#A21051',
        '#9D4B9E',
        '#6B7DD8',
        '#00A8F1',
        '#00CBEB',
        ].reverse();
        let colormap = interpolate(colors);
        const min = 0;
        const max = this.text.length;
        const val = (max - index) / (max - min)
        return colormap(val);
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import url('https://fonts.googleapis.com/css?family=Lato:400,800');
    
  div > span > span {
    font-size: 80px;
    letter-spacing: -10px;

    @media (max-width: 500px) {
      font-size: 80px;
    }
  }

  .large > span > span {
    font-size: 200px;
    line-height: 60%;

    @media (max-width: 1050px) {
      font-size: 170px;
    }

    @media (max-width: 800px) {
      font-size: 120px;
    }

    @media (max-width: 600px) {
      font-size: 70px;
    }
    @media (max-width: 350px) {
      font-size: 55px;
    }
  }

</style>

