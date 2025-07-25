import * as THREE from "three";

// reason for
// using is because sometime
// some extension might bock if you use
// one of the queryselector name like (canvas)
//canvas
const canvas = document.querySelector("canvas.webgl");

//scene
const scene = new THREE.Scene();

// Geometry and object
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);
//sizes
const sizes = {
  width: 800,
  height: 600,
};

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
renderer.render(scene, camera);

console.log("javascript is amazing");
