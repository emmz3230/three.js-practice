import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/Addons.js";
import GUI from "lil-gui";
import { GLTFLoader } from "three/examples/jsm/Addons.js";
import vertexShader from "./shaders/holographic/vertex.glsl";
import fragmentShader from "./shaders/holographic/fragment.glsl";

// base

// debug
const gui = new GUI();

// canvas
const canvas = document.querySelector("canvas.webgl");

// scene
const scene = new THREE.Scene();

// loaders
const gltfLoader = new GLTFLoader();

// sizes
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener("resize", () => {
  // update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

// camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.set(7, 7, 7);
scene.add(camera);

// controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

// renderer
const rendererParameters = {};
rendererParameters.clearColor = "#1d1f2a";

const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  antialias: true,
});
renderer.setClearColor(rendererParameters.clearColor);
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

gui.addColor(rendererParameters, "clearColor").onChange(() => {
  renderer.setClearColor(rendererParameters.clearColor);
});

const materialParameters = {};
materialParameters.color = "#70c1ff";

gui.addColor(materialParameters, "color").onChange(() => {
  material.uniforms.uColor.value.set(materialParameters.color);
});

// material
const material = new THREE.ShaderMaterial({
  vertexShader: vertexShader,
  fragmentShader: fragmentShader,
  uniforms: {
    uTime: new THREE.Uniform(0),
    uColor: new THREE.Uniform(
      new THREE.Color(materialParameters.color)
    ),
  },
  transparent: true,
  side: THREE.DoubleSide,
  depthWrite: false,
  blending: THREE.AdditiveBlending,
});

// objects
// torus knot
const torusKnot = new THREE.Mesh(
  new THREE.TorusKnotGeometry(0.6, 0.25, 128, 32),
  material
);
torusKnot.position.x = 3;
scene.add(torusKnot);

// sphere
const sphere = new THREE.Mesh(new THREE.SphereGeometry(), material);
sphere.position.x = -3;
scene.add(sphere);

// suzuanne
let suzuanne = null;
gltfLoader.load("./suzanne.glb", (gltf) => {
  suzuanne = gltf.scene;
  suzuanne.traverse((child) => {
    if (child.isMesh) {
      child.material = material;
    }
  });
  scene.add(suzuanne);
});

// animate
const clock = new THREE.Clock();
const tick = () => {
  const elapsedTime = clock.getElapsedTime();
  //   update material
  material.uniforms.uTime.value = elapsedTime;

  // rotate objects
  if (suzuanne) {
    suzuanne.rotation.x = -elapsedTime * 0.1;
    suzuanne.rotation.y = elapsedTime * 0.2;
  }

  sphere.rotation.x = -elapsedTime * 0.1;
  sphere.rotation.y = elapsedTime * 0.2;

  torusKnot.rotation.x = -elapsedTime * 0.1;
  torusKnot.rotation.y = elapsedTime * 0.2;

  // update controls
  controls.update();

  // render
  renderer.render(scene, camera);

  // call tick again on the next frame
  window.requestAnimationFrame(tick);
};
tick();
