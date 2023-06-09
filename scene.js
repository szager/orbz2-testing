import {constants} from "./constants.js";
import {group_3d} from "./object_3d.js";
import {object_3d} from "./object_3d.js";
import {models} from "./models.js";

let beautiful_image = new Image();
beautiful_image.src = "https://cdn.glitch.global/e7cbcc0a-13a1-4d09-b0ab-538eef5ec805/pug_again.jpg?v=1681751131676";
console.log(beautiful_image);

class scene {
  constructor(gl, postionBuf) {
    this.gl = gl;
    this.positionBuf = positionBuf;
    this.fov = constants.fov;
    this.aspect_ratio = gl.drawingBufferWidth / gl.drawingBufferHeight;
    this.min_distance = constants.near_distance;
    this.max_distance = constants.far_distance;
    
    this.objects = [
      new object_3d(models.floor, [0.0, 0.0, -100], mat3.create(), "textures/floor_beta.png"), //0
      new object_3d(models.walls, [0.0, 0.0, -100], mat3.create(), "textures/walls_beta.png"), //1
      new object_3d(models.trim, [0.0, 0.0, -100], mat3.create(), "textures/pug.jpg"), //2
      new object_3d(models.ceiling, [0.0, 0.0, -100], mat3.create(), "textures/pug.jpg"), //3
      new object_3d(models.shelf, [197.0, -147.0, -100], mat3.create(), "textures/funny_dog.png"), //4
      new object_3d(models.picture_frame_stand, [157.1, -121.8, 100], mat3.create(), "textures/pug.jpg"), //5
    ];
    
    this.object_groups = [
      new group_3d(models.orbee_model, constants.orbee_count)
    ];
    
    this.pitch = .8;
    this.yaw = 0;
    this.view_distance = 42;
    this.focus = [0, 0, 8];
    
    this.light_positions = [
      100, 225, 50,
      -100, 225, 50,
      0, 0, 140,
    ];
    
    //this.object_group_program_info = this.create_object_group_program_old();
    //this.textured_object_program_info = this.create_textured_object_program_old();
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
  
  create_object_group_program() {
    let bound_this = this;

    return Promise.all([
      fetch('object-group-vshader.glsl')
        .then(response => response.text())
        .then(txt => bound_this.load_shader(bound_this.gl.VERTEX_SHADER, txt)),      
      fetch('object-group-fshader.glsl')
        .then(response => response.text())
        .then(txt => bound_this.load_shader(bound_this.gl.FRAGMENT_SHADER, txt))
    ]).then(result => {
      let vertex_shader = result[0];
      let fragment_shader = result[1];
      let shader_program = bound_this.gl.createProgram();
      bound_this.gl.attachShader(shader_program, vertex_shader);
      bound_this.gl.attachShader(shader_program, fragment_shader);
      bound_this.gl.linkProgram(shader_program);

      let program_info = {
        program: shader_program,
        attribute_locations: {
          vertex_position: bound_this.gl.getAttribLocation(shader_program, "vertex_position"),
          vertex_normal: bound_this.gl.getAttribLocation(shader_program, "vertex_normal"),
          color: bound_this.gl.getAttribLocation(shader_program, "color"),
          position: bound_this.gl.getAttribLocation(shader_program, "position"),
        },
        uniform_locations: {
          perspective_matrix: bound_this.gl.getUniformLocation(shader_program, "perspective_matrix"),
          view_matrix: bound_this.gl.getUniformLocation(shader_program, "view_matrix"),
          camera_translation: bound_this.gl.getUniformLocation(shader_program, "camera_translation"),
          light_positions: bound_this.gl.getUniformLocation(shader_program, "light_positions"),
        },
      };
      return program_info;
    });
  }
  
  create_textured_object_program() {
    let bound_this = this;

    return Promise.all([
      fetch('textured-object-vshader.glsl')
        .then(response => response.text())
        .then(txt => bound_this.load_shader(bound_this.gl.VERTEX_SHADER, txt)),
      fetch('textured-object-fshader.glsl')
        .then(response => response.text())
        .then(txt => bound_this.load_shader(bound_this.gl.FRAGMENT_SHADER, txt))
    ]).then(result => {
      let vertex_shader = result[0];
      let fragment_shader = result[1];
      let shader_program = bound_this.gl.createProgram();
      bound_this.gl.attachShader(shader_program, vertex_shader);
      bound_this.gl.attachShader(shader_program, fragment_shader);
      bound_this.gl.linkProgram(shader_program);
    
      let program_info = {
        program: shader_program,
        attribute_locations: {
          vertex_position: bound_this.gl.getAttribLocation(shader_program, "vertex_position"),
          vertex_normal: bound_this.gl.getAttribLocation(shader_program, "vertex_normal"),
          vertex_uv: bound_this.gl.getAttribLocation(shader_program, "vertex_uv")
        },
        uniform_locations: {
          transform: bound_this.gl.getUniformLocation(shader_program, "transform"),
          diffuse_sampler: bound_this.gl.getUniformLocation(shader_program, "diffuse_sampler"),
          position: bound_this.gl.getUniformLocation(shader_program, "position"),
          perspective_matrix: bound_this.gl.getUniformLocation(shader_program, "perspective_matrix"),
          view_matrix: bound_this.gl.getUniformLocation(shader_program, "view_matrix"),
          camera_translation: bound_this.gl.getUniformLocation(shader_program, "camera_translation"),
          light_positions: bound_this.gl.getUniformLocation(shader_program, "light_positions"),
        }
      };
    
      return program_info;
    });
  }

  load_shaders() {
    let bound_this = this;
    return Promise.all([this.create_object_group_program(),
                        this.create_textured_object_program()])
    .then(result => {
      bound_this.object_group_program_info = result[0];
      bound_this.textured_object_program_info = result[1];
    });
  }
  
  async load_texture(url) {
    let image = new Image();
    image.src = url;
    let texture = this.gl.createTexture();
    this.gl.bindTexture(this.gl.TEXTURE_2D, texture);
    this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_S, this.gl.REPEAT);
    this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_T, this.gl.REPEAT);
    this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MIN_FILTER, this.gl.LINEAR);
    this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MAG_FILTER, this.gl.LINEAR);
    
    this.gl.texImage2D(this.gl.TEXTURE_2D, 0, this.gl.RGBA, 1, 1, 0, this.gl.RGBA, this.gl.UNSIGNED_BYTE, new Uint8Array([255, 0, 255, 255]));
    
    
    await new Promise(function(resolve, reject) {
      this.onload = resolve;
    }.bind(image));
    this.gl.bindTexture(this.gl.TEXTURE_2D, texture);
    this.gl.texImage2D(this.gl.TEXTURE_2D, 0, this.gl.RGBA, this.gl.RGBA, this.gl.UNSIGNED_BYTE, image);
    //this.gl.generateMipmap(this.gl.TEXTURE_2D);
    return texture;
  }
  
  async load_the_pug_texture() {
    this.load_texture("./textures/pug.jpg").then(
      function(texture) {
        this.pug_texture = texture;
      }.bind(this)
    );
  }
  
  async load_textures() {
    for(let i = 0; i < this.objects.length; i++) {
      let object = this.objects[i];
      await this.load_texture(object.texture_url).then(
        function(texture) {
          this.texture = texture;
        }.bind(object)
      ); //This code is could easily be optimised but no
    }
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
      
      object_group.position_buffer = this.positionBuf;
      // this.gl.bindBuffer(
      //   this.gl.ARRAY_BUFFER,
      //   object_group.position_buffer
      // );
      // this.gl.bufferData(
      //   this.gl.ARRAY_BUFFER,
      //   new Float32Array(object_group.positions),
      //   this.gl.DYNAMIC_DRAW
      // );
      object_group.color_buffer = this.gl.createBuffer();
      this.gl.bindBuffer(
        this.gl.ARRAY_BUFFER,
        object_group.color_buffer
      );
      this.gl.bufferData(
        this.gl.ARRAY_BUFFER,
        new Float32Array(object_group.colors),
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
      
      object.uv_buffer = this.gl.createBuffer();
      this.gl.bindBuffer(this.gl.ARRAY_BUFFER, object.uv_buffer);
      this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(object.model.uv_map), this.gl.STATIC_DRAW);
      
      
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
  
  
  draw_everything(time) {
    if (!this.object_group_program_info || !this.textured_object_program_info) {
      return;
    }
    //this.gl.useProgram(this.textured_object_program_info.program);
    
    this.gl.clearColor(0.1, 0.2, 0.95, 1.0);
    this.gl.clearDepth(1.0);
    
    this.gl.enable(this.gl.DEPTH_TEST);
    this.gl.depthFunc(this.gl.LEQUAL);
    this.gl.enable(this.gl.BLEND);
    this.gl.blendFunc(this.gl.SRC_ALPHA, this.gl.ONE_MINUS_SRC_ALPHA);
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
    
    this.gl.useProgram(this.textured_object_program_info.program);    
    for (let i = 0; i < this.objects.length; i++) {
      let object = this.objects[i];
      this.draw_object(object, camera_translation, view_matrix, perspective_matrix);
    }

    for(let i = 0; i < this.object_groups.length; i++) {
      this.gl.useProgram(this.object_group_program_info.program);
      let object_group = this.object_groups[i];
      this.draw_object_group(object_group, camera_translation, view_matrix, perspective_matrix);
    }
  }
  
  draw_object(object, camera_translation, view_matrix, perspective_matrix) {
    
    //this.gl.useProgram(this.object_group_program_info.program);
    
    this.gl.uniform3f(
      this.textured_object_program_info.uniform_locations.camera_translation,
      camera_translation[0],
      camera_translation[1],
      camera_translation[2]
    );
    
    this.gl.uniform3f(
      this.textured_object_program_info.uniform_locations.position,
      object.position[0],
      object.position[1],
      object.position[2]
    );
    
    this.gl.uniform3fv(
      this.textured_object_program_info.uniform_locations.light_positions,
      this.light_positions
    );
    
    this.gl.uniformMatrix3fv(
      this.textured_object_program_info.uniform_locations.transform,
      false,
      object.transform
    );
    
  
    this.gl.uniformMatrix4fv(
      this.textured_object_program_info.uniform_locations.perspective_matrix,
      false,
      perspective_matrix
    );

    this.gl.uniformMatrix4fv(
      this.textured_object_program_info.uniform_locations.view_matrix,
      false,
      view_matrix
    );
    
    this.gl.uniform1i(
      this.textured_object_program_info.uniform_locations.diffuse_sampler,
      0
    );
    this.gl.activeTexture(this.gl.TEXTURE0);
    this.gl.bindTexture(this.gl.TEXTURE_2D, object.texture);
    
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, object.vertex_position_buffer);
    this.gl.enableVertexAttribArray(this.textured_object_program_info.attribute_locations.vertex_position);
    this.gl.vertexAttribPointer(
      this.textured_object_program_info.attribute_locations.vertex_position,
      3,
      this.gl.FLOAT,
      false,
      0,
      0
    );
    
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, object.uv_buffer);
    this.gl.enableVertexAttribArray(this.textured_object_program_info.attribute_locations.vertex_uv);
    this.gl.vertexAttribPointer(
      this.textured_object_program_info.attribute_locations.vertex_uv,
      2,
      this.gl.FLOAT,
      false,
      0,
      0
    );
    
    
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, object.vertex_normal_buffer);
    this.gl.enableVertexAttribArray(this.textured_object_program_info.attribute_locations.vertex_normal);
    this.gl.vertexAttribPointer(
      this.textured_object_program_info.attribute_locations.vertex_normal,
      3,
      this.gl.FLOAT,
      false,
      0,
      0
    );
    
    this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, object.face_buffer);
    //alert(object_group.position_buffer.toString());
    //this.gl.useProgram(this.textured_object_program_info.program);
    
    this.gl.drawElements(
      this.gl.TRIANGLES,
      Math.round(object.model.faces.length),
      this.gl.UNSIGNED_SHORT,
      0,
    );
  }
  
  
  draw_object_group(object_group, camera_translation, view_matrix, perspective_matrix) {
    this.gl.uniform3f(
      this.object_group_program_info.uniform_locations.camera_translation,
      camera_translation[0],
      camera_translation[1],
      camera_translation[2]
    );
    
  
    this.gl.uniformMatrix4fv(
      this.object_group_program_info.uniform_locations.perspective_matrix,
      false,
      perspective_matrix
    );

    this.gl.uniformMatrix4fv(
      this.object_group_program_info.uniform_locations.view_matrix,
      false,
      view_matrix
    );
    
    this.gl.uniform3fv(
      this.object_group_program_info.uniform_locations.light_positions,
      this.light_positions,
    );
    
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, object_group.vertex_position_buffer);
    this.gl.enableVertexAttribArray(this.object_group_program_info.attribute_locations.vertex_position);
    this.gl.vertexAttribPointer(
      this.object_group_program_info.attribute_locations.vertex_position,
      3,
      this.gl.FLOAT,
      false,
      0,
      0
    );
    
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, object_group.vertex_normal_buffer);
    this.gl.enableVertexAttribArray(this.object_group_program_info.attribute_locations.vertex_normal);
    this.gl.vertexAttribPointer(
      this.object_group_program_info.attribute_locations.vertex_normal,
      3,
      this.gl.FLOAT,
      false,
      0,
      0
    );
    
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, object_group.color_buffer);
    this.gl.enableVertexAttribArray(this.object_group_program_info.attribute_locations.color);
    this.gl.vertexAttribPointer(this.object_group_program_info.attribute_locations.color, 3, this.gl.FLOAT, false, 0, 0);
    this.gl.vertexAttribDivisor(this.object_group_program_info.attribute_locations.color, 1);
    
    
    //alert(String(object_group.positions));
    
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, object_group.position_buffer);
    // this.gl.bufferData(
    //   this.gl.ARRAY_BUFFER,
    //   new Float32Array(object_group.positions),
    //   this.gl.DYNAMIC_DRAW
    // );
    this.gl.enableVertexAttribArray(this.object_group_program_info.attribute_locations.position);
    this.gl.vertexAttribPointer(this.object_group_program_info.attribute_locations.position, 4, this.gl.FLOAT, false, 0, 0);
    this.gl.vertexAttribDivisor(this.object_group_program_info.attribute_locations.position, 1);
    
    this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, object_group.face_buffer);
    //alert(object_group.position_buffer.toString());
    
    this.gl.drawElementsInstanced(
      this.gl.TRIANGLES,
      Math.round(object_group.model.faces.length),
      this.gl.UNSIGNED_SHORT,
      0,
      Math.round(object_group.count)
    );
    
    this.gl.vertexAttribDivisor(this.object_group_program_info.attribute_locations.color, 0);
    this.gl.vertexAttribDivisor(this.object_group_program_info.attribute_locations.position, 0);
  }
}

export {scene};
