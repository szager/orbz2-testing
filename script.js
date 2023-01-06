alert("coming soon!");

const game_canvas = document.getElementById("game_canvas");
const gl = game_canvas.getContext("webgl");
if(gl == null) {
  alert("you have to update your browser because it is really old and I can't do 3D games on it because it's so old");
}
gl.clearColor(0.0, 0.0, 0.0, 1.0);
gl.clear(gl.COLOR_BUFFER_BIT);

game_canvas.requestFullscreen();

function resizeHandler () {
  game_canvas.width = window.innerWidth;
  game_canvas.height = window.innerHeight;
}

function keydownHandler (e) {
}

window.onresize = resizeHandler;
window.onkeydown = keydownHandler;