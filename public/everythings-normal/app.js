var scene = new THREE.Scene();
var renderer = new THREE.WebGLRenderer({antialias:true});
renderer.setClearColor(new THREE.Color('rgb(255, 255, 255)'));
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const lights = new THREE.Group();
scene.add(lights);
function AddLights() {
  /**

    (0,0,-1) is mapped to (128,128,255)
    (1,1,0) is mapped to (255,255,128)
    (1,0,0) is mapped to (255,128,128)
    (0,1,0) is mapped to (128,255,128)
    (-1,0,0) is mapped to (0,128,128)
    (0,-1,0) is mapped to (128,0,128)
    (-1,-1,0) is mapped to (0,0,128)

  */
  function addLight(directionXYZ, colorStr) {
    const color = new THREE.Color(colorStr)
    const lightTop = new THREE.DirectionalLight(color, 1);
    lightTop.position.set( ...directionXYZ );
    lights.add(lightTop);
  }

  addLight([0,0,-1], 'rgb(128,128,255)');
  addLight([1,1,0], 'rgb(255,255,128)');
  addLight([1,0,0], 'rgb(255,128,128)');
  addLight([0,1,0], 'rgb(128,255,128)');
  addLight([-1,0,0], 'rgb(0,128,128)');
  addLight([0,-1,0], 'rgb(128,0,128)');
  addLight([-1,-1,0], 'rgb(0,0,128)');
}

const loader = new THREE.FontLoader();
function addText(text, opts, positionXYZ) {
  loader.load( 'Arial_Bold.json', function ( font ) {
    // use -> https://gero3.github.io/facetype.js/
    const geometry = new THREE.TextGeometry( text, {
      font: font,
      size: 0.7,
      height: 0.4,
      curveSegments: 20,
      bevelEnabled: true,
      bevelThickness: 0.03,
      bevelSize: 0.03,
      bevelOffset: 0,
      bevelSegments: 10,
      ...opts
    });
    const material = new THREE.MeshPhongMaterial( { color: '#ddd' } );
    const mesh = new THREE.Mesh( geometry, material );
    mesh.position.set(...positionXYZ);
    scene.add(mesh);
  });
}

function AddWall() {
  const geometry = new THREE.BoxGeometry(15, 10, 0.1);
  const textureLoader = new THREE.TextureLoader()
  textureLoader.load('bricks-normal-map.jpg', (texture) => {
    texture.repeat.set(6,6)
    texture.wrapS = true;
    texture.wrapT = true;
    const material = new THREE.MeshPhongMaterial( { 
      bumpMap: texture,
    } );
    const mesh = new THREE.Mesh( geometry, material );
    mesh.position.set(0, 0 , 0);
    scene.add(mesh);
  });
}

// Add stuff
AddLights();
addText('EVERYTHING\'S', {size: 0.4}, [-1.95,1,0])
addText('NORMAL', {size: 0.7}, [-2,0,0]);
AddWall();

// Camera
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
camera.position.z = 4;
camera.position.x = -2;
camera.position.y = 1;

// Controls
const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.target.set(0, 0, 0);
controls.update();

// Render Loop
var deg = 0;
var render = function () {
  requestAnimationFrame( render );
  deg += 0.02;
  if (deg >= 2 * Math.PI) {
    deg = 0;
  }
  lights.rotation.set(deg, deg - Math.PI/2, deg + Math.PI/2);
  camera.lookAt(new THREE.Vector3(0, 0, 0));
  renderer.render(scene, camera);
};

render();