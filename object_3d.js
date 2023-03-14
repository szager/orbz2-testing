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
      this.positions.push(0);
      this.positions.push(0);
      this.positions.push(0);
      this.colors.push(0.5);
      this.colors.push(0.25);
      this.colors.push(0.125);
    }
  }
}

export {object_3d, group_3d};