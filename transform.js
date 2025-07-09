import * as THREE from "three";

// reason for
// using is because sometime
// some extension might bock if you use
// one of the queryselector name like (canvas)
//canvas
const canvas = document.querySelector("canvas.webgl");

//scene
const scene = new THREE.Scene();

const axesHelper = new THREE.AxesHelper(2);
scene.add(axesHelper);


//object
const group = new THREE.Group();
group.scale.y = 2;
group.rotation.y = 0.2;
scene.add(group);

const cube1 = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial({ color: 0xff0000  })
);
cube1.position.x = - 1.5
group.add(cube1);

const cube2 = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial({ color: 0xff0000  })
);
cube2.position.x = 0
group.add(cube2);

const cube3 = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial({ color: 0xff0000 })
);
cube3.position.x = 1.5
group.add(cube3);


//sizes
const sizes = {
  width: 800,
  height: 600,
};

///camera
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
