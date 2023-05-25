import {game} from "./game.js";
//import {obj2js} from "./obj2js.js";
let game_mode = document.location.hash.substring(1) || "AUTO";
let game_canvas = document.createElement("canvas");
if(confirm("How big is your screen?")) {
  game_canvas.height = 720;
  game_canvas.width = 1280;
} else {
  game_canvas.height = 540;
  game_canvas.width = 960;
}

document.body.appendChild(game_canvas);
const the_game = new game(
  game_canvas,
  document.getElementById("perf_canvas"),
  game_mode
);

if (game_mode == "MANUAL") {
  let step_button = document.createElement("button");
  step_button.id = "step-button";
  step_button.innerText = "tick";
  step_button.addEventListener("click", () => { the_game.update_and_stuff(performance.now()); });
  document.body.appendChild(step_button);
}

//fetch("https://cdn.glitch.global/c6678e5a-6e79-4893-82bc-4512fb9bd910/orbee.obj?v=1677107052951").then(response => {response.text().then(text => {obj2js(text);})});
