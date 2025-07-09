import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/Addons.js';
import GUI from 'lil-gui'
import {RGBELoader} from 'three/examples/jsm/loaders/RGBELoader.js'
 

const gui = new GUI()

const canvas = document.querySelector("canvas.webgl");

const scene = new THREE.Scene();

const textureLoader = new THREE.TextureLoader();

const doorColorTexture = textureLoader.load(
  "./textures/door/color.jpg"
);
const doorAlphaTexture = textureLoader.load(
  "./textures/door/alpha.jpg"
);
const doorAmbientOcclusionTexture = textureLoader.load(
  "./textures/door/ambientOcclusion.jpg"
);
const doorHeightTexture = textureLoader.load(
  "./textures/door/height.jpg"
);
const doorNormalTexture = textureLoader.load(
  "./textures/door/normal.jpg"
);
const doorMetalnessTexture = textureLoader.load(
  "./textures/door/metalness.jpg"
);
const doorRoughnessTexture = textureLoader.load(
  "./textures/door/roughness.jpg"
);
const matcapTexture = textureLoader.load("./textures/matcaps/1.jpg");
const gradientTexture = textureLoader.load(
  "./textures/gradient/5.jpg"
);

doorColorTexture.colorSpace = THREE.SRGBColorSpace;
matcapTexture.colorSpace = THREE.SRGBColorSpace;

//scene
// const material = new THREE.MeshBasicMaterial();
// material.map = doorColorTexture;
// material.color = new THREE.Color(0xff0000);
// material.wireframe = true;
// material.transparent = true;
// material.opacity = 0.5;
// material.alphaMap = doorAlphaTexture;
// material.side = THREE.DoubleSide;

// const material = new THREE.MeshBasicMaterial();
// material.matcap = gradientTexture;
// material.flatShading = true;

// const material = new THREE.MeshMatcapMaterial();
// material.matcap = matcapTexture;

// const material  = new THREE.MeshDepthMaterial()

// const material = new THREE.MeshLambertMaterial()

// const material = new THREE.MeshPhongMaterial()
// material.shiness = 100
// material.specular = new THREE.Color(0x1188ff)

// const material = new THREE.MeshToonMaterial()
// gradTexientture.minFilter = THREE.NearestFilter
// gradientTexture.magFilter = THREE.NearestFilter
// gradientTexture.generateMipmaps = false
// material.gradientMap = gradientTexture

// const material = new THREE.MeshStandardMaterial()
//  material.metalness = 1
//  material.roughness = 1
//  material.Map = doorColorTexture
//  material.aoMap = doorAmbientOcclusionTexture
//  material.aoMapIntensity = 1
//  material.displacementMap = doorHeightTexture
//  material.displacementScale = 0.1
//  material.metalnessMap = doorMetalnessTexture
//  material.roughnessMap = doorRoughnessTexture
//  material.normalMap = doorNormalTexture
//  material.normalScale.set(0.5,0.5)
//  material.transparent = true
//  material.alphaMap = doorAlphaTexture


const material = new THREE.MeshPhysicalMaterial()
 material.metalness = 1
 material.roughness = 1
//  material.Map = doorColorTexture
//  material.aoMap = doorAmbientOcclusionTexture
//  material.aoMapIntensity = 1
//  material.displacementMap = doorHeightTexture
//  material.displacementScale = 0.1
//  material.metalnessMap = doorMetalnessTexture
//  material.roughnessMap = doorRoughnessTexture
//  material.normalMap = doorNormalTexture
//  material.normalScale.set(0.5,0.5)
//  material.transparent = true
//  material.alphaMap = doorAlphaTexture
 
//  material.wireframe = true

gui.add(material, 'metalness').min(0).max(1).step(0.0001)
gui.add(material, 'roughness').min(0).max(1).step(0.0001)


// material.clearcoat = 1
//  material.clearcoatRoughness = 0

//  gui.add(material, 'clearcoat').min(0).max(1).step(0.0001)
// gui.add(material, 'clearcoatroughness').min(0).max(1).step(0.0001)

//  material.sheen = 1
//  material.sheenRoughness = 0
//  material.sheenColor.set(1,1,1)

// gui.add(material, 'sheen').min(0).max(1).step(0.0001)
// gui.add(material, 'sheenRoughness').min(0).max(1).step(0.0001)
// gui.add(material, 'sheenColor')

//  material.iridescence = 1
//  material.iridescenceIOR = 0
//  material.iridescenceThicknessRange= [100,800]

// gui.add(material, 'iridescence').min(0).max(1).step(0.0001)
// gui.add(material, 'iridescenceIOR').min(1).max(2.333).step(0.0001)
// gui.add(material.iridescenceThicknessRange,'0').min(1).max(1000).step(1)
// gui.add(material.iridescenceThicknessRange,'1').min(1).max(1000).step(1)


//  material.transmission = 1
//  material.ior = 1.5
//  material.thickness= 0.5

// gui.add(material, 'transmission').min(0).max(1).step(0.0001)
// gui.add(material, 'ior').min(1).max(10).step(0.0001)
// gui.add(material, 'thickness',).min(0).max(1).step(0.0001)



const sphere = new THREE.Mesh(
  new THREE.SphereGeometry(0.5, 64, 64),
  material
);
sphere.position.x = -1.5;

const plane = new THREE.Mesh(new THREE.PlaneGeometry(1, 1,100,100), material);
const torus = new THREE.Mesh(
  new THREE.TorusGeometry(0.3, 0.2, 64,126),
  material
);

torus.position.x = 1.5;

// const mesh = new THREE.Mesh(geometry, material);
scene.add(sphere, plane, torus);

const ambientlight = new THREE.AmbientLight(0xffffff,1)
scene.add(ambientlight)

const pointLight = new THREE.PointLight(0xffffff,30)
pointLight.position.x = 2
pointLight.position.y = 3
pointLight.position.z = 4
scene.add(pointLight)

 const rgbeLoader = new RGBELoader()
 rgbeLoader.load('./textures/environmentMap/2k.hdr', (environmentMap) => {
  environmentMap.mapping = THREE.EquirectangularReflectionMapping

  scene.background = environmentMap
  scene.environment = environmentMap
 })


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
camera.position.z = 3;
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

  sphere.rotation.y = 0.1 * elapsedTime;
  plane.rotation.y = 0.1 * elapsedTime;
  torus.rotation.y = 0.1 * elapsedTime;

  sphere.rotation.x = 0.1 * elapsedTime;
  plane.rotation.x = 0.1 * elapsedTime;
  torus.rotation.x = 0.1 * elapsedTime;

  //update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();

console.log("javascript is amazing");
