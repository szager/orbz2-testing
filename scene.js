import {constants} from "./constants.js";
import {group_3d} from "./object_3d.js";
import {object_3d} from "./object_3d.js";
import {models} from "./models.js";

class scene {
  constructor(canvas, object_count) {
    this.canvas = canvas;
    this.gl = this.canvas.getContext("webgl2");
    this.fov = constants.fov;
    this.aspect_ratio = this.canvas.width / this.canvas.height;
    this.min_distance = constants.near_distance;
    this.max_distance = constants.far_distance;
    
    //let recipSqrt3 = 1 / Math.sqrt(3);
    
    //this.vertex_normals = [
    //];
    
    this.objects = [
      new object_3d(models.room, [0.0, 0.0, 0.0], [0.5, 0.3, 0.5])
    ];
    this.object_groups = [
      new group_3d(models.orbee_model, 80.0)
    ];
    
    this.pitch = .8;
    this.yaw = 0;
    this.view_distance = 1000;
    this.focus = [0, 0, 1000];
    
    
    this.vertex_shader_source = `#version 300 es
      in vec3 vertex_position;
      in vec3 vertex_normal;
      
      
      in vec3 color;
      in vec3 position;
      
      uniform mat4 perspective_matrix;
      uniform mat4 view_matrix;
      
      uniform vec3 camera_translation;
      out vec3 diffuse_color;
      out vec3 fNormal;
      out vec3 fPosition;
      
      void main() {
        fNormal = vertex_normal;
        //diffuse_color = color;
        diffuse_color = vec3(0.8, 0.65, 0.5); // (0.5, 0.7, 0.2) is the color of grass, and (0.6, 0.9, 0.3) is the color of tennis ball.
        //gl_Position = perspective_matrix * view_matrix * vec4((vertex_position + position) - camera_translation, 1.0);
        fPosition = (vertex_position) - camera_translation;
        gl_Position = perspective_matrix * view_matrix * vec4(fPosition, 1.0);
      }
    `;

    this.fragment_shader_source = `#version 300 es
      precision highp float;
      in vec3 diffuse_color;
      in vec3 fNormal;
      in vec3 fPosition;
      out vec4 FragColor;
      
      
      
      void main() {
  
        highp float ambient = 0.5; //0.8 looks good when not using gamma correction
        highp float sun = 0.75; //2.2
        highp vec3 up = vec3(0.5, 0.25, 1.0);
        highp vec3 specular_color = vec3(1.0, 1.0, 1.0);
        highp float ri = 1.5;
        
        highp vec3 n = normalize(fNormal);
        highp vec3 e = normalize(-fPosition);
        if(dot(e, n) < 0.0) {
          n *= -1.0;
        }
        highp vec3 h = normalize(up + e);
        
        highp float angle = max(dot(e, n), 0.0);
        
        highp float sqrt_reflectance = (ri - 1.0) / (ri + 1.0);
        highp float reflectance = sqrt_reflectance * sqrt_reflectance;
        highp float fresnel = reflectance + (1.0 - reflectance) * pow(1.0 - angle, 5.0);
        highp float transmission = 1.0 - fresnel;
        
        highp float diffuse = (max(dot(up, n), 0.0) * sun + ambient) * transmission;
        highp float specular = (pow(max(dot(n, h), 0.0), 2048.0) * sun + ambient) * fresnel;
        highp vec3 color = vec3(specular_color * specular + diffuse_color * diffuse);
        highp vec3 gamma_corrected_color = pow(color, vec3(0.45454545454545454545454545));
        
        FragColor = vec4(color, 1.0);
      }
    `;
    
    this.vertex_shader = this.load_shader(this.gl.VERTEX_SHADER, this.vertex_shader_source);
    this.fragment_shader = this.load_shader(this.gl.FRAGMENT_SHADER, this.fragment_shader_source);
    this.shader_program = this.gl.createProgram();
    this.gl.attachShader(this.shader_program, this.vertex_shader);
    this.gl.attachShader(this.shader_program, this.fragment_shader);
    this.gl.linkProgram(this.shader_program);
    
    
    
    
    this.vertex_shader_source_b = `#version 300 es
      in vec3 vertex_position;
      in vec3 vertex_normal;
      uniform vec3 color;
      uniform vec3 position;
      uniform mat4 perspective_matrix;
      uniform mat4 view_matrix;
      
      uniform vec3 camera_translation;
      out vec3 diffuse_color;
      out vec3 fNormal;
      out vec3 fPosition;
      
      void main() {
        fNormal = vertex_normal;
        //diffuse_color = color;
        diffuse_color = vec3(0.5, 0.7, 0.2); // (0.5, 0.7, 0.2) is the color of grass, and (0.6, 0.9, 0.3) is the color of tennis ball.
        //gl_Position = perspective_matrix * view_matrix * vec4((vertex_position + position) - camera_translation, 1.0);
        fPosition = (vertex_position) - camera_translation;
        gl_Position = perspective_matrix * view_matrix * vec4(fPosition, 1.0);
      }
    `;
    
    this.program_info = {
      program: this.shader_program,
      attribute_locations: {
        vertex_position: this.gl.getAttribLocation(this.shader_program, "vertex_position"),
        vertex_normal: this.gl.getAttribLocation(this.shader_program, "vertex_normal"),
        color: this.gl.getAttribLocation(this.shader_program, "color"),
        position: this.gl.getAttribLocation(this.shader_program, "position"),
      },
      uniform_locations: {
        perspective_matrix: this.gl.getUniformLocation(this.shader_program, "perspective_matrix"),
        view_matrix: this.gl.getUniformLocation(this.shader_program, "view_matrix"),
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
    this.object_groups.forEach(function(object_group) {
      
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
      
      object_group.vertex_normal_buffer = this.gl.createBuffer();
      this.gl.bindBuffer(this.gl.ARRAY_BUFFER, object_group.vertex_normal_buffer);
      this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(object_group.model.vertex_normals), this.gl.STATIC_DRAW);
      
      
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
        this.gl.DYNAMIC_DRAW
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
      
    }, this);
    
    
    this.objects.forEach(function(object) {
      
      object.vertex_position_buffer = this.gl.createBuffer();
      this.gl.bindBuffer(
        this.gl.ARRAY_BUFFER,
        object.vertex_position_buffer
      );
      this.gl.bufferData(
        this.gl.ARRAY_BUFFER,
        new Float32Array(object.model.vertex_positions),
        this.gl.STATIC_DRAW
      );
      
      object.vertex_normal_buffer = this.gl.createBuffer();
      this.gl.bindBuffer(this.gl.ARRAY_BUFFER, object.vertex_normal_buffer);
      this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(object.model.vertex_normals), this.gl.STATIC_DRAW);
      
      
      object.face_buffer = this.gl.createBuffer();
      this.gl.bindBuffer(
        this.gl.ELEMENT_ARRAY_BUFFER,
        object.face_buffer
      );
      this.gl.bufferData(
        this.gl.ELEMENT_ARRAY_BUFFER,
        new Uint16Array(object.model.faces),
        this.gl.STATIC_DRAW
      );
      
    }, this);
    
  }
  
