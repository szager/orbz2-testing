class scene {
  constructor(canvas) {
    this.canvas = canvas;
    this.gl = this.canvas.getContext("webgl");
    this.vertex_positions = [];
    this.faces = [];
    this.vertex_object_indices = [];
    this.object_translations = [];
    this.object_colors = [];
    this.camera_rotation = [0, 0, 0];
    this.camera_translation = [0, 0, 0];
  }
  initialize_buffers() {
    
  }
  draw() {
    this.gl.clearColor(0.8, 0.8, 0.8, 1.0);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT);
  }
}

export {scene};