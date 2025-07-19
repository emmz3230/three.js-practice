import * as THREE from "three";
import Experience from "./Experience";

export default class world {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.reosurces;

    this.setSunLight();
    this.setEnvironmentMap();
  }
  setSunLight() {
    this.sunLight = new THREE.DirectionalLight("#ffffff", 1);
    this.sunLight.castShadow = true;
    this.sunLight.shadow.camera.far = 15;
    this.sunLight.shadow.mapSize.set(1024, 1024);
    this.sunLight.shadow.normalBias = 0.05;
    this.sunLight.position.set(5, 3, -2.25);
    this.scene.add(this.sunLight);

    // const ambientLight = new THREE.AmbientLight("#ffffff", 0.5);
    // this.scene.add(ambientLight);
  }
  setEnvironmentMap() {
    this.environmentMap = {};
    this.environmentMap.instensity = 0.4;
    this.environmentMap.texture =
      this.resources.items.envrironmentMaptexture;
    this.environmentMap.texture.encoding = THREE.sRGBEncoding;

    this.scene.environment = this.environmentMap.texture;
    this.setEnvironmentMap.updateMaterial = () => {
      this.scene.traverse((child) => {
        if (
          child instanceof THREE.Mesh &&
          child.material instanceof THREE.MeshStandardMaterial
        ) {
          child.material.envMap = this.environmentMap.texture;
          child.material.envMapintensity =
            this.environmentMap.instensity;
          child.material.needUpdate = true;
        }
      });
    };
  }
}
