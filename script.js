alert("coming soon!");

const game_canvas = document.getElementById("game_canvas");
const gl = game_canvas.getContext("webgl");

class orbee {
  constructor(x, y, z) {
    this.x = x;
    this.y = y;
    this.z = z;
  }
}

var orbeez = [];

for(let i = 0; i < 17; i++) {
  orbeez.push(new orbee(Math.random() * 8 - 4,Math.random() * 8 - 4,Math.random() * 8 - 4));
}
var positions = [
];
var faces = [
];
//orbeez.forEach(orbie => {
  //positions = positions.concat([
    //orbie.x + Math.random() * .2 - .1, orbie.y + Math.random() * .2 - .1, orbie.z + Math.random() * .2 - .1,
    //orbie.x + Math.random() * .2 - .1, orbie.y + Math.random() * .2 - .1, orbie.z + Math.random() * .2 - .1,
    //orbie.x + Math.random() * .2 - .1, orbie.y + Math.random() * .2 - .1, orbie.z + Math.random() * .2 - .1
  //]);
//})
for(let i = 0; i < 500; i++) {
  let x = Math.random() * 8 - 4;
  let y = Math.random() * 8 - 4;
  let z = Math.random() * 8 - 4;
  
  positions.push(x + Math.random() * .2 - .1);
  positions.push(y + Math.random() * .2 - .1);
  positions.push(z + Math.random() * .2 - .1);
  
  positions.push(x + Math.random() * .2 - .1);
  positions.push(y + Math.random() * .2 - .1);
  positions.push(z + Math.random() * .2 - .1);
  
  positions.push(x + Math.random() * .2 - .1);
  positions.push(y + Math.random() * .2 - .1);
  positions.push(z + Math.random() * .2 - .1);
}

for(let i = 0; i < 1500; i++) {
  faces.push(i);
}


var position_buffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, position_buffer);
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);
var face_buffer = gl.createBuffer();
gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, face_buffer);
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
    gl_Position = camera_matrix * scene_matrix * position;
  }
`;
var fs_source = `
  void main(void) {
    gl_FragColor = vec4(1.0, 0.5, 0.75, 1.0);
  }
`;
var aspect_ratio = game_canvas.width / game_canvas.height;
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
  gl.clearColor(0.96, 0.96, 0.96, 1.0);
  gl.clearDepth(1.0);
  gl.enable(gl.DEPTH_TEST);
  gl.depthFunc(gl.LEQUAL);
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
  let camera_matrix = mat4.create();
  mat4.perspective(camera_matrix, fov, aspect_ratio, min_distance, max_distance);
  mat4.translate(camera_matrix, camera_matrix, [
    0.0,
    0.0,
    -8.0
  ]);
  let scene_matrix = mat4.create();
  mat4.rotate(scene_matrix, scene_matrix,
    time * .03,
    [
     1,
     1,
     0
    ]
  );
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

var time = 0;

function tick() {
  time++;
  draw_scene();
  requestAnimationFrame(tick);
}


window.onresize = resizeHandler;
window.onload = tick;
//window.onclick = draw_scene;