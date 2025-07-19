import * as THREE from "three";
import Experience from "../Experience";

export default class world {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    // this.camera = this.experience.camera.instance;
    // this.renderer = this.experience.renderer.instance;
    const testMash = new THREE.Mesh(
      new THREE.BoxGeometry(1, 1, 1),
      new THREE.MeshBasicMaterial({ wireframe: true })
    );
    // this.setWorld();
    this.scene.add(this.world);

    this.environment = new Environment();
  }
}
