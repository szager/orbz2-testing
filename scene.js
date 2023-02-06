

class scene {
  constructor(canvas) {
    this.canvas = canvas;
    this.gl = this.canvas.getContext("webgl");
    
    
    this.vertex_positions = [
      0.0, -1.0, 0.0,
      -1.0, 1.0, 0.0,
      1.0, 1.0, 0.0,
    ];
    
    this.vertex_normals = [
      0.0, 0.0, 1.0,
      0.0, 0.0, 1.0,
      0.0, 0.0, 1.0,
    ];
    
    this.object_indices = [
      0,
      0,
      0,
    ];
    
    this.object_translations = [
      0, 0, 0
    ];
    
    this.object_colors = [
      0.9, 0.6, 0.3,
    ];
    
    this.faces = [
      0, 1, 2,
    ];
    
    
    this.camera_rotation = [0, 0, 0];
    
    this.camera_translation = [0, 0, -4];
    
    
    this.vertex_shader_source = `
      attribute vec3 vertex_position;
      attribute vec3 vertex_normal;
      attribute float object_index;
      
      uniform vec3 object_positions[1002];
      uniform vec3 object_colors[1002];
      
      uniform mediump vec3 light_directions[4];
      uniform mediump vec3 light_colors[4];
      
      uniform mat4 perspective_matrix;
      uniform mat4 camera_rotation_matrix;
      uniform mat3 normal_matrix;
      
      uniform highp vec3 camera_translation;
      
      varying highp vec3 transformed_normal;
      varying lowp vec3 vertex_color;
      
      varying highp vec3 relative_position;
      
      void main(void) {
        transformed_normal = normalize(normal * normal_matrix);
        mediump int int_object_index = int(object_index);
        vertex_color = object_colors[int_object_index];
        relative_position = position + object_translations[int_object_index] - camera_translation;
        gl_Position = camera_rotation_matrix * perspective_matrix * vec4(relative_position, 1.0);
      }
    `;
    this.fragment_shader_source = `
      void main(void) {
        gl_FragColor = vec4(0.9, 0.6, 0.3, 1.0);
      }
    `;
    
    
    this.vertex_shader = this.gl.createShader(this.gl.VERTEX_SHADER);
    this.fragment_shader = this.gl.createShader(this.gl.FRAGMENT_SHADER);
    this.gl.shaderSource(this.vertex_shader, this.vertex_shader_source);
    this.gl.shaderSource(this.fragment_shader, this.fragment_shader_source);
    this.shader_program = this.gl.createProgram();
    this.gl.attachShader(this.shader_program, this.vertex_shader);
    this.gl.attachShader(this.shader_program, this.fragment_shader);
    this.gl.linkProgram(this.shader_program);
    
    this.program_info = {
      program: this.shader_program,
      attribute_locations: {
        vertex_position: this.gl.getAttribLocation(this.shader_program, "vertex_position"),
        vertex_normal: this.gl.getAttribLocation(this.shader_program, "vertex_normal"),
        object_index: this.gl.getAttribLocation(this.shader_program, "object_index"),
      },
      uniform_locations: {
        perspective_matrix: this.gl.getUniformLocation(this.shader_program, "perspective_matrix"),
        camera_rotation_matrix: this.gl.getUniformLocation(this.shader_program, "camera_rotation_matrix"),
        normal_matrix: this.gl.getUniformLocation(this.shader_program, "normal_matrix"),
        object_translations: this.gl.getUniformLocation(this.shader_program, "object_translations"),
        object_colors: this.gl.getUniformLocation(this.shader_program, "object_colors"),
        light_directions: this.gl.getUniformLocation(this.shader_program, "light_directions"),
        light_colors: this.gl.getUniformLocation(this.shader_program, "light_colors")
      },
    };
  }
  
  initialize_buffers() {
    this.float32_object_colors = new Float32Array(this.object_colors);
    this.float32_light_colors = new Float32Array(this.light_colors);
    this.float32_light_directions = new Float32Array(this.light_directions);

    this.vertex_position_buffer = this.gl.createBuffer();
    this.gl.bindBuffer(
      this.gl.ARRAY_BUFFER,
      this.vertex_position_buffer
    );
    this.gl.bufferData(
      this.gl.ARRAY_BUFFER,
      new Float32Array(this.vertex_positions),
      this.gl.STATIC_DRAW
    );

    this.object_index_buffer = this.gl.createBuffer();
    this.gl.bindBuffer(
      this.gl.ARRAY_BUFFER,
      this.object_index_buffer
    );
    this.gl.bufferData(
      this.gl.ARRAY_BUFFER,
      new Float32Array(this.object_indices),
      this.gl.STATIC_DRAW
    );

    this.face_buffer = this.gl.createBuffer();
    this.gl.bindBuffer(
      this.gl.ELEMENT_ARRAY_BUFFER,
      this.face_buffer
    );
    this.gl.bufferData(
      this.gl.ELEMENT_ARRAY_BUFFER,
      new Uint16Array(this.faces),
      this.gl.STATIC_DRAW
    );

    this.vertex_normal_buffer = this.gl.createBuffer();
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.vertex_normal_buffer);
    this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(this.vertex_normals), this.gl.STATIC_DRAW);
  }
  
  draw() {
    this.gl.clearColor(0.8, 0.8, 0.8, 1.0);
    this.gl.enable(this.gl.DEPTH_TEST);
    this.gl.depthFunc(this.gl.LEQUAL);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
    let camera_rotation_matrix = mat4.create();
    let perspective_matrix = mat4.create();
    mat4.perspective(
      perspective_matrix,
      fov,
      aspect_ratio,
      min_distance,
      max_distance
    );
    mat4.rotate(camera_rotation_matrix, camera_rotation_matrix, camera_rotation[0], [-1, 0, 0]);
    mat4.rotate(camera_matrix, camera_matrix, camera_rotation[1], [0, -1, 0]);
    mat4.rotate(camera_matrix, camera_matrix, camera_rotation[2], [0, 0, -1]);
    mat4.translate(camera_matrix, camera_matrix, camera_translation.map(n => -n));
    let scene_matrix = mat4.create();
  //mat4.rotate(scene_matrix, scene_matrix, time * 0.018403, [1.0, 0.0, 0.0]);
  //mat4.rotate(scene_matrix, scene_matrix, time * 0.023485, [0.0, 1.0, 0.0]);
  //mat4.rotate(scene_matrix, scene_matrix, time * 0.047634, [0.0, 0.0, 1.0]);
    let normal_matrix = mat3.create();
    mat3.normalFromMat4(normal_matrix, scene_matrix);
  
  
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
    gl.uniform3fv(
      program_info.uniform_locations.object_colors,
      float32_object_colors
    );
  
  
    gl.uniform3fv(
      program_info.uniform_locations.light_directions,
      float32_light_directions
    );
    gl.uniform3fv(
      program_info.uniform_locations.light_colors,
      float32_light_colors
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
}

export {scene};