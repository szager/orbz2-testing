const game_canvas = document.getElementById("game_canvas");
const gl = game_canvas.getContext("webgl");
const golden_ratio = 0.5 + Math.sqrt(1.25);

const ico_coord_a = golden_ratio / Math.sqrt(golden_ratio**2 + 1);
const ico_coord_b = 1 / Math.sqrt(golden_ratio**2 + 1);

class orbee {
  constructor(x, y, z) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.dx = 0;
    this.dy = 0;
    this.dz = 0;
    this.dx_next = 0;
    this.dy_next = 0;
    this.dz_next = 0;
    object_positions.push(x);
    object_positions.push(y);
    object_positions.push(z);
  }
}

function get_distance(dx, dy, dz) {
  return (dx**2 + dy**2 + dz**2)**0.5;
}

var orbeez = [];
var object_positions = [0, 0, 0, 0, 0, 0];
var traction = 0.2;
var restitution = 0.4;
var orbie_radius = 0.1;
var cursor_radius = .75;

var mouse_down = false;

var orbee_model = {
  positions: [
    0, ico_coord_a * +0.1, ico_coord_b * +0.1,
    0, ico_coord_a * -0.1, ico_coord_b * +0.1,
    0, ico_coord_a * -0.1, ico_coord_b * -0.1,
    0, ico_coord_a * +0.1, ico_coord_b * -0.1,
    ico_coord_a * +0.1, ico_coord_b * +0.1, 0,
    ico_coord_a * -0.1, ico_coord_b * +0.1, 0,
    ico_coord_a * -0.1, ico_coord_b * -0.1, 0,
    ico_coord_a * +0.1, ico_coord_b * -0.1, 0,
    ico_coord_b * +0.1, 0, ico_coord_a * +0.1,
    ico_coord_b * +0.1, 0, ico_coord_a * -0.1,
    ico_coord_b * -0.1, 0, ico_coord_a * -0.1,
    ico_coord_b * -0.1, 0, ico_coord_a * +0.1,
  ],
  normals: [
    0, +ico_coord_a, +ico_coord_b,
    0, -ico_coord_a, +ico_coord_b,
    0, -ico_coord_a, -ico_coord_b,
    0, +ico_coord_a, -ico_coord_b,
    +ico_coord_a, +ico_coord_b, 0,
    -ico_coord_a, +ico_coord_b, 0,
    -ico_coord_a, -ico_coord_b, 0,
    +ico_coord_a, -ico_coord_b, 0,
    +ico_coord_b, 0, +ico_coord_a,
    +ico_coord_b, 0, -ico_coord_a,
    -ico_coord_b, 0, -ico_coord_a,
    -ico_coord_b, 0, +ico_coord_a,
  ],
  faces: [
    0, 3, 4,
    0, 3, 5,
    1, 2, 6,
    1, 2, 7,
    4, 7, 8,
    4, 7, 9,
    5, 6, 10,
    5, 6, 11,
    8, 11, 0,
    8, 11, 1,
    9, 10, 2,
    9, 10, 3,
    0, 4, 8,
    3, 4, 9,
    1, 7, 8,
    2, 7, 9,
    0, 5, 11,
    3, 5, 10,
    1, 6, 11,
    2, 6, 10,
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
      Math.random() * 1 - .5,
      Math.random() * 1 - .5,
      Math.random() * 10 - 5
    )
  );
}
var positions = [
  //length is in decimetres
  -1.9, 9.0, 1.0,
  1.9, 9.0, 1.0,
  2.0, 9.0, 0.9,
  2.0, 9.0, -0.9,
  1.9, 9.0, -1.0,
  -1.9, 9.0, -1.0,
  -2.0, 9.0, -0.9,
  -2.0, 9.0, 0.9,
];
var object_indices = [0, 0, 0, 0, 0, 0, 0, 0];
var faces = [0, 1, 2, 0, 2, 3, 0, 3, 4, 0, 4, 5, 0, 5, 6, 0, 6, 7, 0, 7, 1];
var normals = [
  0.0, 1.0, 0.0,
  0.0, 1.0, 0.0,
  0.0, 1.0, 0.0,
  0.0, 1.0, 0.0,
  0.0, 1.0, 0.0,
  0.0, 1.0, 0.0,
  0.0, 1.0, 0.0,
  0.0, 1.0, 0.0,
];

