alert("coming soon!");

const game_canvas = document.getElementById("game_canvas");
const gl = game_canvas.getContext("webgl");
if(gl == null) {
  alert("you have to update your br");
}