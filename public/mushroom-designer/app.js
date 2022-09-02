var scene = new THREE.Scene();
var renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setClearColor(new THREE.Color('rgb(0,0,0)'));
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

function AddLights() {
  function AddLight(colorStr, positionXYZ) {
    const color = new THREE.Color(colorStr);
    const light = new THREE.PointLight(color, 3);
    light.position.set(...positionXYZ)
    scene.add(light)
  }
  AddLight('rgb(128,128,255)', [0, 200, -100]);
  AddLight('rgb(0,127,127)', [-50, 0, -100]);
  const light = new THREE.AmbientLight('rgb(255, 255, 255)', 0.1);
  scene.add(light)
}

function CircleShape(radius, segments) {
  const pts1 = [], count = segments;
  for (let i = 0; i < count; i++) {
    const a = (2 * i / count) * Math.PI;
    pts1.push(new THREE.Vector2(Math.cos(a) * radius, Math.sin(a) * radius));
  }
  return new THREE.Shape(pts1);
}

function MakeStalkPoints() {
  return [
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [5, -5],
    [10, -5],
    [12, -8],
    [0, 0],
    [10, 5],
    [0, 3],
    [0, 0],
  ].map(([x, y], i) => new THREE.Vector3(x, i * 20, y));
}

function MakeCapPoints2(scaleX, scaleY) {
  return [
    [0, -400],
    [100, -300],
    [500, -300],
    [800, -200],
    [900, 100],
    [800, 400],
    [700, 400],
    [600, 100],
    [300, -100],
    [100, 0],
    [0, 0],
  ].map(([x, y]) => new THREE.Vector2(x * scaleX, -y * scaleY));
}

const stalkCurveBefore = new THREE.CatmullRomCurve3(MakeStalkPoints(), false);
const POINTSCOUNT = 100;

function DrawMushroom({ t, group, growthRate, rootPosition }) {
  const tt = t * growthRate;
  const pointsCount = Math.ceil(tt * POINTSCOUNT);
  if (pointsCount < 2) {
    return;
  }
  const stalkPointsTotal = stalkCurveBefore.getPoints(POINTSCOUNT);
  const stalkPoints = stalkPointsTotal.slice(0, pointsCount);
  const stalkCurve = new THREE.CatmullRomCurve3(stalkPoints, false);

  function CreateStalk() {
    const extrudeSettings1 = {
      steps: 80,
      bevelEnabled: false,
      extrudePath: stalkCurve,
    };
    const circW = 3 + Math.pow(tt, 2);
    const geometry = new THREE.ExtrudeGeometry(CircleShape(circW, 20), extrudeSettings1);
    const material = new THREE.MeshPhongMaterial({ color: 0xaeb0b6, wireframe: false, shininess: 1 });
    const mesh = new THREE.Mesh(geometry, material);
    return mesh;
  }

  function easeInOutExpo(x1) {
    const a = 2;
    const b = 0.4;
    const x = x1 - b;
    if (x < 0.5) return Math.pow(a, 20 * x - 10) / 2;
    else return (2 - Math.pow(a, -20 * x + 10)) / 2;
  }

  function CreateCap() {
    function GetCapW() {
      return 0.007 + 0.05 * easeInOutExpo(tt);
    }
    function GetCapH() {
      return 0.014 * Math.pow(2, tt);
    }
    const capW = GetCapW();
    const capH = GetCapH();
    const capPoints = MakeCapPoints2(capW, capH);
    const capCurve = new THREE.SplineCurve(capPoints);
    const geometry = new THREE.LatheGeometry(capCurve.getPoints(30), 30);
    const material = new THREE.MeshPhongMaterial({ color: 0xd4975f, wireframe: false, side: THREE.DoubleSide, shininess: 100 });
    const mesh = new THREE.Mesh(geometry, material);
    return mesh;
  }

  const stalkMesh = CreateStalk();
  const capMesh = CreateCap();

  function SetStalkPosition() {
    stalkMesh.position.set(rootPosition.x, rootPosition.y, rootPosition.z);
  }

  function SetCapPosition() {
    const pointLast = stalkPoints[stalkPoints.length - 1];
    capMesh.position.set(pointLast.x, pointLast.y, pointLast.z);

    const axis = new THREE.Vector3();
    const up = new THREE.Vector3(0, 1, 0);
    const tangent = stalkCurve.getTangentAt(1).normalize();
    axis.crossVectors(up, tangent).normalize();
    const radians = Math.acos(up.dot(tangent));
    capMesh.quaternion.setFromAxisAngle(axis, radians);
  }

  SetStalkPosition();
  SetCapPosition();
  stalkMesh.add(capMesh);
  group.add(stalkMesh);
}

// Add stuff
AddLights();

// Camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 3000);
camera.position.x = -200;
camera.position.y = 200;
camera.position.z = 0;

// Controls
const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.object.position.set(camera.position.x, camera.position.y, camera.position.z);

const group = new THREE.Group();
scene.add(group);

// Render Loop
var t = 0;
var render = function () {
  requestAnimationFrame(render);
  t += 0.01;
  if (t >= 1) {
    t = 0;
  }
  group.remove(...group.children);
  DrawMushroom({ t, group, growthRate: 1, rootPosition: new THREE.Vector3(0, 0, 0) });
  DrawMushroom({ t, group, growthRate: 0.5, rootPosition: new THREE.Vector3(30, 0, 10) });
  DrawMushroom({ t, group, growthRate: 0.4, rootPosition: new THREE.Vector3(-10, 0, 20) });
  DrawMushroom({ t, group, growthRate: 0.3, rootPosition: new THREE.Vector3(0, 0, -10) });
  DrawMushroom({ t: t < 0.5 ? t + 0.5 : t - 0.5, group, growthRate: 1, rootPosition: new THREE.Vector3(12, 0, 12) });

  camera.lookAt(new THREE.Vector3(0, 100, 0));
  renderer.clear();
  renderer.render(scene, camera);
};

render();