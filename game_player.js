import {game} from "./game.js";

class game_player {
  constructor(canvas) {
    this.game = new game(canvas);
    this.stopping = false;
    this.paused = false;
    this.bound_update_method = this.update.bind(this);
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
  update() {//but i can't make it private
    if(!this.stopping) {
      if(!this.paused) {
        this.game.update();
      }
      requestAnimationFrame(this.bound_update_method);
    }
  }
}

export {game_player};