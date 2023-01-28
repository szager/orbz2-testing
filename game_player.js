import {game} from "./game.js";

class game_player {
  constructor(canvas) {
    this.game = new game(canvas);
  }
}

export {game_player};