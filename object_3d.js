class object_3d {
  constructor(model, position, color) {
    this.model = model;
    this.position = position;
    this.color = color;
  }
}

class group_3d {
  constructor(model, count) {
    this.model = model;
    this.positions = [];
    this.colors = [];
    for(let i = 0; i < count; i++) {
      this.positions.push(Math.random() * 1000 - 500);
      this.positions.push(Math.random() * 1000 - 500);
      this.positions.push(Math.random() * 1000 - 500);
      this.colors.push(Math.random());
      this.colors.push(Math.random());
      this.colors.push(Math.random());
    }
  }
}

export {object_3d, group_3d};