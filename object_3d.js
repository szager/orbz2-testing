class object_3d {
  constructor(model, position, color, texture) {
    this.model = model;
    this.position = position;
    this.color = color;
    this.texture = texture;
  }
}

class group_3d {
  constructor(model, count) {
    this.model = model;
    this.positions = [];
    this.colors = [];
    this.count = count;
    for(let i = 0; i < this.count; i++) {
      this.positions.push(Math.random() * 100 - 50);
      this.positions.push(Math.random() * 100 - 50);
      this.positions.push(Math.random() * 100 - 50);
      this.colors.push(Math.random());
      this.colors.push(Math.random());
      this.colors.push(Math.random());
    }
  }
}

export {object_3d, group_3d};