<template>
  <span :class="{ hovered }" v-on:mouseover="hoverAnimation">{{ letter }}</span>
</template>

<script>
  export default {
    props: ['letter'],
    data () {
      return { hovered: false }
    },
    methods: {
      toggleHover () {
        this.hovered = !this.hovered
      },
      hoverAnimation () {
        if (this.hovered) return
        this.toggleHover()
        setTimeout(this.toggleHover, 3200)
      }
    }
  }
</script>

<style scoped lang="scss">  
  span {
    font-weight: 800;
    letter-spacing: -20px;
    mix-blend-mode: darken;
    display: inline-block;
    opacity: 0.8;
    font-size: 20px;
    text-transform: uppercase;

    @media (max-width: 650px) {
      letter-spacing: -10px;
    }
  }

  .hovered {
    -webkit-animation: hoveranimation ease 3s;
    animation: hoveranimation ease 3s;
  }

  @keyframes hoveranimation {
    50% {
      transform: translateY(50px);
    }
  }

  @-webkit-keyframes hoveranimation {
    50% {
      transform: translateY(50px);
    }
  }
</style>
