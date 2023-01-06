alert("coming soon!");

const game_canvas = document.getElementById("game_canvas");
const gl = game_canvas.getContext("webgl");
if(gl == null) {
  alert("you have to update your browser because it is really old and I can't do 3D games on it because it's so old");
}