alert("coming soon!");

const game_canvas = document.getElementById("game_canvas");
const gl = game_canvas.getContext("webgl");
var vs_source = `
  attribute vec4 position;
  uniform mat4 scene_matrix;
  uniform mat4 camera_matrix;
  void main(void) {
    gl_position = position * scene_matrix * camera_matrix;
  }
`;

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