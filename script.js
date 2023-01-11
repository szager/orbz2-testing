alert("coming soon!");

const game_canvas = document.getElementById("game_canvas");
const gl = game_canvas.getContext("webgl");

class orbee {
  constructor(x, y, z) {
    this.x = x;
    this.y = y;
    this.z = z;
    object_positions.push(x);
    object_positions.push(y);
    object_positions.push(z);
  }
}

var orbeez = [];
var object_positions = [0, 0, 0, 0, 0, 0];

var orbee_model = {
  positions: [
    -1, -1, -1,
    1, -1, 1,
    -1, 1, 1,
    1, 1, -1
  ],
  normals: [
    -1, -1, -1,
    1, -1, 1,
    -1, 1, 1,
    1, 1, -1
  ],
  faces: [
    0, 1, 2,
    0, 1, 3,
    0, 2, 3,
    1, 2, 3
  ],
};

function normalize(abnormals) {
  for (let i = 0; i < abnormals.length / 3; i++) {
    let normal_length =
      (abnormals[i * 3] ** 2 +
        abnormals[i * 3 + 1] ** 2 +
        abnormals[i * 3 + 2] ** 2) **
      0.5;
    abnormals[i * 3] /= normal_length;
    abnormals[i * 3 + 1] /= normal_length;
    abnormals[i * 3 + 2] /= normal_length;
  }
}

normalize(orbee_model.normals);

for (let i = 0; i < 1000; i++) {
  orbeez.push(
    new orbee(
      Math.random() * 8 - 4,
      Math.random() * 8 - 4,
      Math.random() * 8 - 4
    )
  );
}
var positions = [
  -0.9, 0.0, 0.5, 0.9, 0.0, 0.5, 1.0, 0.0, 0.4, 1.0, 0.0, -0.4, 0.9, 0.0, -0.5,
  -0.9, 0.0, -0.5, -1.0, 0.0, -0.4, -1.0, 0.0, 0.4,
];
var object_indices = [0, 0, 0, 0, 0, 0, 0, 0];
var faces = [0, 1, 2, 0, 2, 3, 0, 3, 4, 0, 4, 5, 0, 5, 6, 0, 6, 7, 0, 7, 1];
var normals = [
  0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0,
  0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0,
];

function add_to_scene(model, object_index) {
  let vertex_count = positions.length / 3;
  let new_vertex_count = model.positions.length / 3;
  
  positions = positions.concat(model.positions);
  normals = normals.concat(model.normals);
  model.faces.forEach(corner => {
    faces.push(corner + vertex_count);
  });
  
}

var vertex_count = positions.length / 3;

var object_position_buffer = gl.createBuffer();
var position_buffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, position_buffer);
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);

var object_index_buffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, object_index_buffer);
gl.bufferData(
  gl.ARRAY_BUFFER,
  new Float32Array(object_indices),
  gl.STATIC_DRAW
);

var face_buffer = gl.createBuffer();
gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, face_buffer);
gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(faces), gl.STATIC_DRAW);

var normal_buffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, normal_buffer);
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(normals), gl.STATIC_DRAW);

var vs_source = `
  attribute vec4 position;
  attribute vec3 normal;
  attribute float object_index; //i would use an integer, but the gpu doesn't like integers
  uniform vec3 object_positions[1002];
  uniform mat4 scene_matrix;
  uniform mat4 camera_matrix;
  varying highp vec3 transformed_normal;
  void main(void) {
    transformed_normal = normalize(vec4(normal, 0.0) * scene_matrix).xyz;
    gl_Position = camera_matrix * scene_matrix * position;
  }
`;
var fs_source = `
  varying highp vec3 transformed_normal;
  void main(void) {
    highp vec3 normal_normal = normalize(transformed_normal);
    gl_FragColor = vec4((normal_normal + vec3(1.0, 1.0, 1.0)) * 0.5, 1.0);
  }
`;

var aspect_ratio = game_canvas.width / game_canvas.height;
var fov = 0.7;
var min_distance = 0.1;
var max_distance = 100;

function loadShader(gl, type, source) {
  let shader = gl.createShader(type);
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    alert(`💩💩💩💩💩 ${gl.getShaderInfoLog(shader)}💩💩💩💩💩💩💩💩💩`);
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
    normal: gl.getAttribLocation(shader_program, "normal"),
    object_index: gl.getAttribLocation(shader_program, "object_index"),
  },
  uniform_locations: {
    camera_matrix: gl.getUniformLocation(shader_program, "camera_matrix"),
    scene_matrix: gl.getUniformLocation(shader_program, "scene_matrix"),
    object_positions: gl.getUniformLocation(shader_program, "object_positions"),
  },
};

gl.clearColor(0.0, 0.0, 0.0, 1.0);
gl.clear(gl.COLOR_BUFFER_BIT);

function draw_scene() {
  gl.clearColor(0.96, 0.96, 0.96, 1.0);
  gl.clearDepth(1.0);
  gl.enable(gl.DEPTH_TEST);
  gl.depthFunc(gl.LEQUAL);
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
  let camera_matrix = mat4.create();
  mat4.perspective(
    camera_matrix,
    fov,
    aspect_ratio,
    min_distance,
    max_distance
  );
  mat4.translate(camera_matrix, camera_matrix, [0.0, -0.5, -4.0]);
  mat4.rotate(camera_matrix, camera_matrix, Math.PI * 0.25, [1.0, 1.0, 0.0]);
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
  gl.bindBuffer(gl.ARRAY_BUFFER, normal_buffer);
  gl.vertexAttribPointer(
    program_info.attribute_locations.normal,
    3,
    gl.FLOAT,
    false,
    0,
    0
  );
  gl.bindBuffer(gl.ARRAY_BUFFER, object_index_buffer);
  gl.vertexAttribPointer(
    program_info.attribute_locations.object_index,
    1,
    gl.FLOAT,
    false,
    0,
    0
  );

  gl.enableVertexAttribArray(program_info.attribute_locations.position);
  gl.enableVertexAttribArray(program_info.attribute_locations.normal);
  gl.enableVertexAttribArray(program_info.attribute_locations.object_index);
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, face_buffer);
  gl.useProgram(program_info.program);

  gl.uniform3fv(
    program_info.uniform_locations.object_positions,
    new Float32Array(object_positions)
  );

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

function resizeHandler() {
  //game_canvas.width = window.innerWidth;
  //game_canvas.height = window.innerHeight;
  //aspect_ratio = window.innerWidth / window.innerHeight;
  //draw_scene();
}

var time = 0;

function tick() {
  time++;

  for (let i = 0; i < orbeez.length; i++) {
    object_positions[i * 3 + 6] = orbeez[i].x;
    object_positions[i * 3 + 7] = orbeez[i].y;
    object_positions[i * 3 + 8] = orbeez[i].z;
  }

  draw_scene();
  requestAnimationFrame(tick);
}

window.onresize = resizeHandler;
window.onload = tick;
//window.onclick = draw_scene;
