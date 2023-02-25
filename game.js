import {scene} from "./scene.js";
import {orbee_model} from "./orbee_model.js";
import {orbee} from "./orbee.js";

class game {
  pause() {
    this.paused = true;
  }
  unpause() {
    this.paused = false;
  }
  stop() {
    this.stopping = true;
  }
  update_and_stuff() {
    if(!this.stopping) {
      if(!this.paused) {
        this.update();
      }
      requestAnimationFrame(this.bound_update_method);
    }
  }
  
  constructor(canvas) {
    this.canvas = canvas;
    this.scene = new scene(canvas, 1002);
    this.orbeez = [];
    for(let x = -5; x < 5; x++) {
      for(let y = -5; y < 5; y++) {
        for(let z = -5; z < 5; z++) {
          this.orbeez.push(new orbee(x * 2, y * 2, z * 2, x * 2 + 2, y * 2 + 2, z * 2 + 2, this.scene));
        }
      }
    }
    //orbee_model.add_to_scene(this.scene);
    this.complete_scene();
    
    this.stopping = false;
    this.paused = false;
    this.frame_time = 1 / 60;
    this.time = 0;
    
    this.bound_update_method = this.update_and_stuff.bind(this);
    requestAnimationFrame(this.bound_update_method);
  }
  complete_scene() {
    this.scene.initialize_buffers();
  }
  update() {
    this.time += this.frame_time;
    this.orbeez.forEach(orbie => {
      orbie.update();
    });
    this.orbeez.forEach((orbie,index) => {
      for(let i = index; i < this.orbeez.length; i++) {
        let other_orbie = this.orbeez[i];
        let dx = orbie.x - other_orbie.x;
        let dy = orbie.y - other_orbie.y;
        let dz = orbie.z - other_orbie.z;
        if(dx**2 + dy**2 + dz**2 < 2) {
          orbie.neighbor_count++;
          other_orbie.neighbor_count++;
        }
      }
    });
    this.orbeez.forEach(orbie => {
      orbie.update();
    });
    this.scene.draw(this.time);
  }
}

export {game};