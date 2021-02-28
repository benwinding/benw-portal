<template>
  <div>
    <rainbow-text text="About"></rainbow-text>
    <div class="flex flex-col md:flex-row">
      <img
        class="w-64 h-64 rounded-full border-8 border-red-900 p-1 mr-6 shadow-lg shadow-2xl"
        src="/images/pic.jpg"
        alt="selfie!"
      />
      <div class="w-full">
        <h2 class="text-2xl">History</h2>
        <p class="mb-2">
          Growing up in Adelaide, South Australia. Ben began his life as a
          normal child, with all the prospects of becoming a contributing member
          of society. He's trying his best and will continue to do so.
        </p>
        <h2 class="text-2xl">Now</h2>
        <p class="mb-2">
          He intends to be a successful web developer, making the internet a
          better place for all those who use it.
        </p>
        <h2 class="text-2xl">Development</h2>
        <p class="mb-2">
          Github contributions (<a href="https://github.com/benwinding"
            >source</a
          >)
        </p>
        <img
          width="100%"
          style="margin-bottom: 10px;"
          src="https://ghchart.rshah.org/benwinding"
          alt="2016rshah's Github chart"
        />
        <h2 class="text-2xl">Writing</h2>
        <div v-if="!col1.blogPosts" class="flex flex-col items-center py-10">
          <div class="flex flex-col items-center">
            <h2 class="p-4 text-xl italic">Loading...</h2>
          </div>
        </div>
        <transition-group name="list" tag="p">
          <div class="mb-1" v-for="blog in blogPosts" :key="blog.title">
            <a class="flex flex-col" :href="blog.link">
              <p class="-mb-2 text-gray-600 text-xs">{{ blog.date }}</p>
              <p class="m-0 title">{{ blog.title }}</p>
            </a>
          </div>
        </transition-group>
        <h2 class="text-2xl">Photos</h2>

        <div v-if="!col1.length" class="flex flex-col items-center py-10">
          <div class="flex flex-col items-center">
            <h2 class="p-4 text-xl italic">Loading...</h2>
          </div>
        </div>

        <div class="flex mb-4">
          <div class="w-1/3">
            <transition-group name="list" tag="p">
              <InstaCard
                v-for="c in col1"
                :key="c.url"
                :url="c.url"
                :caption="c.caption"
                :urlPost="c.urlPost"
                :isVideo="c.isVideo"
              />
            </transition-group>
          </div>
          <div class="w-1/3">
            <transition-group name="list" tag="p">
              <InstaCard
                v-for="c in col2"
                :key="c.url"
                :url="c.url"
                :caption="c.caption"
                :urlPost="c.urlPost"
                :isVideo="c.isVideo"
              />
            </transition-group>
          </div>
          <div class="w-1/3">
            <transition-group name="list" tag="p">
              <InstaCard
                v-for="c in col3"
                :key="c.url"
                :url="c.url"
                :caption="c.caption"
                :urlPost="c.urlPost"
                :isVideo="c.isVideo"
              />
            </transition-group>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import RainbowText from "~/components/RainbowText";
import InstaCard from "~/components/InstaCard";
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
    "rainbow-text": RainbowText,
    InstaCard: InstaCard
  },
  data() {
    return {
      blogPosts: [],
      col1: [],
      col2: [],
      col3: []
    };
  },
  mounted() {
    this.$nextTick(async () => {
      try {
        await Promise.all([this.fetchWriting(), this.fetchInstagram()]);
      } catch (error) {
        console.log(error);
      }
    });
  },
  methods: {
    async fetchWriting() {
      const data = await getBlogPosts();
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
    },
    async fetchInstagram() {
      let ACCESS_TOKEN =
        "IGQVJXSm5ldG5KYklDUHU1VVNDdkZAnV0FDTU9MdzlzSjFTcXpKekExLWgzYmVsTDhGY1JuTzZAOd2ZAMUkFHTDNQd284VDAxamdtdGR6blFSR0YwaFhMSWU2eGNWUkRZAX3M4a1FtQzJMTU1pSDJZAR0hwMQZDZD";
      let urlProfile = `https://graph.instagram.com/me/media?access_token=${ACCESS_TOKEN}&fields=media_url,media_type,caption,permalink,thumbnail_url`;

      function getImageDesc(item) {
        const isVideo = item.media_type === "VIDEO";
        return {
          url: isVideo ? item.thumbnail_url : item.media_url,
          isVideo: isVideo,
          caption: item.caption,
          urlPost: item.permalink
        };
      }

      async function getData() {
        console.log("accessing instagram api:");
        const res = await axios.get(urlProfile);
        const json = res.data;
        console.log("accessing instagram api:", { res });
        const images = json.data.map(item => getImageDesc(item));
        for (let i = 0; i < images.length; i += 3) {
          this.col1 = [...this.col1, images[i + 0]].filter(v => !!v);
          this.col2 = [...this.col2, images[i + 1]].filter(v => !!v);
          this.col3 = [...this.col3, images[i + 2]].filter(v => !!v);
        }
        console.log({
          json,
          col1: this.col1,
          col2: this.col2,
          col3: this.col3
        });
      }
      return getData();
    }
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
