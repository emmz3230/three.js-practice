import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/Addons.js";
import GUI from "lil-gui";
import vertexShader from "./shaders/test/vertex.glsl";
import fragmentShader from "./shaders/test/fragment.glsl";

// debug
const gui = new GUI();

// canvas
const canvas = document.querySelector("canvas.webgl");

// scene
const scene = new THREE.Scene();

// textures
const textureLoader = new THREE.TextureLoader();
const flagTexture = textureLoader.load("./textures/flag-french.jpg");

// test mesh
const geometry = new THREE.PlaneGeometry(1, 1, 32, 32);

const count = geometry.attributes.position.count;

const randoms = new Float32Array(count * 3);
for (let i = 0; i < count; i++) {
  randoms[i] = Math.random(); // x
}
geometry.setAttribute(
  "aRandom",
  new THREE.BufferAttribute(randoms, 1)
);

const material = new THREE.RawShaderMaterial({
  vertexShader: vertexShader,
  fragmentShader: fragmentShader,
  side: THREE.DoubleSide,
  uniforms: {
    uFrequency: {
      value: new THREE.Vector2(10, 5),
    },
    uTime: { value: 0 },
    uColor: {
      value: new THREE.Color("blue"),
    },
    uTexture: {
      value: flagTexture,
    },
  },
});

gui
  .add(material.uniforms.uFrequency.value, "x")
  .min(0)
  .max(20)
  .step(0.01)
  .name("Frequency X");
gui
  .add(material.uniforms.uFrequency.value, "y")
  .min(0)
  .max(20)
  .step(0.01)
  .name("Frequency Y");

// mesh
const mesh = new THREE.Mesh(geometry, material);
mesh.position.x = 1;
scene.add(mesh);

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
camera.position.set(0.25, -0.25, 1);
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

  // update material
  material.uniforms.uTime.value = elaspsedTime;

  //update controls
  controls.update();

  renderer.render(scene, camera);

  //call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
