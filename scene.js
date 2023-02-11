class scene {
  constructor(canvas) {
    this.canvas = canvas;
    this.gl = this.canvas.getContext("webgl");
    this.fov = .8;
    this.aspect_ratio = this.canvas.width / this.canvas.height;
    this.min_distance = 0.1;
    this.max_distance = 100;
    
    this.vertex_positions = [
      0.1, -0.6, -0.2,
      -0.9, 0.3, 0.5,
      1.3, 0.9, -0.7,
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
      0, 0, 2,
      -0.3, 0.1, 0.5
    ];
    
    this.object_colors = [
      0.9, 0.6, 0.3,
      0.2, 0.8, 0.7,
    ];
    
    this.faces = [
      0, 1, 2,
    ];
    
    
    this.camera_rotation = [0, 0, 0];
    
    this.camera_translation = [0, 0, -2];
    
    this.vertex_shader_source = `
      attribute vec3 vertex_position;
      attribute vec3 vertex_normal;
      attribute float object_index;
      
      uniform vec3 object_translations[2];
      uniform vec3 object_colors[2];
      
      uniform mat4 perspective_matrix;
      uniform mat4 camera_rotation_matrix;
      
      uniform vec3 camera_translation;
      
      varying lowp vec3 vertex_color;
      varying highp vec3 relative_position;
      varying highp vec3 fragment_normal;
      
      void main() {
        mediump int int_object_index = int(object_index);
        fragment_normal = vertex_normal;
        vertex_color = object_colors[int_object_index];
        relative_position = vertex_position + object_translations[int_object_index] - camera_translation;
        gl_Position = (perspective_matrix * camera_rotation_matrix * vec4(relative_position, 1.0));
        //gl_Position = vec4(vertex_position.xy, 0.6, 0.9);
      }
    `;

    this.fragment_shader_source = `
      varying highp vec3 fragment_normal;
      void main() {
        gl_FragColor = vec4(0.9, 0.6, 0.3, 1.0);
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
        vertex_normal: this.gl.getAttribLocation(this.shader_program, "vertex_normal"),
        object_index: this.gl.getAttribLocation(this.shader_program, "object_index"),
      },
      uniform_locations: {
        perspective_matrix: this.gl.getUniformLocation(this.shader_program, "perspective_matrix"),
        camera_rotation_matrix: this.gl.getUniformLocation(this.shader_program, "camera_rotation_matrix"),
        object_translations: this.gl.getUniformLocation(this.shader_program, "object_translations"),
        object_colors: this.gl.getUniformLocation(this.shader_program, "object_colors"),
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
    this.float32_object_colors = new Float32Array(this.object_colors);

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
    this.gl.clearDepth(1.0);
    this.gl.enable(this.gl.DEPTH_TEST);
    this.gl.depthFunc(this.gl.LEQUAL);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
    let camera_rotation_matrix = mat4.create();
    let perspective_matrix = mat4.create();
    mat4.perspective(
      perspective_matrix,
      this.fov,
      this.aspect_ratio,
      this.min_distance,
      this.max_distance
    );
    mat4.rotate(camera_rotation_matrix, camera_rotation_matrix, this.camera_rotation[0], [1, 0, 0]);
    mat4.rotate(camera_rotation_matrix, camera_rotation_matrix, this.camera_rotation[1], [0, 1, 0]);
    mat4.rotate(camera_rotation_matrix, camera_rotation_matrix, this.camera_rotation[2], [0, 0, 1]);
  
  
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.vertex_position_buffer);
    this.gl.vertexAttribPointer(
      this.program_info.attribute_locations.vertex_position,
      3,
      this.gl.FLOAT,
      false,
      0,
      0
    );
    
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.vertex_normal_buffer);
    this.gl.vertexAttribPointer(
      this.program_info.attribute_locations.vertex_normal,
      3,
      this.gl.FLOAT,
      false,
      0,
      0
    );
    
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.object_index_buffer);
    this.gl.vertexAttribPointer(
      this.program_info.attribute_locations.object_index,
      1,
      this.gl.FLOAT,
      false,
      0,
      0
    );
    
    this.gl.enableVertexAttribArray(this.program_info.attribute_locations.vertex_position);
    this.gl.enableVertexAttribArray(this.program_info.attribute_locations.vertex_normal);
    this.gl.enableVertexAttribArray(this.program_info.attribute_locations.object_index);
    
    this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, this.face_buffer);
    this.gl.useProgram(this.program_info.program);

    this.gl.uniform3fv(
      this.program_info.uniform_locations.object_translations,
      new Float32Array(this.object_translations)
    );
    this.gl.uniform3fv(
      this.program_info.uniform_locations.object_colors,
      this.float32_object_colors
    );
    this.gl.uniform3f(
      this.program_info.uniform_locations.camera_translation,
      this.camera_translation[0],
      this.camera_translation[1],
      this.camera_translation[2]
    );

  
    this.gl.uniformMatrix4fv(
      this.program_info.uniform_locations.perspective_matrix,
      false,
      perspective_matrix
    );
    this.gl.uniformMatrix4fv(
      this.program_info.uniform_locations.camera_rotaion_matrix,
      false,
      camera_rotation_matrix
    );
    this.gl.drawElements(this.gl.TRIANGLES, this.faces.length, this.gl.UNSIGNED_SHORT, 0);
    //alert("e");
  }
}

export {scene};