import * as THREE from "three";
import Experience from "../Experience";
import Resources from "./../Utils/Resources";

export default class world {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;
    // this.camera = this.experience.camera.instance;
    // this.renderer = this.experience.renderer.instance;
    const testMash = new THREE.Mesh(
      new THREE.BoxGeometry(1, 1, 1),
      new THREE.MeshBasicMaterial({ wireframe: true })
    );
    // this.setWorld();
    this.scene.add(this.world);
    this.resources.on("ready", () => {
      this.environment = new Environment();
      this.floor = new Floor();
    });
  }
}
