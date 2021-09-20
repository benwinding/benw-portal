<template>
  <canvas id="pt"></canvas>
</template>

<script>

let pts
if (process.client) {
  pts = require('pts')
}

var space;
var world;
var particleCount = 10;
var mouseBallSize = 20;

function setUpCanvas() {
  space = new pts.CanvasSpace("#pt_canvas");
  space.setup({ bgcolor: "#fff" });
  var form = space.getForm();
  space.add({
    start: (bound, space) => {
      // Create world and 100 random points
      world = new pts.World( space.innerBound, 1, 4000);
      world.damping = 0.9;
      let points = pts.Create.distributeRandom( space.innerBound, particleCount );
      // Create particles and hit them with a random impulse
      const screenDim = space.size.y > space.size.x ? space.size.x : space.size.y;
      for (let i=0, len=points.length; i<len; i++) {
        let p = new pts.Particle(points[i]);
        const p_radius = 3+Math.random()*screenDim/30;
        p.size(p_radius);
        let p_x = i+space.size.x/2;
        let p_y = i+space.size.y/2;
        p.position = new pts.Pt(p_x, p_y);
        p.previous = new pts.Pt(p_x, p_y);
        // p.lock = true;
        world.add( p );
      }
      getMouseParticle().lock = true; // lock it to move it by pointer later on
      getMouseParticle().size(mouseBallSize)
    },

    animate: (time, ftime) => {
      world.drawParticles( (p, i) => {
        let color = (i===0) ? "#FFFFDD" : ["#ff2d5d6F", "#42dc8e6F", "#2e43eb6F", "#ffe3596F"][i%4];
        form.fillOnly( color ).point( p, p.radius, "circle" ) 
      });
      world.update( ftime );
    },
  });

  function getMouseParticle() {
    return world.particle(0);
  }

  function setMouseBall(e) {
    if (!world)
      return;
    const mx = e.clientX;
    const my = e.clientY;
    getMouseParticle().position = new pts.Pt(mx, my);
  }

  function setBallsToMouseLocation(e, numBalls) {
    if (!world)
      return;
    const mx = e.clientX;
    const my = e.clientY;
    const randomNum = 1 + parseInt(Math.random() * (particleCount-1));
    let height = mouseBallSize;
    for (let i = 0; i < numBalls; i++) {
      let p_i = 1 + (i + randomNum) % (particleCount-1);
      let p = world.particle(p_i);      
      height += p.radius*2;
      let p_x = mx + i*3;
      let p_y = my + height;
      p.position = new pts.Pt(p_x, p_y);
      p.previous = new pts.Pt(p_x, p_y);
      p.lock = true;
      setTimeout(() => {
        p.lock = false;
      }, 50)
    }
  }

  document.body.addEventListener('click', (e) => {
    setBallsToMouseLocation(e, 4);
  })

  document.body.addEventListener('mousemove', setMouseBall) 
  space.bindMouse().bindTouch();
  space.play();
}

export default {
  mounted () {
    this.$nextTick(() => {
      setUpCanvas();
    })
  },
}
</script>

<style lang="css">
  body > div > canvas {
    position: fixed;
    top: 0;
    z-index: -1;
    width: 100%;
    height: 90vh;
    margin-left: 0em;
    border-bottom: 10px solid #DDD;
  }
</style>