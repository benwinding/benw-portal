<template>
  <div>
    <!-- <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/octicons/2.0.2/octicons.min.css" />
    <link
      rel="stylesheet"
      href="https://cdn.jsdelivr.net/gh/caseyscarborough/github-activity@0.1.5/src/github-activity.css"
    />
    <script
      type="text/javascript"
      src="//cdnjs.cloudflare.com/ajax/libs/mustache.js/0.7.2/mustache.min.js"
    ></script>
    <script
      type="text/javascript"
      src="https://cdn.jsdelivr.net/gh/caseyscarborough/github-activity@0.1.5/src/github-activity.js"
    ></script> -->
    <rainbow-text text="About"></rainbow-text>
    <div class="bio-pic">
      <img class="circular" src="/images/pic.jpg" alt="selfie!" />
      <div class="about-box">
        <h2>History</h2>
        <p>Growing up in Adelaide, South Australia. Ben began his life as a normal child, with all the prospects of becoming a contributing member of society. He's trying his best and will continue to do so.</p>
        <h2>Now</h2>
        <p>He intends to be a successful web developer, making the internet a better place for all those who use it.</p>
        <h2>Development</h2>
        <p>Github contributions (<a href="https://github.com/benwinding">source</a>)</p>
        <img width="100%" style="margin-bottom: 10px;" src="http://ghchart.rshah.org/benwinding" alt="2016rshah's Github chart" />
        <h2>Writing</h2>
        <transition-group name="list" tag="p">
          <div class="blog-item" v-for="(blog) in blogPosts" :key="blog.title">
            <a :href="blog.link">
              <span class="date">{{ blog.date }}</span>
              <span class="title">{{ blog.title }}</span>
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
p {
  font-size: 18px;
  background-color: #ffffffbb;
}

.bio-pic {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;

  @media (max-width: 800px) {
    flex-direction: column;
  }
}

.circular {
  margin-right: 40px;
  min-width: 250px;
  max-width: 251px;
  min-height: 250px;
  max-height: 251px;
  border-radius: 50%;
  float: left;
  margin-bottom: 20px;
  border: 15px solid #800000bb;

  @media (max-width: 800px) {
    margin-right: 0px;
  }
}

.circular:hover {
  -ms-transform: rotate3d(0, 1, 0, 360deg);
  -webkit-transform: rotate3d(0, 1, 0, 360deg);
  transform: rotate3d(0, 1, 0, 360deg);
  -webkit-transition-duration: 3s;
  -moz-transition-duration: 3s;
  transition-duration: 3s;
  border: 15px solid #800000bb;
}

.blog-item {
  margin-bottom: 4px;

  .date {
    vertical-align: middle;
    font-size: 0.5em;
    width: 50px;
    display: inline-block;
  }
  .title {
    vertical-align: middle;
    font-size: 1em;
  }
}

.list-enter-active,
.list-leave-active {
  transition: all 1s;
}
.list-enter, .list-leave-to /* .list-leave-active below version 2.1.8 */ {
  opacity: 0;
  transform: translateY(30px);
}

#feed {
  height: 300px;
  margin-bottom: 15px;
}
</style>



