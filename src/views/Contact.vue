<template>
  <div>
    <rainbow-text text="Contact"></rainbow-text>
    <section class="card-container">
      <section v-for="(item) in social" :key="item.link" class="card">
        <a :href="item.link" :title="item.title" class="social-icon">
          <i v-if="item.iclass" :class="item.iclass" aria-hidden="true"></i>
          <img v-if="item.imgSrc" :src="item.imgSrc" />
        </a>
        <span>
          <a :href="item.link" :title="item.title" class="social-link">
            {{ item.link }}
          </a>          
        </span>
      </section>
    </section>
  </div>
</template>

<script>
import RainbowText from "@/components/RainbowText"

export default {
  components: {
    'rainbow-text': RainbowText,
  },
  data() {
    return {
      social: [
        {
          link: "hello@benwinding.com", 
          title: "Email!",
          iclass: "fa fa-envelope red",
        },
        {
          link: "https://github.com/benwinding", 
          title: "Github",
          iclass: "fab fa-github purple",
        },
        {
          link: "https://twitter.com/benwinding", 
          title: "Twitter",
          iclass: "fab fa-twitter blue",
        },
        {
          link: "https://dev.to/benwinding", 
          title: "Dev.to",
          imgSrc: "https://d2fltix0v2e0sb.cloudfront.net/dev-badge.svg", 
        },
        {
          link: "https://linkedin.com/in/benwinding", 
          title: "LinkedIn",
          iclass: "fab fa-linkedin dark-blue",
        },
        {
          link: "https://instagram.com/benwinding", 
          title: "Instagram",
          iclass: "fab fa-instagram purple",
        },
        {
          link: "tel: 0423-225-163", 
          title: "Phone",
          iclass: "fa fa-phone maroon",
        },
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.card-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;

  .card {
    padding: 20px;
    margin: 10px;
    width: 300px;
    position:relative;

    :hover {
      opacity: .5;
    }

    a, span {
      display: inline-block;
      width: 260px;
    }
  }
}

.social-icon {
  vertical-align: middle;
  
  i {
    font-size: 86px;
  }

  img {
    width: 86px;
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

.blue {
  color: #2196f3;
}

.teal {
  color: #00bcd4;
}

.green {
  color: #4caf50;
}

.yellow {
  color: #ffc107;
}

.pink {
  color: #ff80ab;
}

.maroon {
  color: rgb(128, 0, 0);
}

</style>

