import Experience from "../Experience";
import * as THREE from "three";

export default class Floor {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;

    this.setGeometry();
    this.setTextures();
    this.setMaterial();
    this.setMesh();
  }
  setGeometry() {
    this.geometry = new THREE.CircleGeometry(10, 10);
    this.geometry.rotateX(-Math.PI * 0.5);
  }
  setTextures() {
    this.geometry = new THREE.PlaneGeometry(10, 10);
    this.geometry.rotateX(-Math.PI * 0.5);
  }
  setMaterial() {
    this.geometry = new THREE.PlaneGeometry(10, 10);
    this.geometry.rotateX(-Math.PI * 0.5);
  }
  setMesh() {
    this.geometry = new THREE.PlaneGeometry(10, 10);
    this.geometry.rotateX(-Math.PI * 0.5);
  }
}
