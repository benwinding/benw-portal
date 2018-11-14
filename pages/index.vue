<template>
  <div>
    <div class="v-center">
      <transition name="bounce" mode="out-in" appear>
        <div>
          <rainbow-text text="Ben Winding" :large="true"></rainbow-text>
          <h2 class="intro">Let's build things that people 
            <span>
              <transition name="need">
                <div id="need" v-show="isLoaded">need</div> 
              </transition>
              <transition name="want">
                <div id="want" v-show="isLoaded">want</div>
              </transition>
            </span> to use...
          </h2>
        </div>
      </transition>
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
        content: "A web developer from Adelaide, South Australia."
      }
    ],
    title: "Home"
  },
  components: {
    "rainbow-text": RainbowText
  },
  data() {
    return {
      isLoaded: false
    }
  },
  mounted() {
    this.$nextTick(() => {      
      this.isLoaded = true;
      console.log("mounted: home page, loaded");
    });
  }
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

.bounce-enter-active {
  animation: zoomin 1.9s;
}
@keyframes zoomin {
  0% {
    transform: scale(0.8);
  }
  100% {
    transform: scale(1);
  }
}


#need {
  text-decoration: line-through;

  &.need-enter-to {
    text-decoration: line-through;
    text-decoration-color: auto;
  }
  &.need-enter {
    text-decoration: none;
    text-decoration-color: #FFFFFF00;
  }
  &.need-enter-active {
    transition: all 6.0s;
  }
}

#want {
  font-style: italic;
  color: #000;
  margin-top: -10px;

  &.want-enter {
    transform: translateY(30px);
    opacity: 0;
  }
  &.want-enter-to {
    opacity: 1;
  }
  &.want-enter-active {
    transition: all 3.0s;
  }
}
</style>
