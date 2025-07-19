import * as THREE from "three";
import EventEmitter from "./EventEmitter";
import sources from "../world/sources";

export default class Resources {
  constructor(sources) {
    super();

    this.sources = sources;
    this.items = {};
    this.toLoad = this.sources.length;
    this.loaded = 0;
  }
}
