import {scene} from "./scene.js";

class game {
  constructor(canvas) {
    this.scene = new scene(canvas);
    this.scene.initialize_buffers();
  }
  update() {
    this.scene.draw();
  }
}

export {game};