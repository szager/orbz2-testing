import {scene} from "./scene.js";

class game {
  constructor(canvas) {
    this.scene = new scene(canvas);
  }
  update() {
    this.scene.draw();
  }
}

export {game};