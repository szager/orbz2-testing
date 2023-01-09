alert("coming soon!");

const game_canvas = document.getElementById("game_canvas");
const gl = game_canvas.getContext("webgl");
var fov = .75;
var aspect_ratio = 1.1;
var min_distance = .1;
var max_distance = 100;


var vs_source = //V  S  A  U  C  E
`
  attribute vec4 position;
  uniform mat4 camera_matrix;
  uniform mat4 scene_matrix;
  void main(void) {
    gl_position = camera_matrix * scene_matrix * position;
  }
`;
var fs_source = `
  void main(void) {
    gl_FragColor = vec4(gl_FragCoord.xy,1.0,1.0);
  }
`;



if(gl == null) {
  alert("this web browser is really old and you need to use a newer browser because your browser can't do webgl which means no 3d games on the web lol");
}
gl.clearColor(0.0, 0.0, 0.0, 1.0);
gl.clear(gl.COLOR_BUFFER_BIT);

var positions = [
  1.0, 1.0, 1.0,
  -1.0, 1.0, 1.0,
  1.0, -1.0, 1.0,
]
var faces = [
  0, 1, 2
]

var position_buffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, position_buffer);
gl.bufferData(
  gl.ARRAY_BUFFER,
  new Float32Array(positions),
  gl.STATIC_DRAW
);

var face_buffer = gl.createBuffer();
gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, face_buffer);
gl.bufferData(
  gl.ELEMENT_ARRAY_BUFFER,
  new Uint16Array(faces),
  gl.STATIC_DRAW
);

function init_shader_program(gl, vs_source, fs_source) {
  let vertex_shader = load_shader(gl, gl.VERTEX_SHADER, vs_source);
  let fragment_shader = load_shader(gl, gl.FRAGMENT_SHADER, fs_source);
  let shader_program = gl.createProgram();
  gl.attachShader(shader_program, vertex_shader);
  gl.attachShader(shader_program, fragment_shader);
  gl.linkProgram(shader_program);
  if (!gl.getProgramParameter(shader_program, gl.LINK_STATUS)) {
    alert(
      `📠📠📠💩📠📠📠📠💩📠📠💩📠 ${gl.getProgramInfoLog(
        shader_program
      )} 📠📠💩📠💩📠📠💩📠📠`
    );
    return null;
  }
  return shader_program;
}


function load_shader (gl, type, source) {
  let shader = gl.createShader(type);
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    alert(
      `📠📠📠📠${gl.getShaderInfoLog(shader)}📠📠📠📠`
    );
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

function draw_scene() {
  gl.clearColor(0.0, 0.0, 0.0, 1.0);
  gl.clearDepth(1.0);
  gl.enable(gl.DEPTH_TEST);
  gl.depthFunc(gl.LEQUAL);
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
  var camera_matrix = mat4.create();
  mat4.perspective(camera_matrix, fov, aspect_ratio, min_distance, max_distance);
  mat4.translate(camera_matrix, camera_matrix, [0, 0, -6]);
  var scene_matrix = mat4.create();
  gl.bindBuffer(gl.ARRAY_BUFFER, buffers.position);
  gl.vertexAttribPointer(
    programInfo.attribLocations.vertexPosition,
    numComponents,
    type,
    normalize,
    stride,
    offset
  );
  gl.enableVertexAttribArray(programInfo.attribLocations.vertexPosition);
}

function resizeHandler () {
  game_canvas.width = window.innerWidth;
  game_canvas.height = window.innerHeight;
  aspect_ratio = window.innerWidth / window.innerHeight;
}

window.onresize = resizeHandler;