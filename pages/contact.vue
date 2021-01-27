<template>
  <div>
    <rainbow-text text="Contact"></rainbow-text>
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

import RainbowText from "~/components/RainbowText"
import CardContact from '~/components/CardContact'

const social = [
  {
    link: "mailto:hello@benwinding.com", 
    linkText: "hello@benwinding.com", 
    title: "Email!",
    icon: "email",
    iconColor: '#800000'
  },
  {
    link: "https://github.com/benwinding", 
    linkText: "github.com/benwinding", 
    title: "Github",
    icon: "github",
    iconColor: 'black'
  },
  {
    link: "https://twitter.com/benwinding", 
    linkText: "twitter.com/benwinding", 
    title: "Twitter",
    icon: "twitter",
    iconColor: '#1DA1F2'
  },
  {
    link: "https://dev.to/benwinding", 
    linkText: "dev.to/benwinding", 
    title: "Dev.to",
    icon: "devto", 
    iconColor: 'black'
  },
  {
    link: "https://linkedin.com/in/benwinding", 
    linkText: "linkedin.com/in/benwinding", 
    title: "LinkedIn",
    icon: "linkedin",
    iconColor: '#0073b1'
  },
  {
    link: "https://instagram.com/benwinding", 
    linkText: "instagram.com/benwinding", 
    title: "Instagram",
    icon: "instagram",
    iconColor: 'purple'
  },
  {
    link: "tel: 0423-225-163", 
    linkText: "Call Me: 0423-225-163", 
    title: "Phone",
    icon: "phone",
    iconColor: 'darkgreen'
  },
  {
    link: "/Ben-Winding-2021-Resume.pdf", 
    linkText: "Resume - Ben Winding", 
    title: "Resume",
    icon: "resume",
    iconColor: 'orange'
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
    'rainbow-text': RainbowText,
    'card-contact': CardContact,
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
    transform: translateY(40%);
  }
}

</style>

