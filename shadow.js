import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import GUI from "lil-gui";
import { RectAreaLightHelper } from "three/examples/jsm/helpers/RectAreaLightHelper.js";

const textureLoader = new THREE.TextureLoader();
const bakedshadow = textureLoader.load("./textures/bakedShadow.jpg");
const simpleShadow = textureLoader.load(
  "./textures/simpleShadow.jpg"
);

const gui = new GUI();

const canvas = document.querySelector("canvas.webgl");

//scene
const scene = new THREE.Scene();

const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
scene.add(ambientLight);
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.3);
gui.add(directionalLight, "intensity").min(-5).max(1).step(0.001);
gui.add(directionalLight.position, "x").min(-5).max(5).step(0.0001);
gui.add(directionalLight.position, "y").min(-5).max(5).step(0.0001);
gui.add(directionalLight.position, "z").min(-5).max(5).step(0.0001);

scene.add(directionalLight);
directionalLight.castShadow = true;
directionalLight.shadow.mapSize.width = 1024;
directionalLight.shadow.mapSize.height = 1024;
directionalLight.shadow.camera.top = 2;
directionalLight.shadow.camera.right = 2;
directionalLight.shadow.camera.bottom = -2;
directionalLight.shadow.camera.left = -2;
directionalLight.shadow.camera.near = 1;
directionalLight.shadow.camera.far = 6;

// const directionalLightCamerahelper = new THREE.CameraHelper(
//   directionalLight.shadow.camera
// );
// directionalLightCamerahelper.visible = false;
// scene.add(directionalLightCamerahelper);

const spotLight = new THREE.SpotLight(
  0xffffff,
  0.3,
  10,
  Math.PI * 0.3
);
spotLight.castShadow = true;
spotLight.position.set(0, 2, 2);
spotLight.shadow.mapSize.width = 1024;
spotLight.shadow.mapSize.height = 1024;
spotLight.shadow.mapSize.fov = 30;
spotLight.shadow.mapSize.near = 1;
spotLight.shadow.mapSize.far = 6;
scene.add(spotLight);
scene.add(spotLight.target);
// const spotLightCameraHelper = new THREE.CameraHelper(
//   spotLight.shadow.camera
// );
// scene.add(spotLightCameraHelper);

const pointLight = new THREE.PointLight(0xffffff, 0.7);
pointLight.castShadow = true;
pointLight.position.set(-1, 1, 0);
pointLight.shadow.mapSize.width = 1024;
pointLight.shadow.mapSize.height = 1024;
pointLight.shadow.mapSize.near = 0.1;
pointLight.shadow.mapSize.near = 1;
scene.add(pointLight);
pointLight.position.set(-1, 1, 0);
// const PointLightCameraHelper = new THREE.CameraHelper(
//   pointLight.shadow.camera
// );
// scene.add(PointLightCameraHelper);

// Geometry and object
const material = new THREE.MeshStandardMaterial();
material.roughness = 0.4;

const sphere = new THREE.Mesh(
  new THREE.SphereGeometry(0.5, 32, 32),
  material
);
sphere.castShadow = true;

const plane = new THREE.Mesh(new THREE.PlaneGeometry(5, 5), material);

plane.rotation.x = -Math.PI * 0.5;
plane.position.y = -0.65;

plane.receiveShadow = true;
scene.add(sphere, plane);

const sphereShadow = new THREE.Mesh(
  new THREE.PlaneGeometry(1.5, 1.5),
  new THREE.MeshBasicMaterial({
    color: 0xff0000,
    transparent: true,
    alphaMap: simpleShadow,
  })
);

sphereShadow.rotation.x = Math.PI * 0.5;
sphereShadow.position.y = plane.position.y + 0.1;

scene.add(sphereShadow);

//sizes
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  renderer.shadowMap.enabled = true;
});

//camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height
);
camera.position.x = 1;
camera.position.y = 1;
camera.position.z = 2;
scene.add(camera);

const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});

renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

renderer.shadowMap.enabled = false;
renderer.shadowMap.type = THREE.PCFShadowMap;

const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  // Update objects
  sphere.rotation.y = 0.1 * elapsedTime;
  sphere.rotation.x = 0.15 * elapsedTime;

  sphere.position.x = Math.cos(elapsedTime) * 1.5;
  sphere.position.z = Math.sin(elapsedTime) * 1.5;
  // sphere.position.y = Math.abs(Math.sin(elapsedTime * 3));

  sphereShadow.material.opacity = (1 - sphere.position.y) * 0.3;
  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};
tick();

console.log("javascript is amazing");
