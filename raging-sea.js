import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/Addons.js";
import GUI from "lil-gui";
import vertexShader from "./shaders/raging-sea/vertex.glsl";
import fragmentShader from "./shaders/raging-sea/fragment.glsl";

// debug
const gui = new GUI({ width: 340 });
const debugObject = {};

// canvas
const canvas = document.querySelector("canvas.webgl");

// scene
const scene = new THREE.Scene();

// textures
// const textureLoader = new THREE.TextureLoader();

// test mesh
const waterGeometry = new THREE.PlaneGeometry(2, 2, 512, 512);

debugObject.depthColor = "#186691";
debugObject.surfaceColor = "#8888ff";

const waterMaterial = new THREE.ShaderMaterial({
  vertexShader: vertexShader,
  fragmentShader: fragmentShader,
  uniforms: {
    uTime: { value: 0 },
    uBigWavesElevation: { values: 0.2 },
    uBigWavesFrequency: { value: new THREE.Vector2(4, 1.5) },
    uBigWaveSpeed: { value: 0.5 },

    uSmallElevation: { value: 0.15 },
    uSmallWavesFrequency: { value: 3.0 },
    uSmallWavesSpeed: { value: 0.2 },
    uSmallWavesIterations: { value: 4 },

    uDepthColor: { value: new THREE.Color(debugObject.depthColor) },
    uSurfaceColor: {
      value: new THREE.Color(debugObject.surfaceColor),
    },
    uColorOffset: { value: 0.25 },
    uColorMultiplier: { value: 2 },
  },
});

// gui
//   .add(waterMaterial.uniforms.uBigWavesElevation, "value")
//   .min(0)
//   .max(1)
//   .step(0.001)
//   .name("uBigWavesElevation");

// mesh
const water = new THREE.Mesh(waterGeometry, waterMaterial);
water.rotation.x = -Math.PI * 0.5;
scene.add(water);

const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};
window.addEventListener("resize", () => {
  // updates sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
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
camera.position.set(1, 1, 1);
scene.add(camera);

// controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// animate
const clock = new THREE.Clock();

const tick = () => {
  const elaspsedTime = clock.getElapsedTime();

  // update water
  waterMaterial.uniforms.uTime.value = elaspsedTime;

  //update controls
  controls.update();

  renderer.render(scene, camera);

  //call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
