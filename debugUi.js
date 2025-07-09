import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/Addons.js";
import gsap from "gsap";
import GUI from "lil-gui";

const gui = new GUI({
  width: 300,
  title: "Nice debug UI",
  closeFolder: false,
});

window.addEventListener("keydown", (event) => {
  if (event.key == "h") gui.show(gui._hidden);
});
const debugObject = {};

const canvas = document.querySelector("canvas.webgl");

const scene = new THREE.Scene();

//scene

debugObject.color = "#a778d8";
const geometry = new THREE.BoxGeometry(1, 1, 1, 2, 2, 2);
const material = new THREE.MeshBasicMaterial({
  color: debugObject.color,
});
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

const cubeTweaks = gui.addFolder("Awesome cube");

cubeTweaks
  .add(mesh.position, "y")
  .min(-3)
  .max(3)
  .step(0.01)
  .name("elevation");

cubeTweaks.add(mesh, "visible");

cubeTweaks.add(material, "wireframe");

cubeTweaks.addColor(debugObject, "color").onChange(() => {
  material.color.set(debugObject.color);
});
debugObject.spin = () => {
  gsap.to(mesh.rotation, {
    y: mesh.rotation.y + Math.PI * 2,
  });
};
cubeTweaks.add(debugObject, "spin");

debugObject.subdivision = 2;

cubeTweaks
  .add(debugObject, "subdivision")
  .min(1)
  .max(20)
  .step(1)
  .onFinishChange(() => {
    mesh.geometry.dispose();
    mesh.geometry = new THREE.BoxGeometry(
      1,
      1,
      1,
      debugObject.subdivision,
      debugObject,
      debugObject.subdivision
    );
  });

const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};
//sizes

window.addEventListener("resize", () => {
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.x = 1;
camera.position.y = 1;
camera.position.z = 2;

scene.add(camera);

// controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});

renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  //update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();

console.log("javascript is amazing");
