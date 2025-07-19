import * as THREE from "three";
import Sizes from "./Utils/Size";
import Time from "./Utils/Time";
import Camera from "./Camera";
import Renderer from "./Renderer";
import world from "./world/world";
import Resources from "./Utils/Resources";
import sources from "./world/sources";

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
    this.resources = new Resources(sources);
    this.camera = new Camera();
    this.renderer = new Renderer();
    this.world = new world();

    this.Sizes.on("resize", () => {
      this.resize();
    });

    this.time.on("tick", () => {
      this.update();
    });
  }
  resize() {
    this.camera.resize();
    this.rendere.resize();
    // Handle resize logic here
  }
  update() {
    // this.instance.render(this.scene, this.camera.instance);
    this.camera.update();
    this.renderer.update();
  }
}
