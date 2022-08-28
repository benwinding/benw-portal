var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
var renderer = new THREE.WebGLRenderer({antialias:true});
renderer.setClearColor(new THREE.Color('rgb(255, 255, 255)'));
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

/**

  X: -1 to +1 :  Red:     0 to 255
  Y: -1 to +1 :  Green:   0 to 255
  Z:  0 to -1 :  Blue:  128 to 255

  (0,0,-1) is mapped to (128,128,255)
  (1,1,0) is mapped to (255,255,128)
  (1,0,0) is mapped to (255,128,128)
  (0,1,0) is mapped to (128,255,128)
  (-1,0,0) is mapped to (0,128,128)
  (0,-1,0) is mapped to (128,0,128)
  (-1,-1,0) is mapped to (0,0,128)

*/
const lights = new THREE.Group();
scene.add(lights);
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

var cube;
function addGeometry(geometry, shiftX) {
  var material = new THREE.MeshPhongMaterial( { color: '#ddd' } );
  cube = new THREE.Mesh( geometry, material );
  scene.add( cube );
  return cube;
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
    const mesh = addGeometry(geometry);
    mesh.position.set(...positionXYZ);
  });
}

addText('EVERYTHING\'S', {size: 0.4}, [-1.95,1,0])
addText('NORMAL', {size: 0.7}, [-2,0,0])

// Controls
const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.target.set(0, 0, 0);
controls.update();

camera.position.z = 4;
camera.position.x = -2;
camera.position.y = 1;

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