function add_to_scene(model, object_index) {
  let vertex_count = positions.length / 3;
  let new_vertex_count = model.positions.length / 3;
  for (let i = 0; i < new_vertex_count; i++) {
    object_indices.push(object_index);
  }
  positions = positions.concat(model.positions);
  normals = normals.concat(model.normals);
  model.faces.forEach((corner) => {
    faces.push(corner + vertex_count);
  });
}
for (let i = 0; i < orbeez.length; i++) {
  add_to_scene(orbee_model, i + 2);
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
  attribute vec3 position;
  attribute vec3 normal;
  attribute float object_index;
  uniform vec3 object_positions[1002];
  uniform mat4 scene_matrix;
  uniform mat4 camera_matrix;
  uniform mat3 normal_matrix;
  varying highp vec3 transformed_normal;
  void main(void) {
    transformed_normal = normalize(normal * normal_matrix);
    mediump int int_object_index = int(object_index);
    gl_Position = camera_matrix * scene_matrix * vec4(position + object_positions[int_object_index], 1.0);
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
    normal_matrix: gl.getUniformLocation(shader_program, "normal_matrix"),
    object_positions: gl.getUniformLocation(shader_program, "object_positions"),
  },
};

gl.clearColor(0.0, 0.0, 0.0, 1.0);
gl.clear(gl.COLOR_BUFFER_BIT);

