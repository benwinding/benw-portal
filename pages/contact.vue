<template>
  <div>
    <h1>CONTACT</h1>
    <section class="card-container">
      <transition-group name="list" tag="div">
        <section v-for="(item) in social" :key="item.link" class="card">
          <card-contact :item='item' />
        </section>
      </transition-group>
    </section>
  </div>
</template>

<script>

import CardContact from '~/components/CardContact'

const social = [
  {
    link: "mailto:hello@benwinding.com", 
    linkText: "hello@benwinding.com", 
    title: "Email!",
    iclass: "fa fa-envelope red",
  },
  {
    link: "https://github.com/benwinding", 
    linkText: "github.com/benwinding", 
    title: "Github",
    iclass: "fab fa-github purple",
  },
  {
    link: "https://twitter.com/benwinding", 
    linkText: "twitter.com/benwinding", 
    title: "Twitter",
    iclass: "fab fa-twitter blue",
  },
  {
    link: "https://dev.to/benwinding", 
    linkText: "dev.to/benwinding", 
    title: "Dev.to",
    imgSrc: "https://d2fltix0v2e0sb.cloudfront.net/dev-badge.svg", 
  },
  {
    link: "https://linkedin.com/in/benwinding", 
    linkText: "linkedin.com/in/benwinding", 
    title: "LinkedIn",
    iclass: "fab fa-linkedin dark-blue",
  },
  {
    link: "https://instagram.com/benwinding", 
    linkText: "instagram.com/benwinding", 
    title: "Instagram",
    iclass: "fab fa-instagram purple",
  },
  {
    link: "tel: 0423-225-163", 
    linkText: "Call Me: 0423-225-163", 
    title: "Phone",
    iclass: "fa fa-phone maroon",
  },
]

export default {
  head: {
    meta: [
      { property:"og:image", content:"https://i.imgur.com/orqq5jB.jpg" },
      { property:"og:title", content:"Contact - Ben Winding" },
      { property:"og:description", content:"A web developer from Adelaide, South Australia." },
    ],
    title: 'Contact'
  },
  components: {
    'card-contact': CardContact
  },
  data() {
    return {
      social: []
    }    
  },
  mounted() {
    this.$nextTick(() => {
      let delayMs = 0;
      for (const item of social) {
        delayMs += 200;
        setTimeout(() => {
          this.social.push(item)
        }, delayMs);
      }
    })
  }
}
</script>

<style lang="scss" scoped>

.card-container > div{
  display: flex;
  flex-wrap: wrap;
  justify-content: center;

  .card {
    padding: 20px;
    margin: 10px;
    width: 280px;
    position:relative;

    @media(max-width: 800px) {
      padding: 10px;
      margin: 5px;
      width: 130px;      
    }

    :hover {
      opacity: .5;
    }
  }

  .list-enter-active, .list-leave-active {
    transition: all 1s;
  }
  .list-enter, .list-leave-to {
    opacity: 0;
    transform: translateY(230%);
  }
}

</style>

