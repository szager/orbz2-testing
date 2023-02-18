import {game} from "./game.js";

class game_player {
  constructor(canvas) {
    this.game = new game(canvas);
    this.stopping = false;
    this.paused = false;
    this.bound_update_method = this.update.bind(this);
    this.starter = document.querySelector("input");
    this.starter.addEventListener("change
    requestAnimationFrame(this.bound_update_method);
  }
  pause() {
    this.paused = true;
  }
  unpause() {
    this.paused = false;
  }
  stop() {
    this.stopping = true;
  }
  update() {
    if(!this.stopping) {
      if(!this.paused) {
        this.game.update();
      }
      requestAnimationFrame(this.bound_update_method);
    }
  }
}

export {game_player};