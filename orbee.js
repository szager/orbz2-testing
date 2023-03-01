import {orbee_model} from "./orbee_model.js";
import {constants} from "./constants.js";

console.log();// Ad = .47 * .001 * U^2 * 154 mm^2 * .00124 mg
//A = 1.54 cm^2
//P = 1 g / l
//Cd = 0.47

class orbee {
  constructor(x1, y1, z1, x2, y2, z2, scene) {
    this.x = x1 + Math.random() * (x2 - x1);
    this.y = y1 + Math.random() * (y2 - y1);
    this.z = z1 + Math.random() * (z2 - z1);
    this.dx = (Math.random() - 0.5) * 96;
    this.dy = (Math.random() - 0.5) * 96;
    this.dz = (Math.random()) * 128;
    this.scene = scene;
    this.object_index = this.scene.object_colors.length;
    orbee_model.add_to_scene(this.scene);
  }
  update() {
    let damping_ratio = 1 - constants.damping;
    this.dx *= damping_ratio;
    this.dy *= damping_ratio;
    this.dz *= damping_ratio;
    this.dz -= constants.gravity;
    
    if(Math.random() < .01) {
      this.dx -= this.x * Math.random() * .01;
      this.dy -= this.y * Math.random() * .01;
      this.dz += Math.random() * 10;
    }
    
    this.x += this.dx;
    this.y += this.dy;
    this.z += this.dz;
    
    if(this.z < constants.orbee_radius) {
      this.z = constants.orbee_radius;
      let horizontal_speed = Math.hypot(this.dx, this.dy);
      let traction_force = -this.dz * constants.traction * (constants.restitution + 1);
      if(traction_force <= horizontal_speed) {
        let horizontal_speed_slowed = Math.max(horizontal_speed - traction_force, 0);
        let slowing_ratio = (horizontal_speed_slowed / horizontal_speed) || 0;
      
        this.dx *= slowing_ratio;
        this.dy *= slowing_ratio;
      } else {
        this.dx = 0;
        this.dy = 0;
      }
      this.dz *= -constants.restitution;
    }
    
    this.scene.object_translations[this.object_index] = this.x;
    this.scene.object_translations[this.object_index + 1] = this.y;
    this.scene.object_translations[this.object_index + 2] = this.z;
  }
}

export {orbee};