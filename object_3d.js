class object_3d {
  constructor(model, translation, color) {
    this.model = model;
    this.translation = translation;
    this.color = color;
  }
}

class group_3d {
  constructor(model, count) {
    this.model = model;
    this.instances = [];
    for(let i = 0; i < count; i++) {
      this.instances.push({
        translation: [0.0, 0.0, 0.0],
        color: [0.5, 0.25, 0.9]
      });
    }
  }
}

export {object_3d, group_3d};