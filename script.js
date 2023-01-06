alert("coming soon!");

const game_canvas = document.getElementById("game_canvas");
const gl = game_canvas.getContext("webgl");
var vsource = //V  S  A  U  C  E
`
  attribute vec4 position;
  uniform mat4 camera_matrix;
  uniform mat4 scene_matrix;
`
var fsource = `
  
`
if(gl == null) {
  alert("you have to update your browser because it is really old and I can't do 3D games on it because it's so old");
}
gl.clearColor(0.0, 0.0, 0.0, 1.0);
gl.clear(gl.COLOR_BUFFER_BIT);




function resizeHandler () {
  game_canvas.width = window.innerWidth;
  game_canvas.height = window.innerHeight;
}

window.onresize = resizeHandler;