function stupid_function(){
  var cursor_matrix = mat4.create();
  var cursor_screen_pos = vec4.create();
  var cursor_scene_pos = vec4.create();
  tick();
}

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
  mat4.translate(camera_matrix, camera_matrix, [0.0, 0.0, -6.0]);
  mat4.rotate(camera_matrix, camera_matrix, Math.PI * -0.25, [1.0, 0.0, 0.0]);
  mat4.translate(camera_matrix, camera_matrix, [0.0, 0.0, 0.5]);
  let scene_matrix = mat4.create();
  //mat4.rotate(scene_matrix, scene_matrix, time * 0.018403, [1.0, 0.0, 0.0]);
  //mat4.rotate(scene_matrix, scene_matrix, time * 0.023485, [0.0, 1.0, 0.0]);
  //mat4.rotate(scene_matrix, scene_matrix, time * 0.047634, [0.0, 0.0, 1.0]);
  let normal_matrix = mat3.create();
  mat3.normalFromMat4(normal_matrix, scene_matrix);
  
  //mat4.multiply(cursor_matrix, scene_matrix, camera_matrix);
  //mat4.invert(cursor_matrix, cursor_matrix);
  
  
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
  gl.uniformMatrix3fv(
    program_info.uniform_locations.normal_matrix,
    false,
    normal_matrix
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

function orbee_interactions() {
  for(let i = 0; i < orbeez.length; i++) {
    let orbie = orbeez[i];
    for(let j = i + 1; j < orbeez.length; j++) {
      let other_orbie = orbeez[j];
      let dx = orbie.x + orbie.dx - other_orbie.x - other_orbie.dx;
      let dy = orbie.y + orbie.dy - other_orbie.y - other_orbie.dy;
      let dz = orbie.z + orbie.dz - other_orbie.z - other_orbie.dz;
      if(dx < orbie_radius * 2 && dy < orbie_radius * 2 && dz < orbie_radius * 2) {
        let distance = (dx**2 + dy**2 + dz**2)**.5;
        if(distance < orbie_radius * 2) {
          let force_multiplier = (distance - orbie_radius * 2) * .04 / distance;
          orbie.dx_next -= dx * force_multiplier;
          orbie.dy_next -= dy * force_multiplier;
          orbie.dz_next -= dz * force_multiplier;
          other_orbie.dx_next += dx * force_multiplier;
          other_orbie.dy_next += dy * force_multiplier;
          other_orbie.dz_next += dz * force_multiplier;
        }
      }
    }
  }
  orbeez.forEach(orbie => {
    orbie.dx += orbie.dx_next;
    orbie.dy += orbie.dy_next;
    orbie.dz += orbie.dz_next;
    orbie.dx_next = 0;
    orbie.dy_next = 0;
    orbie.dz_next = 0;
  });
}

function tick() {
  time++;
  
  for(let i = 0; i < 12; i++) { //the speed of sound in orbeez is 9.6 m/s
    orbee_interactions();
  }
  
  
  orbeez.forEach(orbie => {
    orbie.dz -= .01;
    orbie.dx *= .98;
    orbie.dy *= .98;
    orbie.dz *= .98;
    
    if(mouse_down) {
      let dx = orbie.x + orbie.dx - cursor_scene_pos[0];
      let dy = orbie.y + orbie.dy - cursor_scene_pos[1];
      let dz = orbie.z + orbie.dz - cursor_scene_pos[2];
      let distance = get_distance(dx, dy, dz);
      if(distance < cursor_radius + orbie_radius) {
        let force_distance_ratio = (distance - orbie_radius - cursor_radius) / distance;
        orbie.dx -= dx * force_distance_ratio;
        orbie.dy -= dy * force_distance_ratio;
        orbie.dz -= dz * force_distance_ratio;
      }
    }
    
    let distance = get_distance(orbie.x + orbie.dx, orbie.y + orbie.dy, orbie.z + orbie.dz);
    if(distance + orbie_radius > 2) {
      orbie.dx -= (orbie.x + orbie.dx) / distance * (distance + orbie_radius - 2);
      orbie.dy -= (orbie.y + orbie.dy) / distance * (distance + orbie_radius - 2);
      orbie.dz -= (orbie.z + orbie.dz) / distance * (distance + orbie_radius - 2);
    }
    orbie.x += orbie.dx;
    orbie.y += orbie.dy; //speed in hexametres per second?
    orbie.z += orbie.dz;

    //if (orbie.y < orbie_radius) {
      //orbie.y = orbie_radius;
      //let speed = Math.hypot(orbie.dx, orbie.dz);
      //let speed_next = Math.max(0, speed + orbie.dy * traction);
      //let speed_multiplier = (speed_next / speed) || 0;
      //orbie.dx *= speed_multiplier;
      //orbie.dz *= speed_multiplier;
     // orbie.dy *= -restitution;
    //}
  });

  for (let i = 0; i < orbeez.length; i++) {
    object_positions[i * 3 + 6] = orbeez[i].x;
    object_positions[i * 3 + 7] = orbeez[i].y;
    object_positions[i * 3 + 8] = orbeez[i].z;
  }

  draw_scene();
  requestAnimationFrame(tick);
}

function mousemove_handler(e) {
  let canvas_rect = game_canvas.getBoundingClientRect();
  let screen_x = e.clientX - canvas_rect.left;
  let screen_y = e.clientY - canvas_rect.top;
  let gl_pos = vec4.create();
  gl_pos[0] = (screen_x / game_canvas.width - 0.5);
  gl_pos[1] = (screen_y / game_canvas.height - 0.5);
  gl_pos[2] = 0.5;
  gl_pos[3] = 1.0;
  
  vec4.transformMat4(cursor_scene_pos, gl_pos, cursor_matrix);
  
  cursor_screen_pos[0] = (e.clientX - canvas_rect.left);
  cursor_screen_pos[1] = (e.clientY - canvas_rect.top);
}

function mousedown_handler() {
  mouse_down = true;
}

function mouseup_handler() {
  mouse_down = false;
}


window.onresize = resizeHandler;
window.onload = stupid_function;
window.onmousedown = mousedown_handler;
window.onmouseup = mouseup_handler;
window.onmousemove = mousemove_handler;
//window.onclick = draw_scene;
