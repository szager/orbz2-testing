alert("coming soon!");

const game_canvas = document.getElementById("game_canvas");
const gl = game_canvas.getContext("webgl");

var position_buffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, position_buffer);
var positions = [
  1.0, 1.0, 1.0,
  1.0, -1.0, 1.0,
  -1.0, 1.0, 1.0
];
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);

var face_buffer = gl.createBuffer();
gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, face_buffer);
var faces = [
  0, 1, 2
];
gl.bufferData(
  gl.ELEMENT_ARRAY_BUFFER,
  new Uint16Array(faces),
  gl.STATIC_DRAW
);

var vs_source = `
  attribute vec4 position;
  uniform mat4 scene_matrix;
  uniform mat4 camera_matrix;
  void main(void) {
    gl_position = position * scene_matrix * camera_matrix;
  }
`;
var fs_source = `
  void main(void) {
    gl_fragColor = vec4(1.0, 0.0, 1.0, 1.0);
  }
`;

var aspect_ratio = 1;

function loadShader(gl, type, source) {
  const shader = gl.createShader(type);
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    alert(
      `💩💩💩💩💩 ${gl.getShaderInfoLog(shader)}💩💩💩💩💩💩💩💩💩`
    );
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

var vertexShader = loadShader(gl, gl.VERTEX_SHADER, vs_source);

var program_info = {
  
}

gl.clearColor(0.0, 0.0, 0.0, 1.0);
gl.clear(gl.COLOR_BUFFER_BIT);

function resizeHandler () {
  game_canvas.width = window.innerWidth;
  game_canvas.height = window.innerHeight;
  aspect_ratio = window.innerWidth / window.innerHeight;
}

window.onresize = resizeHandler;
window.onload = resizeHandler;