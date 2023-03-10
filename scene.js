class scene {
  constructor(canvas, object_count) {
    this.canvas = canvas;
    this.gl = this.canvas.getContext("webgl");
    this.fov = .5;
    this.aspect_ratio = this.canvas.width / this.canvas.height;
    this.min_distance = 10;
    this.max_distance = 100000;
    
    this.vertex_positions = [
    ];
    
    //let recipSqrt3 = 1 / Math.sqrt(3);
    
    this.vertex_normals = [
    ];
    
    this.object_indices = [
    ];
    
    this.object_translations = [
    ];
    
    //this.object_colors = [
    //];
    
    //this.object_shininess = [
    //];
    
    this.faces = [
    ];
    
    
    this.pitch = .2;
    this.yaw = 0;
    this.view_distance = 700;
    this.focus = [0, 0, 100];
    
    
    this.vertex_shader_source = `
      attribute vec3 vertex_position;
      attribute vec3 vertex_normal;
      attribute float object_index;
      
      uniform vec3 object_translations[${object_count}];
      //uniform vec3 object_colors[${object_count}];
      //uniform float object_shininess[${object_count}];
      
      uniform mat4 perspective_matrix;
      uniform mat4 view_matrix;
      
      uniform vec3 camera_translation;
      
      //varying lowp vec3 vertex_color;
      varying highp vec3 relative_position;
      varying highp vec3 fragment_normal;
      //varying lowp float shininess;
      
      void main() {
        mediump int int_object_index = int(object_index);
        fragment_normal = vertex_normal;
        //vertex_color = object_colors[int_object_index];
        //shininess = object_shininess[int_object_index];
        relative_position = (vertex_position + object_translations[int_object_index]) - camera_translation;
        gl_Position = perspective_matrix * view_matrix * vec4(relative_position, 1.0);
        //gl_Position = perspective_matrix * vec4(relative_position.xyz, 1.0);
      }
    `;

    this.fragment_shader_source = `
      varying highp vec3 relative_position;
      varying highp vec3 fragment_normal;
      //varying highp vec3 vertex_color;
      //varying lowp float shininess;
      void main() {
        highp vec3 color = vec3(0.55, 0.45, 0.5);
        highp vec3 n = normalize(fragment_normal);
        highp vec3 e = normalize(-relative_position);
        highp vec3 r = reflect(-e, n);
        highp float view_cosine = dot(e, n);
        highp float fresnel = pow(1.0 - abs(view_cosine), 5.0);
        highp vec3 white = vec3(1.0, 1.0, 1.0);
        highp vec3 up = vec3(0.0, 0.0, 1.0);
        highp float up_cos = dot(up, n);
        highp float up_r_cos = dot(up, r);
        highp float diffuse = (up_cos + 1.0) * 0.25 + 0.5;
        highp float specular = pow(max(up_r_cos, 0.0), 32.0) * (fresnel * 0.7 + 0.3) + fresnel;
        //gl_FragColor = vec4(vertex_color * diffuse + white * specular * shininess, 1.0);
        gl_FragColor = vec4(color * diffuse + white * specular, 1.0);
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
        view_matrix: this.gl.getUniformLocation(this.shader_program, "view_matrix"),
        object_translations: this.gl.getUniformLocation(this.shader_program, "object_translations"),
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
    this.gl.drawElements(this.gl.TRIANGLES, this.faces.length, this.gl.UNSIGNED_SHORT, 0);
    //alert(JSON.stringify(view_matrix, null, 1));
  }
}

export {scene};