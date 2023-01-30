class scene {
  constructor(canvas) {
    this.canvas = canvas;
    this.gl = this.canvas.getContext("webgl");
    
    
    this.vertex_positions = [];
    
    this.object_indices = [];
    
    this.object_translations = [];
    
    this.object_colors = [];
        
    this.faces = [];
    
    
    this.camera_rotation = [0, 0, 0];
    
    this.camera_translation = [0, 0, 0];
    
    
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
    
  }
  
  draw() {
    this.gl.clearColor(0.8, 0.8, 0.8, 1.0);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT);
  }
}

export {scene};