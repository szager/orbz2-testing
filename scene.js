class scene {
  constructor(canvas, vertex_shader_source, fragment_shader_source) {
    this.canvas = canvas;
    this.gl = this.canvas.getContext("webgl");
    this.vertex_positions = [];
    this.faces = [];
    this.vertex_object_indices = [];
    this.object_translations = [];
    this.object_colors = [];
    this.camera_rotation = [0, 0, 0];
    this.camera_translation = [0, 0, 0];
    this.vertex_shader = this.gl.createShader(this.gl.FRAGMENT_SHADER);
    this.fragment_shader = this.gl.createShader(this.gl.FRAGMENT_SHADER);
    this.gl.shaderSource(this.vertex_shader, vertex_shader_source);
    this.gl.shaderSource(this.fragment_shader, fragment_shader_source);
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
        projection_matrix: gl.getUniformLocation(shader_program, "camera_matrix"),
        _matrix: gl.getUniformLocation(shader_program, "scene_matrix"),
        normal_matrix: gl.getUniformLocation(shader_program, "normal_matrix"),
        object_positions: gl.getUniformLocation(shader_program, "object_positions"),
        object_colors: gl.getUniformLocation(shader_program, "object_colors"),
        light_directions: gl.getUniformLocation(shader_program, "light_directions"),
        light_colors: gl.getUniformLocation(shader_program, "light_colors")
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