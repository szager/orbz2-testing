import {game_player} from "./game_player.js";

let the_game = new game_player(document.querySelector("canvas"));

function handle_error(e) {
  alert(e.message + "!");
}

window.addEventListener("error", handle_error);

alert(amogus);