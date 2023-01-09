alert("coming soon!");

const game_canvas = document.getElementById("game_canvas");
const gl = game_canvas.getContext("webgl");

var aspect_ratio = 1;

gl.clearColor(0.0, 0.0, 0.0, 1.0);
gl.clear(gl.COLOR_BUFFER_BIT);

function resizeHandler () {
  game_canvas.width = window.innerWidth;
  game_canvas.height = window.innerHeight;
  aspect_ratio = window.innerWidth / window.innerHeight;
}

window.onresize = resizeHandler;
window.onload = resizeHandler;