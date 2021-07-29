<template>
  <div>
    <div class="v-center">
      <div class="zoom-me">
        <rainbow-text text="Ben Winding" :large="true"></rainbow-text>
        <h2 class="intro">
          Complex solutions create complex bugs...
        </h2>
      </div>
    </div>
  </div>
</template>

<script>
import RainbowText from "~/components/RainbowText";

export default {
  head: {
    meta: [
      { property: "og:image", content: "https://i.imgur.com/orqq5jB.jpg" },
      { property: "og:title", content: "Home - Ben Winding" },
      {
        property: "og:description",
        content: "A web developer from Adelaide, South Australia.",
      },
    ],
    title: "Home",
  },
  components: {
    "rainbow-text": RainbowText,
  },
};
</script>

<style lang="scss">
.intro {
  margin-bottom: -10px;
  font-size: 2em;
  font-weight: normal;
  color: #4a4a4a;

  @media (max-width: 650px) {
    font-size: 1.5em;
  }

  span {
    display: inline-grid;
  }
}

.intro a {
  text-decoration: none;
  color: #2196f3;
}

.v-center {
  padding-top: 21vh;
}

.zoom-me {
  transition: 1s;
  animation: zoomin 1.9s;
}

@keyframes zoomin {
  0% {
    transform: scale(0.8);
    opacity: 0;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}
</style>
