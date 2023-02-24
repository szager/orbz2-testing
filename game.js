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
    for(let i = 0; i < 1000; i++) {
      this.orbeez.push(new orbee(-8, -8, -8, 8, 8, 8, this.scene));
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
    this.scene.draw(this.time);
  }
}

export {game};