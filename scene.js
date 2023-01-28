class scene {
  constructor(canvas) {
    this.canvas = canvas;
    this.gl = this.canvas.getContext("webgl");
  }
  draw() {
    this.gl.clearColor(Math.random(), Math.random(), Math.random(), 1.0);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT);
  }
}

export {scene};