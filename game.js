import {scene} from "./scene.js";


class game {
  constructor(canvas) {
    this.frame_time = 1 / 60;
    this.time = 0;
    this.scene = new scene(canvas, 2);
    this.scene.initialize_buffers();
  }
  update() {
    this.time += this.frame_time;
    this.scene.draw(this.time);
  }
}

export {game};