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
    gl_Position = scene_matrix * camera_matrix * position;
  }
`;
var fs_source = `
  void main(void) {
    gl_FragColor = vec4(1.0, 0.0, 1.0, 1.0);
  }
`;

var aspect_ratio = 1;
var fov = .7;
var min_distance = 0.1;
var max_distance = 100;

function loadShader(gl, type, source) {
  let shader = gl.createShader(type);
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

var vertex_shader = loadShader(gl, gl.VERTEX_SHADER, vs_source);
var fragment_shader = loadShader(gl, gl.FRAGMENT_SHADER, fs_source);
var shader_program = gl.createProgram();
gl.attachShader(shader_program, vertex_shader);
gl.attachShader(shader_program, fragment_shader);
gl.linkProgram(shader_program);
var program_info = {
  program: shader_program,
  attribute_locations: {
    position: gl.getAttribLocation(shader_program, "position"),
  },
  uniform_locations: {
    camera_matrix: gl.getUniformLocation(shader_program, "camera_matrix"),
    scene_matrix: gl.getUniformLocation(shader_program, "scene_matrix")
  },
};

gl.clearColor(0.0, 0.0, 0.0, 1.0);
gl.clear(gl.COLOR_BUFFER_BIT);

function draw_scene() {
  gl.clearColor(0.0, 0.0, 0.0, 1.0);
  gl.clearDepth(1.0);
  gl.enable(gl.DEPTH_TEST);
  gl.depthFunc(gl.LEQUAL);
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
  let camera_matrix = mat4.create();
  mat4.perspective(camera_matrix, fov, aspect_ratio, min_distance, max_distance);
  mat4.translate(camera_matrix, camera_matrix, [
    0.0,
    0.0,
    -6.0
  ]);
  let scene_matrix = mat4.create();
  gl.bindBuffer(gl.ARRAY_BUFFER, position_buffer);
  gl.vertexAttribPointer(
    program_info.attribute_locations.position,
    3,
    gl.FLOAT,
    false,
    0,
    0
  );
  gl.enableVertexAttribArray(program_info.attribute_locations.position);
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, face_buffer);
  gl.useProgram(program_info.program);
  gl.uniformMatrix4fv(
    program_info.uniform_locations.camera_matrix,
    false,
    camera_matrix
  );
  gl.uniformMatrix4fv(
    program_info.uniform_locations.scene_matrix,
    false,
    scene_matrix
  );
  gl.drawElements(gl.TRIANGLES, faces.length, gl.UNSIGNED_SHORT, 0);
}



function resizeHandler () {
  //game_canvas.width = window.innerWidth;
  //game_canvas.height = window.innerHeight;
  //aspect_ratio = window.innerWidth / window.innerHeight;
  //draw_scene();
}



window.onresize = resizeHandler;
window.onload = draw_scene;
//window.onclick = draw_scene;