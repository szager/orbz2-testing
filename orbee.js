import {orbee_model} from "./orbee_model.js";

console.log();// Ad = .47 * .001 * U^2 * 154 mm^2 * .00124 mg
//A = 1.54 cm^2
//P = 1 g / l
//Cd = 0.47

class orbee {
  constructor(x1, y1, z1, x2, y2, z2, scene) {
    this.x = x1 + Math.random() * (x2 - x1);
    this.y = y1 + Math.random() * (y2 - y1);
    this.z = z1 + Math.random() * (z2 - z1);
    this.dx = (Math.random() - 0.5) * 2;
    this.dy = (Math.random() - 0.5) * 2;
    this.dz = (Math.random() - 0.5) * 2;
    this.scene = scene;
    this.object_index = this.scene.object_colors.length;
    //this.neighbor_count = 0;
    //this.shiny = false;
    orbee_model.add_to_scene(this.scene);
  }
  update() {
    //if(this.neighbor_count < 4) {
      //this.shiny = true;
      //this.scene.object_shininess[this.object_index / 3] = 1.0;
    //}
    //if(this.neighbor_count > 5) {
      //this.shiny = false;
      //this.scene.object_shininess[this.object_index / 3] = 0.0;
    //}
    //this.neighbor_count = 0;
    
    //it should be half as fast as real life because slomo
    
    this.dz -= 1.4; // 1 mm/f² = 3.6 m/s²
    
    this.x += this.dx;
    this.y += this.dy;
    this.z += this.dz;
    
    if(this.z < 7) {
      this.z = 7;
      let horizontal_speed = Math.hypot(this.dx, this.dy);
      if(this.dz * 0.1 <= -horizontal_speed) {
        let horizontal_speed_slowed = Math.max(horizontal_speed + this.dz * 0.1, 0);
        let slowing_ratio = (horizontal_speed_slowed / horizontal_speed) || 0;
      
        this.dx *= slowing_ratio;
        this.dy *= slowing_ratio;
      } else {
        this.dx = 0;
        this.dy = 0;
      }
      this.dz *= -0.4;
    }
    
    this.scene.object_translations[this.object_index] = this.x;
    this.scene.object_translations[this.object_index + 1] = this.y;
    this.scene.object_translations[this.object_index + 2] = this.z;
  }
}

export {orbee};