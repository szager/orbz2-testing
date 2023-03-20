import {constants} from "./constants.js";
import {group_3d} from "./object_3d.js";
import {orbee_model} from "./orbee_model.js";

class scene {
  constructor(canvas, object_count) {
    this.canvas = canvas;
    this.gl = this.canvas.getContext("webgl");
    this.fov = constants.fov;
    this.aspect_ratio = this.canvas.width / this.canvas.height;
    this.min_distance = constants.near_distance;
    this.max_distance = constants.far_distance;
    
    //alert(String(this.gl.getSupportedExtensions()));
    
    this.extension_thing = this.gl.getExtension('ANGLE_instanced_arrays');
    if(!this.extension_thing) {
      alert("oh no your computer is bad :(");
    }
    this.vertex_positions = [
    ];
    
    //let recipSqrt3 = 1 / Math.sqrt(3);
    
    this.vertex_normals = [
    ];
    
    this.object_indices = [
    ];
    
    this.object_translations = [
    ];
    
    this.objects = [
      
    ];
    this.objects = [];
    this.object_groups = [
      new group_3d(orbee_model, 1000.0)
    ];
    
    //this.object_colors = [
    //];
    
    //this.object_shininess = [
    //];
    
    this.faces = [
    ];
    
    
    this.pitch = .8;
    this.yaw = 0;
    this.view_distance = 600;
    this.focus = [0, 0, 0];
    
    
    this.vertex_shader_source = `
      attribute vec3 vertex_position;
      //attribute vec3 vertex_normal;
      attribute vec3 color;
      attribute vec3 position;
      
      uniform mat4 perspective_matrix;
      uniform mat4 view_matrix;
      
      uniform vec3 camera_translation;
      varying vec3 fColor;
      
      void main() {
        fColor = color;
        //relative_position = (vertex_position + object_translations[int_object_index]) - camera_translation;
        gl_Position = perspective_matrix * view_matrix * vec4((vertex_position + position) - camera_translation, 1.0);
      }
    `;

    this.fragment_shader_source = `
      varying lowp vec3 fColor;
      void main() {
        gl_FragColor = vec4(fColor, 1.0);
      }
    `;
    
    this.vertex_shader = this.load_shader(this.gl.VERTEX_SHADER, this.vertex_shader_source);
    this.fragment_shader = this.load_shader(this.gl.FRAGMENT_SHADER, this.fragment_shader_source);
    this.shader_program = this.gl.createProgram();
    this.gl.attachShader(this.shader_program, this.vertex_shader);
    this.gl.attachShader(this.shader_program, this.fragment_shader);
    this.gl.linkProgram(this.shader_program);
    
    this.program_info = {
      program: this.shader_program,
      attribute_locations: {
        vertex_position: this.gl.getAttribLocation(this.shader_program, "vertex_position"),
        //vertex_normal: this.gl.getAttribLocation(this.shader_program, "vertex_normal"),
        //object_index: this.gl.getAttribLocation(this.shader_program, "object_index"),
        color: this.gl.getAttribLocation(this.shader_program, "color"),
        position: this.gl.getAttribLocation(this.shader_program, "position"),
      },
      uniform_locations: {
        perspective_matrix: this.gl.getUniformLocation(this.shader_program, "perspective_matrix"),
        view_matrix: this.gl.getUniformLocation(this.shader_program, "view_matrix"),
        //object_translations: this.gl.getUniformLocation(this.shader_program, "object_translations"),
        //object_colors: this.gl.getUniformLocation(this.shader_program, "object_colors"),
        //object_shininess: this.gl.getUniformLocation(this.shader_program, "object_shininess"),
        camera_translation: this.gl.getUniformLocation(this.shader_program, "camera_translation"),
      },
    };
  }
  load_shader(type, source) {
    let shader = this.gl.createShader(type);
    this.gl.shaderSource(shader, source);
    this.gl.compileShader(shader);
    if (!this.gl.getShaderParameter(shader, this.gl.COMPILE_STATUS)) {
      alert(`💩💩💩💩💩💩💩 ${this.gl.getShaderInfoLog(shader)}💩💩💩💩💩💩💩💩`);
      this.gl.deleteShader(shader);
      return null;
    }
    return shader;
  }

