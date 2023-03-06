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
    let now = performance.now();
    this.fps_counter.innerText = `${Math.round(1000 / (now - this.then)) || "???"} frames/second`;
    if(Math.round(1000 / (now - this.then)) > 60 && this.enable_alerts) {
      this.enable_alerts = confirm(`wyh is the framerate so fadst? it is ${Math.round(1000 / (now - this.then)) || "???"} hertz`);
    }
    this.then = now;
    if(!this.stopping) {
      if(!this.paused) {
        this.update();
      }
      requestAnimationFrame(this.bound_update_method);
    }
  }
  
  constructor(canvas) {
    this.then = performance.now();
    this.enable_alerts = true;
    this.fps_counter = document.querySelector("p");
    this.canvas = canvas;
    this.scene = new scene(canvas, 1002);
    this.orbeez = [];
    for(let x = -5; x < 5; x++) {
      for(let y = -5; y < 5; y++) {
        for(let z = 1; z < 11; z++) {
          this.orbeez.push(new orbee(x * 14, y * 14, z * 14, x * 14 + 14, y * 14 + 14, z * 14 + 14, this.scene));
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
    //this.orbeez.forEach((orbie,index) => {
      //for(let i = index; i < this.orbeez.length; i++) {
        //let other_orbie = this.orbeez[i];
        //let dx = orbie.x - other_orbie.x;
        //let dy = orbie.y - other_orbie.y;
        //let dz = orbie.z - other_orbie.z;
        //if(dx**2 + dy**2 + dz**2 < 100) {
          //orbie.neighbor_count++;
          //other_orbie.neighbor_count++;
        //}
      //}
    //});
    if(this.time < 5 && this.time > 3) {
      this.orbeez.forEach(orbie => {
        orbie.dx -= (orbie.x + orbie.dx * 25) * 0.04 + Math.random() * 24 - 12;
        orbie.dy -= (orbie.y + orbie.dy * 25) * 0.04 + Math.random() * 24 - 12;
        orbie.dz += 2.75;
      })
    }
    this.orbeez.forEach(orbie => {
      
      orbie.update();
    });
    this.scene.draw(this.time);
    
  }
}

export {game};