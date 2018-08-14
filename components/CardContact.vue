<template>
  <div>
    <a :href="item.link" :title="item.title" class="social-icon">
      <i v-if="item.iclass" :class="item.iclass" aria-hidden="true"></i>
      <img v-if="item.imgSrc" :src="item.imgSrc" />
    </a>
    <span>
      <a :href="item.link" :title="item.title" >
        {{ item.linkText }}
      </a>          
    </span>
  </div>
</template>

<script>
  export default {
    props: {
      item: {}
    }
  }
  
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

a, span {
  display: inline-block;
  width: 260px;
}

@media(max-width: 800px) {
  a, span {
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