  initialize_buffers() {
    //this.float32_object_colors = new Float32Array(this.object_colors);
    this.object_groups.forEach(object_group => {
      
      object_group.vertex_position_buffer = this.gl.createBuffer();
      this.gl.bindBuffer(
        this.gl.ARRAY_BUFFER,
        object_group.vertex_position_buffer
      );
      this.gl.bufferData(
        this.gl.ARRAY_BUFFER,
        new Float32Array(object_group.model.vertex_positions),
        this.gl.STATIC_DRAW
      );
      
      //object_group.vertex_normal_buffer = this.gl.createBuffer();
      //this.gl.bindBuffer(this.gl.ARRAY_BUFFER, object_group.vertex_normal_buffer);
      //this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(object_group.model.vertex_normals), this.gl.STATIC_DRAW);
      object_group.face_buffer = this.gl.createBuffer();
      this.gl.bindBuffer(
        this.gl.ELEMENT_ARRAY_BUFFER,
        object_group.face_buffer
      );
      this.gl.bufferData(
        this.gl.ELEMENT_ARRAY_BUFFER,
        new Uint16Array(object_group.model.faces),
        this.gl.STATIC_DRAW
      );
      
      object_group.position_buffer = this.gl.createBuffer();
      this.gl.bindBuffer(
        this.gl.ARRAY_BUFFER,
        object_group.position_buffer
      );
      this.gl.bufferData(
        this.gl.ARRAY_BUFFER,
        new Float32Array(object_group.model.positions),
        this.gl.STATIC_DRAW
      );
      object_group.color_buffer = this.gl.createBuffer();
      this.gl.bindBuffer(
        this.gl.ARRAY_BUFFER,
        object_group.color_buffer
      );
      this.gl.bufferData(
        this.gl.ARRAY_BUFFER,
        new Float32Array(object_group.model.colors),
        this.gl.STATIC_DRAW
      );
      
    });
  }
  
  draw(time) {
    //this.camera_rotation[0] = time * -.013357674575867674745;
    //this.camera_rotation[1] = time * .0075564367798670867646;
    //this.camera_rotation[2] = time * .0047658753564576776898;
    //this.yaw = time * .186553465768875456;
    //this.pitch = (Math.sin(time * 1.1654356656567) * 0.5 - 0.5);
    this.gl.clearColor(0.8, 0.8, 0.8, 1.0);
    this.gl.clearDepth(1.0);
    this.gl.enable(this.gl.DEPTH_TEST);
    this.gl.depthFunc(this.gl.LEQUAL);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
    let perspective_matrix = mat4.create();
    mat4.perspective(
      perspective_matrix,
      this.fov,
      this.aspect_ratio,
      this.min_distance,
      this.max_distance
    );
    let camera_matrix = mat4.create();
    mat4.rotate(camera_matrix, camera_matrix, this.yaw, [0.0, 0.0, 1.0]);
    mat4.rotate(camera_matrix, camera_matrix, Math.PI / 2 - this.pitch, [1.0, 0.0, 0.0]);
    let view_matrix = mat4.create();
    mat4.invert(view_matrix, camera_matrix);
    //this.gl.uniform3fv(
      //this.program_info.uniform_locations.object_colors,
      //this.float32_object_colors
    //);
    //this.gl.uniform1fv(
      //this.program_info.uniform_locations.object_shininess,
      //new Float32Array(this.object_shininess)
    //);
    this.gl.uniform3f(
      this.program_info.uniform_locations.camera_translation,
      camera_matrix[8] * this.view_distance + this.focus[0],
      camera_matrix[9] * this.view_distance + this.focus[1],
      camera_matrix[10] * this.view_distance + this.focus[2]
    );
    
  
    this.gl.uniformMatrix4fv(
      this.program_info.uniform_locations.perspective_matrix,
      false,
      perspective_matrix
    );

    this.gl.uniformMatrix4fv(
      this.program_info.uniform_locations.view_matrix,
      false,
      view_matrix
    );
    for(let i = 0; i < this.object_groups.length; i++) {
      let object_group = this.object_groups[i];
      this.draw_object_group(object_group);
    }
    //this.object_groups.forEach(object_group => {
      //this.draw_object_group(object_group);
    //})
    //alert(JSON.stringify(view_matrix, null, 1));
  }
  draw_object_group(object_group) {
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, object_group.vertex_position_buffer);
    this.gl.enableVertexAttribArray(this.program_info.attribute_locations.vertex_position);
    this.gl.vertexAttribPointer(
      this.program_info.attribute_locations.vertex_position,
      3,
      this.gl.FLOAT,
      false,
      0,
      0
    );
    
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, object_group.color_buffer);
    this.gl.enableVertexAttribArray(this.program_info.attribute_locations.color);
    this.gl.vertexAttribPointer(this.program_info.attribute_locations.color, 3, this.gl.FLOAT, false, 0, 0);
    this.extension_thing.vertexAttribDivisorANGLE(this.program_info.attribute_locations.color, 1);
    
    
    //alert(String(object_group.positions));
    
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, object_group.position_buffer);
    this.gl.enableVertexAttribArray(this.program_info.attribute_locations.position);
    this.gl.vertexAttribPointer(this.program_info.attribute_locations.position, 3, this.gl.FLOAT, false, 0, 0);
    this.extension_thing.vertexAttribDivisorANGLE(this.program_info.attribute_locations.position, 1);
    
    this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, object_group.face_buffer);
    
    this.gl.useProgram(this.program_info.program);
    
    this.extension_thing.drawElementsInstancedANGLE(
      this.gl.TRIANGLES,
      Math.round(object_group.model.faces.length),
      this.gl.UNSIGNED_SHORT,
      0,
      Math.round(object_group.positions.length / 3),
    );
  }
}

export {scene};