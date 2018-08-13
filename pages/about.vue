<template>
  <div>
    <rainbow-text text="About"></rainbow-text>
    <div class="bio-pic">
      <img class="circular" src="/images/pic.jpg" alt="selfie!">
      <div class="about-box">
        <h2>History</h2>
        <p>Growing up in Adelaide, South Australia. Ben began his life as a normal child, with all the prospects of becoming a contributing member of society. He's trying his best and will continue to do so.</p>
        <h2>Now</h2>
        <p>He intends to be a successful web developer, making the internet a better place for all those who use it.</p>
        <h2>Writing</h2>
        <div class="blog-item" v-for="(blog) in blogPosts" :key="blog">
          <a class="date" :href="blog.link">{{ blog.date }}</a>
          <a class="title" :href="blog.link">{{ blog.title }}</a>
        </div>
        <div class="blog-item">
          <a class="date"></a>
          <a class="title" href="https://blog.benwinding.com">. . . . . . </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import RainbowText from "~/components/RainbowText"
import axios from "axios"

function getBlogPosts() {
  return axios.get('https://blog.benwinding.com/feed', {
    json: true,
    crossdomain: true,
  })
  .then(function (response) {
    console.log(response);
    return response.data;
  })
}

export default {
  head: {
    meta: [
      { property:"og:image", content:"https://i.imgur.com/orqq5jB.jpg" },
      { property:"og:title", content:"About - Ben Winding" },
      { property:"og:description", content:"A web developer from Adelaide, South Australia." },
    ],    
    title: 'About'
  },
  components: {
    'rainbow-text': RainbowText,
  },
  data() {
    return {
      blogPosts: []
    }
  },
  mounted () {
    this.$nextTick(() => {
      getBlogPosts()
      .then((data) => {
        this.blogPosts = data.slice(0,6).map((item) => { 
          return {
            title: item.title,
            date: new Date(item.date).toDateString(),
            link: 'https://blog.benwinding.com/' + item.path
          }
        });
      })
      .catch(function (error) {
        console.log(error);
      });
    })
  },
}
</script>

<style lang="scss" scoped>
p {
  font-size: 18px;
  background-color: #FFFFFFBB;
}

.bio-pic {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  align-items: center;

  @media (max-width: 800px) {
    flex-direction: column;
  }
}

.circular {
  -ms-flex-item-align: center;
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
  -ms-transform: rotate3d(0,1,0,360deg); 
  -webkit-transform: rotate3d(0,1,0,360deg);
  transform: rotate3d(0,1,0,360deg);
  -webkit-transition-duration: 3s;
  -moz-transition-duration: 3s;
  transition-duration: 3s;
  border: 15px solid #800000bb;
}

.blog-item {
  .date {
    font-size: 0.5em;
    width: 70px;
    display: inline-block;
  }
}
</style>



