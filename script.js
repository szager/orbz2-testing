alert("coming soon!");

const game_canvas = document.getElementById("game_canvas");
const gl = game_canvas.getContext("webgl");
var aspect_ratio = 1.1;
var vsource = //V  S  A  U  C  E
`
  attribute vec4 position;
  uniform mat4 camera_matrix;
  uniform mat4 scene_matrix;
  void main(void) {
    gl_position = camera_matrix * scene_matrix * position;
  }
`
var fsource = `
  void main(void) {
    gl_FragColor = vec4(gl_FragCoord.xy,1.0,1.0);
  }
`
if(gl == null) {
  alert("this web browser is really old and you need to use a newer browser because your browser can't do webgl which means no 3d games on the web lol");
}
gl.clearColor(0.0, 0.0, 0.0, 1.0);
gl.clear(gl.COLOR_BUFFER_BIT);

function draw_scene() {
  
}

function resizeHandler () {
  game_canvas.width = window.innerWidth;
  game_canvas.height = window.innerHeight;
  aspect_ratio = window.innerWidth / window.innerHeight;
}

window.onresize = resizeHandler;