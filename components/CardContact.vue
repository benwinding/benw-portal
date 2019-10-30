<template>
  <div>
    <a :href="item.link" :title="item.title" class="social-icon">
      <component :is="item.icon" :style="{fill: item.iconColor}" width="50" height="50" />
    </a>
    <span>
      <a :href="item.link" :title="item.title">{{ item.linkText }}</a>
    </span>
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

export default {
  components: {
    email,
    github,
    twitter,
    devto,
    linkedin,
    instagram,
    phone,
    resume
  },
  props: {
    item: {}
  }
};
</script>

<style lang="scss" scoped >
.social-icon {
  vertical-align: middle;

  i {
    font-size: 86px;
  }

  img {
    width: 86px;
  }
}

a,
span {
  display: inline-block;
  width: 260px;
}

@media (max-width: 800px) {
  a,
  span {
    width: 110px;
    font-size: 0.8em;
  }

  .social-icon {
    i {
      font-size: 40px;
    }
    img {
      width: 40px;
    }
  }
}

.red {
  color: #ef5350;
}

.purple {
  color: #ab47bc;
}

.bright-blue {
  color: #651fff;
}

.dark-blue {
  color: #3949ab;
}

.maroon {
  color: rgb(128, 0, 0);
}
</style>