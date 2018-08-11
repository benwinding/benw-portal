<template>
  <div>
    <rainbow-text text="About"></rainbow-text>
    <div class="bio-pic">
      <img class="circular" src="../assets/pic.jpg" alt="selfie!">
      <div class="about-box"><h2>History</h2>
      <p>Growing up in Adelaide, South Australia. Ben began his life as a normal child, with all the prospects of becoming a contributing member of society. He's trying his best and will continue to do so.</p>
      <h2>Now</h2>
      <p>He intends to be a successful web developer, making the internet a better place for all those who use it.</p>
      </div>
    </div>
  </div>
</template>

<script>
import RainbowText from "@/components/RainbowText"

export default {
  components: {
    'rainbow-text': RainbowText,
  } 
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
</style>



