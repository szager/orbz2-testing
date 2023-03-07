class graph_displayer {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = this.canvas.getContext("2d");
  }
  add_value(value) {
    let image_data = this.ctx.getImageData(1, 0, this.canvas.width - 1, this.canvas.height);
    this.ctx.putImageData(image_data, 0, 0);
    this.ctx.fillStyle = "white";
    this.ctx.fillRect(this.canvas.width - 1, this.canvas.height - value, 1, value);
    this.ctx.fillStyle = "#0000ff80";
    this.ctx.fillRect(this.canvas.width - 1, this.canvas.height - 60, 1, 1);
  }
}

export {graph_displayer};