class object_3d {
  constructor(model, position, transform, texture_url) {
    this.model = model;
    this.position = position;
    this.transform = transform;
    this.texture_url = texture_url;
  }
}

class group_3d {
  constructor(model, count) {
    this.model = model;
    this.positions = [];
    this.colors = [];
    this.count = count;
    for(let i = 0; i < this.count; i++) {
      this.positions.push(Math.random() * 400 - 200);
      this.positions.push(Math.random() * 400 - 200);
      this.positions.push(Math.random() * 250 - 100);
      this.colors.push(Math.random());
      this.colors.push(Math.random());
      this.colors.push(Math.random());
    }
  }
}

export {object_3d, group_3d};