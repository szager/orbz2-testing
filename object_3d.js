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
      //197.0, -147.0, -100;
      this.positions.push(Math.random() * 48 + 145);
      this.positions.push(Math.random() * 96 - 195);
      this.positions.push(Math.random() * 186 - 88);
      this.colors.push(Math.random());
      this.colors.push(Math.random());
      this.colors.push(Math.random());
    }
  }
  
  copy_orbee_positions(orbeez) {
    let num_positions = Math.min(this.count, orbeez.length); 
    for(let i = 0; i < num_positions; i++) {
      this.positions[i * 3] = orbeez[i].x;
      this.positions[i * 3 + 1] = orbeez[i].y;
      this.positions[i * 3 + 2] = orbeez[i].z;
    }
  }
}

export {object_3d, group_3d};