import * as THREE from "three";
import Sizes from "./Utils/Size";
import Time from "./Utils/Time";
import Camera from "./Camera";

let instance = null;

export default class Experience {
  constructor(canvas) {
    if (instance) {
      return instance;
    }
    instance = this;
    window.experience = this;
    this.canvas = canvas;
    this.Sizes = new Sizes();
    this.time = new Time();
    this.scene = new THREE.Scene();
    this.camera = new Camera(this);

    this.Sizes.on("resize", () => {
      this.resize();
    });

    this.time.on("tick", () => {
      this.update();
    });
  }
  resize() {
    this.camera.resize();
    // Handle resize logic here
  }
  update() {
    this.camera.update();
  }
}