  draw(time) {
    this.gl.clearColor(0.8, 0.8, 0.8, 1.0);
    this.gl.clearDepth(1.0);
    
    this.gl.useProgram(this.program_info.program);
    
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
    let camera_translation = [
      camera_matrix[8] * this.view_distance + this.focus[0],
      camera_matrix[9] * this.view_distance + this.focus[1],
      camera_matrix[10] * this.view_distance + this.focus[2]
    ];
    
    for(let i = 0; i < this.object_groups.length; i++) {
      let object_group = this.object_groups[i];
      this.draw_object_group(object_group, camera_translation, view_matrix, perspective_matrix);
    }
    for(let i = 0; i < this.objects.length; i++) {
      let object = this.objects[i];
      this.draw_object(object, camera_translation, view_matrix, perspective_matrix);
    }
  }
  
  draw_object(object, camera_translation, view_matrix, perspective_matrix) {
    this.gl.uniform3f(
      this.program_info.uniform_locations.camera_translation,
      camera_translation[0],
      camera_translation[1],
      camera_translation[2]
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
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, object.vertex_position_buffer);
    this.gl.enableVertexAttribArray(this.program_info.attribute_locations.vertex_position);
    this.gl.vertexAttribPointer(
      this.program_info.attribute_locations.vertex_position,
      3,
      this.gl.FLOAT,
      false,
      0,
      0
    );
    
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, object.vertex_normal_buffer);
    this.gl.enableVertexAttribArray(this.program_info.attribute_locations.vertex_normal);
    this.gl.vertexAttribPointer(
      this.program_info.attribute_locations.vertex_normal,
      3,
      this.gl.FLOAT,
      false,
      0,
      0
    );
    
    this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, object.face_buffer);
    //alert(object_group.position_buffer.toString());
    
    this.gl.drawElements(
      this.gl.TRIANGLES,
      Math.round(object.model.faces.length),
      this.gl.UNSIGNED_SHORT,
      0,
    );
  }
  
  draw_object_group(object_group, camera_translation, view_matrix, perspective_matrix) {
    this.gl.uniform3f(
      this.program_info.uniform_locations.camera_translation,
      camera_translation[0],
      camera_translation[1],
      camera_translation[2]
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
    
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, object_group.vertex_normal_buffer);
    this.gl.enableVertexAttribArray(this.program_info.attribute_locations.vertex_normal);
    this.gl.vertexAttribPointer(
      this.program_info.attribute_locations.vertex_normal,
      3,
      this.gl.FLOAT,
      false,
      0,
      0
    );
    
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, object_group.color_buffer);
    this.gl.enableVertexAttribArray(this.program_info.attribute_locations.color);
    this.gl.vertexAttribPointer(this.program_info.attribute_locations.color, 3, this.gl.FLOAT, false, 0, 0);
    this.gl.vertexAttribDivisor(this.program_info.attribute_locations.color, 1);
    
    
    //alert(String(object_group.positions));
    
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, object_group.position_buffer);
    this.gl.bufferData(
      this.gl.ARRAY_BUFFER,
      new Float32Array(object_group.model.positions),
      this.gl.DYNAMIC_DRAW
    );
    this.gl.enableVertexAttribArray(this.program_info.attribute_locations.position);
    this.gl.vertexAttribPointer(this.program_info.attribute_locations.position, 3, this.gl.FLOAT, false, 0, 0);
    this.gl.vertexAttribDivisor(this.program_info.attribute_locations.position, 1);
    
    this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, object_group.face_buffer);
    //alert(object_group.position_buffer.toString());
    
    this.gl.drawElementsInstanced(
      this.gl.TRIANGLES,
      Math.round(object_group.model.faces.length),
      this.gl.UNSIGNED_SHORT,
      0,
      Math.round(object_group.positions.length / 3)
    );
  }
}

export {scene};