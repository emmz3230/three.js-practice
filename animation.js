import * as THREE from "three";
import gsap from "gsap";
// reason for
// using is because sometime
// some extension might bock if you use
// one of the queryselector name like (canvas)
//canvas
const canvas = document.querySelector("canvas.webgl");

//scene
const scene = new THREE.Scene();

//object
const group = new THREE.Group();
group.scale.y = 2;
group.rotation.y = 1;
scene.add(group);

const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

const axesHelper = new THREE.AxesHelper();
scene.add(axesHelper);

//sizes
const sizes = {
  width: 800,
  height: 600,
};

//or
// const width = 800;
// const height = 600;

//camera

//or
// const width = 800;
// const height = 600;

//camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height
);
camera.position.z = 3;

scene.add(camera);

const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});

renderer.setSize(sizes.width, sizes.height);

gsap.to(mesh.position, { duration: 1, delay: 1, x: 2 });

const tick = () => {
  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();

// renderer.render(scene, camera);

console.log("javascript is amazing");

renderer.setSize(sizes.width, sizes.height);
renderer.setSize(scene, camera);

console.log("javascript is amazing");
