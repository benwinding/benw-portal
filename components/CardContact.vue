<template>
  <div class="border-2 rounded p-2">
    <a :href="item.link" :title="item.title" class="p-0">
      <component :is="item.icon" :style="{fill: item.iconColor}" width="50" height="50" />
    </a>
    <a class="p-0 m-0" :href="item.link" :title="item.title">{{ item.linkText }}</a>
  </div>
</template>

<script>
import email from "~/assets/icons/material/email.svg";
import github from "~/assets/icons/simple/github.svg";
import twitter from "~/assets/icons/simple/twitter.svg";
import devto from "~/assets/icons/material/dev-to.svg";
import linkedin from "~/assets/icons/simple/linkedin.svg";
import instagram from "~/assets/icons/simple/instagram.svg";
import phone from "~/assets/icons/material/cellphone-basic.svg";
import resume from "~/assets/icons/custom/cv.svg";
import npm from "~/assets/icons/simple/npm.svg";
import leetcode from "~/assets/icons/misc/leetcode.svg";
import stackoverflow from "~/assets/icons/misc/stackoverflow-svgrepo-com.svg";

export default {
  components: {
    email,
    npm,
    github,
    twitter,
    devto,
    linkedin,
    instagram,
    phone,
    leetcode,
    resume,
    stackoverflow
  },
  props: {
    item: {}
  }
};
</script>
