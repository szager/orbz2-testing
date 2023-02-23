import {game} from "./game.js";
import {obj2js} from "./obj2js.js";

const the_game = new game(
  document.querySelector("canvas")
);

fetch("https://cdn.glitch.global/c6678e5a-6e79-4893-82bc-4512fb9bd910/orbee.obj?v=1677107052951").then(response => {response.text().then(text => {obj2js(text);})});
