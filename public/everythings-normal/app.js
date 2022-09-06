var scene = new THREE.Scene();
var renderer = new THREE.WebGLRenderer({antialias:true});
renderer.setClearColor(new THREE.Color('rgb(255, 255, 255)'));
document.body.appendChild( renderer.domElement );

const lights = new THREE.Group();
scene.add(lights);
function MakeLights() {
  /**

    (0,0,-1) is mapped to (128,128,255)
    (1,1,0) is mapped to (255,255,128)
    (1,0,0) is mapped to (255,128,128)
    (0,1,0) is mapped to (128,255,128)
    (-1,0,0) is mapped to (0,128,128)
    (0,-1,0) is mapped to (128,0,128)
    (-1,-1,0) is mapped to (0,0,128)

  */
  function makeLight(directionXYZ, colorStr) {
    const color = new THREE.Color(colorStr)
    const lightTop = new THREE.DirectionalLight(color, 1);
    lightTop.position.set( ...directionXYZ );
    return lightTop;
  }

  const lights = [
    makeLight([0,0,-1], 'rgb(128,128,255)'),
    makeLight([1,1,0], 'rgb(255,255,128)'),
    makeLight([1,0,0], 'rgb(255,128,128)'),
    makeLight([0,1,0], 'rgb(128,255,128)'),
    makeLight([-1,0,0], 'rgb(0,128,128)'),
    makeLight([0,-1,0], 'rgb(128,0,128)'),
    makeLight([-1,-1,0], 'rgb(0,0,128)'),
  ]
  return lights;
}

function AddLights() {
  lights.add(...MakeLights());
}

const loader = new THREE.FontLoader();
function addText(text, opts, positionXYZ) {
  loader.load( 'Arial_Bold.json', function ( font ) {
    // use -> https://gero3.github.io/facetype.js/
    // Also choose restricted characters
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

var sceneTiny = new THREE.Scene();
var rendererTiny = new THREE.WebGLRenderer({antialias:true, alpha: true, canvas: document.getElementById('tinyCanvas')});
rendererTiny.setClearColor(0xffffff, 0.4);
rendererTiny.setSize( 100, 100 );

const cameraTiny = new THREE.PerspectiveCamera( 75, 1, 0.1, 1000 );
cameraTiny.position.z = 4;
cameraTiny.position.x = -2;
cameraTiny.position.y = 1;

function AddTinySphere() {
  const geometry = new THREE.SphereGeometry(2, 15, 15);
  const material = new THREE.MeshPhongMaterial({
    color: new THREE.Color('rgb(255,255,255)')
    // map: texture,
  });
  const mesh = new THREE.Mesh(geometry, material);
  mesh.position.set(0, 0, 0);
  sceneTiny.add(mesh);
  // Axes
  var arrowPos = new THREE.Vector3( 0,0,0 );
  const headLength = 0.8;
  const headWidth = 0.4;
  const length = 3.2;
  sceneTiny.add( new THREE.ArrowHelper( new THREE.Vector3( 1,0,0 ), arrowPos, length, 0x7F2020, headLength, headWidth ) );
  sceneTiny.add( new THREE.ArrowHelper( new THREE.Vector3( 0,1,0 ), arrowPos, length, 0x207F20, headLength, headWidth ) );
  sceneTiny.add( new THREE.ArrowHelper( new THREE.Vector3( 0,0,1 ), arrowPos, length, 0x20207F, headLength, headWidth ) );
}

function AddTinyLights() {
  sceneTiny.add(...MakeLights());
}

// Add stuff
AddLights();
addText('EVERYTHING\'S', {size: 0.4}, [-1.95,1,0])
addText('NORMAL', {size: 0.7}, [-2,0,0]);
AddWall();
AddTinySphere();
AddTinyLights();

// Camera
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
camera.position.z = 4;
camera.position.x = -2;
camera.position.y = 1;

// Size canvas
SetRenderSize();
function SetRenderSize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize( window.innerWidth, window.innerHeight );
}
window.addEventListener('resize', SetRenderSize);

// Controls
const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.target.set(0, 0, 0);
controls.update();

// How far you can orbit vertically, upper and lower limits.
// Range is 0 to Math.PI radians.
controls.minPolarAngle = THREE.MathUtils.degToRad(45);
controls.maxPolarAngle = THREE.MathUtils.degToRad(135);

// How far you can orbit horizontally, upper and lower limits.
// If set, must be a sub-interval of the interval [ - Math.PI, Math.PI ].
controls.minAzimuthAngle = THREE.MathUtils.degToRad(-45);
controls.maxAzimuthAngle = THREE.MathUtils.degToRad(45);

// Render Loop
let deg = 0;
let t = 0;
let now_last = performance.now();
const SPIN_RATE = 3 / 100;
const render = function () {
  requestAnimationFrame( render );
  // time calcs
  const now = performance.now();
  const delta = now_last - now;
  deg += 1 * delta * SPIN_RATE;
  now_last = now;
  if (deg >= 360) {
    deg = 0;
    t = 0;
  }
  const xRad = THREE.MathUtils.degToRad(deg);
  const yRad = THREE.MathUtils.degToRad(deg - Math.PI/2);
  const zRad = THREE.MathUtils.degToRad(deg + Math.PI/2);
  // Render main view
  lights.rotation.set(xRad, yRad, zRad);
  camera.lookAt(new THREE.Vector3(0, 0, 0));
  renderer.render(scene, camera);
  // Render tiny view
  sceneTiny.rotation.set(xRad, yRad, zRad);
  cameraTiny.position.set(camera.position.x, camera.position.y, camera.position.z);
  cameraTiny.lookAt(new THREE.Vector3(0, 0, 0));
  rendererTiny.render(sceneTiny, cameraTiny);
};

render();