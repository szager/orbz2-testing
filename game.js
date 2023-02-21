import {scene} from "./scene.js";
import {tetrahedron} from "./tetrahedron.js";
import {obj2js} from "./obj2js.js";

class game {
  constructor(canvas) {
    this.canvas = canvas;
    this.frame_time = 1 / 60;
    this.time = 0;
    this.scene = new scene(canvas, 2);
    tetrahedron.add_to_scene(this.scene, 0);
  }
  complete_scene(file) {
    obj2js(file);
    this.scene.initialize_buffers();
  }
  update() {
    this.time += this.frame_time;
    this.scene.draw(this.time);
  }
}

export {game};