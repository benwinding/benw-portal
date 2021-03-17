<template>
  <div>
    <rainbow-text text="Contact"></rainbow-text>
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
      <section v-for="(item) in social" :key="item.link">
        <card-contact :item='item' />
      </section>
    </div>
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
    link: "https://www.npmjs.com/~benwinding", 
    linkText: "npmjs.com/~benwinding", 
    title: "NPM Profile",
    icon: "npm",
    iconColor: 'red'
  },
  {
    link: "https://stackoverflow.com/users/2419584/ben-winding", 
    linkText: "stackoverflow", 
    title: "Stack Overflow",
    icon: "stackoverflow",
    iconColor: 'grey'
  },
  {
    link: "https://leetcode.com/ben58/", 
    linkText: "leetcode.com/ben58", 
    title: "Leetcode Profile",
    icon: "leetcode",
    iconColor: 'black'
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
      for (const item of social) {
        this.social.push(item)
      }
    })
  }
}
</script>
