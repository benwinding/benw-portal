<template>
  <div class="flex flex-col items-center pt-16">
    <p class="text-5xl font-bold">Free Cookie!</p>
    <p>Click to eat</p>
    <div ref="container"></div>
  </div>
</template>

<script module>
export default {
  layout: "full-screen",
  head: {
    meta: [
      { property: "og:image", content: "https://i.imgur.com/orqq5jB.jpg" },
      { property: "og:title", content: "Free Cookie - Ben Winding" },
      {
        property: "og:description",
        content: "A web developer from Adelaide, South Australia."
      }
    ],
    link: [
      {
        rel: "stylesheet",
        href: "https://unpkg.com/tailwindcss@^2/dist/tailwind.min.css"
      },
      {
        rel: "stylesheet",
        href:
          "https://raw.githubusercontent.com/mrdoob/three.js/master/examples/main.css"
      }
    ],
    script: [
      {
        src: "https://cdn.jsdelivr.net/npm/three@0.121.1/build/three.js"
      },
      {
        src:
          "https://cdn.jsdelivr.net/npm/three@0.121.1/examples/js/controls/OrbitControls.js"
      },
      {
        src:
          "https://cdn.jsdelivr.net/npm/three@0.121.1/examples/js/loaders/RGBELoader.js"
      },
      {
        src: "https://cdn.jsdelivr.net/npm/three.interaction@0.2.3"
      },
      {
        src:
          "https://cdn.jsdelivr.net/gh/Wilt/ThreeCSG@c50034eb6d122bdd101666768dafa40913fa4f92/ThreeCSG.js"
      }
    ],
    title: "Free Cookie"
  },
  components: {},
  data() {
    return {
      eaten: false
    };
  },
  mounted() {
    let renderer, scene, camera, controls;
    const elRef = this.$refs.container;

    init();

    function init() {
      // info
      const info = elRef;

      // renderer
      renderer = new THREE.WebGLRenderer({ antialias: true });
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.setSize(window.innerWidth, window.innerHeight);
      document.body.appendChild(renderer.domElement);

      // scene
      scene = new THREE.Scene();

      // ambient light
      const ambient = new THREE.AmbientLight(0x404040);
      scene.add(ambient);

      // directional light
      const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
      directionalLight.position.set(-1, -0.5, 1);
      scene.add(directionalLight);

      // camera
      camera = new THREE.PerspectiveCamera(
        45,
        window.innerWidth / window.innerHeight,
        1,
        10000
      );
      camera.position.set(-50, 100, 50);
      camera.up.set(0, 0, 1);
      camera.lookAt(new THREE.Vector3(0, 0, 0));
      scene.add(camera);

      // controls
      controls = new THREE.OrbitControls(camera, renderer.domElement);
      new THREE.Interaction(renderer, scene, camera);

      const cutPosition = new THREE.Vector3(0, 10, 10);
      const [mesh] = cutMesh(makeInitialMesh(), cutPosition);
      scene.add(mesh);

      function onClickMesh(ev) {
        const positionVec3 = ev.intersects[0].point;
        console.log("mesh.click", positionVec3);
        const meshCurrent = ev.target;
        const [meshNew, isAllGone] = cutMesh(meshCurrent, positionVec3);
        if (isAllGone) {
          console.log("DONUT DONE!");
        }
        meshNew.on("click", onClickMesh);
        scene.add(meshNew);
        scene.remove(meshCurrent);
      }

      mesh.on("click", onClickMesh);

      animate();
    }

    // render
    function render() {
      renderer.render(scene, camera);
    }

    // animate
    function animate() {
      controls.update();
      requestAnimationFrame(animate);
      render();
    }

    function makeMaterial() {
      let material = new THREE.MeshPhongMaterial({
        color: 0xff0000,
        shading: THREE.FlatShading,
        side: THREE.FrontSide
      });
      return material;
    }

    function makeInitialMesh() {
      const geometry = new THREE.TorusGeometry(20, 10, 8, 20);
      const material = new THREE.MeshBasicMaterial({ color: 0xffff00 });
      const torus = new THREE.Mesh(geometry, makeMaterial());
      return torus;
    }

    function cutMesh(meshToBeCut, cutPosition) {
      // Box from non indexed buffer geometry
      const bsp1 = new ThreeBSP(meshToBeCut);

      // Box from indexed buffer geometry
      const indexedBoxGeometry = getIndexedBoxGeometry();
      indexedBoxGeometry.scale(10, 10, 10);
      const indexedBoxMesh = new THREE.Mesh(indexedBoxGeometry, makeMaterial());
      indexedBoxMesh.position.add(cutPosition);

      const bsp2 = new ThreeBSP(indexedBoxMesh);

      const resultBSP = bsp1.subtract(bsp2);

      const result = resultBSP.toMesh();
      result.material = new THREE.MeshPhongMaterial({ color: "#fff" });
      result.geometry.computeVertexNormals();

      result.geometry.computeBoundingBox();
      const bb = result.geometry.boundingBox;
      console.log("bounding box", { ...bb });
      const y = bb.max.y;
      const isAllGone = y === -Infinity || y === Infinity;
      return [result, isAllGone];
    }

    function getIndexedBoxGeometry() {
      const geometry = new THREE.CylinderGeometry(1.5, 1.5, 10, 10);
      geometry.rotateX(THREE.Math.degToRad(90));
      return geometry;
    }
  }
};
</script>
