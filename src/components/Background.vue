<template>
  <canvas id="pt"></canvas>
</template>

<script>

import {Pt, CanvasSpace, World, Create, Particle} from "pts"

var space = new CanvasSpace("#pt_canvas");
space.setup({ bgcolor: "#fff" });
var world;

function setUpCanvas() {
  var form = space.getForm();
  space.add({
    start: (bound, space) => {
      // Create world and 100 random points
      world = new World( space.innerBound, 1, 600 );
      let pts = Create.distributeRandom( space.innerBound, 10 );
      // Create particles and hit them with a random impulse
      for (let i=0, len=pts.length; i<len; i++) {
        let p = new Particle( pts[i] ).size( (i===0) ? 30 : 3+Math.random()*space.size.x/50 );
        p.hit( 50, 25 );
        world.add( p );
      }
      world.particle( 0 ).lock = true; // lock it to move it by pointer later on
    },

    animate: (time, ftime) => {
      world.drawParticles( (p, i) => {
        let color = (i===0) ? "#FFFFDD" : ["#ff2d5d6F", "#42dc8e6F", "#2e43eb6F", "#ffe3596F"][i%4];
        form.fillOnly( color ).point( p, p.radius, "circle" ) 
      });
      world.update( ftime );
    },
  });

  document.body.addEventListener('mousemove', (e) => {
    const px = e.clientX;
    const py = e.clientY;
    world.particle( 0 ).position = new Pt(px, py);
  })
  
  space.bindMouse().bindTouch();
  space.play();
}

export default {
  mounted () {
    setUpCanvas();
  },
}
</script>

<style lang="scss">
  body > div > canvas {
    position: fixed;
    top: 0;
    z-index: -1;
    width: 100%;
    height: 100vh;
    margin-left: 0em;
  }
</style>