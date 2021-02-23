<template>
  <div>
    <rainbow-text text="About"></rainbow-text>
    <div class="flex flex-col md:flex-row">
      <img class="w-64 h-64 rounded-full border-8 border-red-900 p-1 mr-6 shadow-lg shadow-2xl" src="/images/pic.jpg" alt="selfie!" />
      <div class="w-full">
        <h2 class="text-2xl">History</h2>
        <p class="mb-2">Growing up in Adelaide, South Australia. Ben began his life as a normal child, with all the prospects of becoming a contributing member of society. He's trying his best and will continue to do so.</p>
        <h2 class="text-2xl">Now</h2>
        <p class="mb-2">He intends to be a successful web developer, making the internet a better place for all those who use it.</p>
        <h2 class="text-2xl">Development</h2>
        <p class="mb-2">Github contributions (<a href="https://github.com/benwinding">source</a>)</p>
        <img width="100%" style="margin-bottom: 10px;" src="https://ghchart.rshah.org/benwinding" alt="2016rshah's Github chart" />
        <h2 class="text-2xl">Writing</h2>
        <transition-group name="list" tag="p">
          <div class="mb-1" v-for="(blog) in blogPosts" :key="blog.title">
            <a class="flex flex-col" :href="blog.link">
              <p class="-mb-2 text-gray-600 text-xs">{{ blog.date }}</p>
              <p class="m-0 title">{{ blog.title }}</p>
            </a>
          </div>
        </transition-group>
      </div>
    </div>
  </div>
</template>

<script>
import RainbowText from "~/components/RainbowText";
import axios from "axios";

function getBlogPosts() {
  return axios
    .get("https://blog.benwinding.com/feed.json", {
      json: true,
      crossdomain: true
    })
    .then(function(response) {
      console.log(response);
      return response.data;
    });
}

export default {
  head: {
    meta: [
      { property: "og:image", content: "https://i.imgur.com/orqq5jB.jpg" },
      { property: "og:title", content: "About - Ben Winding" },
      {
        property: "og:description",
        content: "A web developer from Adelaide, South Australia."
      }
    ],
    title: "About"
  },
  components: {
    "rainbow-text": RainbowText
  },
  data() {
    return {
      blogPosts: []
    };
  },
  mounted() {
    this.$nextTick(() => {
      getBlogPosts()
        .then(data => {
          let posts = data.slice(0, 6).map(item => {
            return {
              title: item.title,
              date: new Date(item.date).toDateString(),
              link: "https://blog.benwinding.com/" + item.path
            };
          });
          posts.push({
            link: "https://blog.benwinding.com/",
            title: ". . . . . . . ."
          });
          let delayMs = 0;
          for (let post of posts) {
            delayMs += 300;
            setTimeout(() => {
              this.blogPosts.push(post);
            }, delayMs);
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    });
    // GitHubActivity.feed({
    //   username: "benwinding",
    //   selector: "#feed",
    //   limit: 20 // optional
    // });
  }
};
</script>

<style lang="scss" scoped>
.list-enter-active,
.list-leave-active {
  transition: all 1s;
}
.list-enter, .list-leave-to /* .list-leave-active below version 2.1.8 */ {
  opacity: 0;
  transform: translateY(30px);
}
</style>



