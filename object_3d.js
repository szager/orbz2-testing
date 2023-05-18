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
      
      let orbee_colors = [
        [1, 0, 0],
        [1, 1, 0],
        [0, 1, 0],
        [0, 0.2, 1],
        [1, 1, 1,]
      ];
      this.colors = this.colors.concat(orbee_colors[i % orbee_colors.length]);
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