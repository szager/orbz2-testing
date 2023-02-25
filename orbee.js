import {orbee_model} from "./orbee_model.js";


class orbee {
  constructor(x1, y1, z1, x2, y2, z2, scene) {
    this.x = x1 + Math.random() * (x2 - x1);
    this.y = y1 + Math.random() * (y2 - y1);
    this.z = z1 + Math.random() * (z2 - z1);
    this.scene = scene;
    this.object_index = this.scene.object_colors.length;
    this.neighbor_count = 0;
    this.shiny = false;
    orbee_model.add_to_scene(this.scene);
  }
  update() {
    if(this.neighbor_count < 3) {
      this.shiny = true;
      this.scene.object_shininess[this.object_index / 3] = 1.0;
    }
    if(this.neighbor_count > 4) {
      this.shiny = false;
      this.scene.object_shininess[this.object_index / 3] = 0.0;
    }
    this.neighbor_count = 0;
    this.scene.object_translations[this.object_index] = this.x;
    this.scene.object_translations[this.object_index + 1] = this.y;
    this.scene.object_translations[this.object_index + 2] = this.z;
  }
}

export {orbee};