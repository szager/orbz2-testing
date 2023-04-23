import {scene} from "./scene.js";
import {models} from "./models.js";
import {orbee} from "./orbee.js";
import {constants} from "./constants.js";
import {graph_displayer} from "./graph_displayer.js";

function modulo(a, b) {
  return a - Math.floor(a / b) * b;
}


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
  
  update_and_stuff(now) {
    //let now = performance.now();
    if(this.frame_timestamps.length <= constants.frame_timestamps) { //paranoia
      this.frame_timestamps.push(now);
    }
    if(this.frame_timestamps.length > constants.frame_timestamps) {
      this.frame_timestamps.shift();
    }
    if(this.frame_timestamps.length == constants.frame_timestamps) {
      this.framerate = (constants.frame_timestamps - 1) * 1000 / (this.frame_timestamps[constants.frame_timestamps - 1] - this.frame_timestamps[0]);
    }
    this.fps_counter.innerText = `framerate: ${Math.floor(this.framerate)} Hz`;
    this.framerate_displayer.add_value(this.framerate);
    //this.alert_cooldown--;
    //if(Math.round(1000 / (now - this.then)) > 60 && this.enable_alerts && this.alert_cooldown < 0) {
      //this.alert_cooldown = 60;
      //this.enable_alerts = confirm(`wyh is the framerate so fadst? it is ${Math.round(1000 / (now - this.then)) || "???"} hertz`);
    //}
    if(!this.stopping) {
      if(!this.paused) {
        this.update();
      }
      requestAnimationFrame(this.bound_update_method);
    }
  }
  
  constructor(canvas, perf_canvas) {
    this.frame_timestamps = [];
    this.framerate = -1;
    for(let i = 0; i < constants.frame_timestamps; i++) {
      this.frame_timestamps.push(performance.now());
    }
    this.fps_counter = document.querySelector("p");
    this.canvas = canvas;
    this.perf_canvas = perf_canvas;
    this.framerate_displayer = new graph_displayer(this.perf_canvas);
    this.scene = new scene(canvas, 1002);
    this.mouse_down = false;
    this.orbeez = [];
    for(let x = -5; x < 5; x++) {
      for(let y = -5; y < 5; y++) {
        for(let z = 1; z < 11; z++) {
          this.orbeez.push(new orbee(x * 14, y * 14, z * 14, x * 14 + 14, y * 14 + 14, z * 14 + 14, this.scene));
        }
      }
    }
    
    this.stopping = false;
    this.paused = false;
    this.frame_time = 1 / 60;
    this.time = 0;
    
    this.bound_update_method = this.update_and_stuff.bind(this);
    let bound_this = this;
    document.addEventListener("mousedown", bound_this.handle_mousedown.bind(bound_this));
    document.addEventListener("mouseup", bound_this.handle_mouseup.bind(bound_this));
    document.addEventListener("mousemove", bound_this.handle_mousemove.bind(bound_this));    
    
    this.complete_scene().then(() => { requestAnimationFrame(bound_this.bound_update_method); });
  }
  
  async complete_scene() {
    this.scene.initialize_buffers();
    return Promise.all([
      this.scene.load_the_pug_texture(),
      this.scene.load_shaders()
    ]);
  }
  
  handle_mousedown(e) {
    this.mouse_down = true;
  }
  
  handle_mouseup(e) {
    this.mouse_down = false;
  }
  
  handle_mousemove(e) {
    if(this.mouse_down) {
      this.scene.yaw = modulo(this.scene.yaw - e.movementX * constants.sensitivity, Math.PI * 2);
      this.scene.pitch = Math.min(Math.PI * 0.5, Math.max(-0.1, this.scene.pitch + e.movementY * constants.sensitivity));
    }
  }
  
  orbee_interactions() {
    let interactions = [];
    let orbee_count = this.orbeez.length;
    let radius = constants.orbee_radius;
    for(let i = 0; i < orbee_count; i++) {
      for(let j = i; j < orbee_count; j++) {
        let orbee_a = this.orbeez[i];
        let orbee_b = this.orbeez[j];
        let dx = orbee_a.x - orbee_b.x;
        let dy = orbee_a.y - orbee_b.y;
        let dz = orbee_a.z - orbee_b.z;
        if (Math.abs(dx) < radius && Math.abs(dy) < radius && Math.abs(dz) < radius) { //before checking if the orbeez are touching, check if these cubes are touching
          let d = (dx**2 + dy**2 + dz**2)**0.5;
          if(d < radius && d > 0) {
            interactions.push(
              {
                orbee_a: orbee_a,
                orbee_b: orbee_b,
                dx: dx,
                dy: dy,
                dz: dz,
                d: d
              }
            );
          }
        }
      }
    }
    interactions.forEach(interaction => {
      let acc_ratio = (radius - interaction.d)/(interaction.d) * 0.0625;
      interaction.orbee_a.dx += interaction.dx * acc_ratio;
      interaction.orbee_a.dy += interaction.dy * acc_ratio;
      interaction.orbee_a.dz += interaction.dz * acc_ratio;
      interaction.orbee_b.dx -= interaction.dx * acc_ratio;
      interaction.orbee_b.dy -= interaction.dy * acc_ratio;
      interaction.orbee_b.dz -= interaction.dz * acc_ratio;
      
      interaction.orbee_a.x += interaction.dx * acc_ratio;
      interaction.orbee_a.y += interaction.dy * acc_ratio;
      interaction.orbee_a.z += interaction.dz * acc_ratio;
      interaction.orbee_b.x -= interaction.dx * acc_ratio;
      interaction.orbee_b.y -= interaction.dy * acc_ratio;
      interaction.orbee_b.z -= interaction.dz * acc_ratio;
    })
  }
  
  update() {
    this.time += this.frame_time;
    //let amount_of_useless_math = 2**(Math.random() * 24);
    //for(let i = 0; i < amount_of_useless_math; i++) {
      //let e = Math.sin(Math.random() / 7673.6587988);
    //}
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
    //if(this.time % 10 < 5 && this.time % 10 > 3) {
      //this.scene.pitch = Math.PI / 2;
      //this.scene.viewing_distance = 5000;
      //this.scene.focus[2] = 1000;
      //this.orbeez.forEach(orbie => {
        //orbie.dx -= (orbie.x + orbie.dx * 25) * 0.04 + Math.random() * 24 - 12;
        //orbie.dy -= (orbie.y + orbie.dy * 25) * 0.04 + Math.random() * 24 - 12;
       // orbie.dz += 2.9;
      //})
    //}
    //if(this.time % 10 < 9 && this.time % 10 > 4) {
      //this.scene.pitch = .8;
      //this.scene.viewing_distance = 10000;
      //this.scene.focus[2] = (this.time % 10 - 4) * 500;
      //this.orbeez.forEach(orbie => {
        //let radius = ((this.time % 10) - 4) * 500;
        //let distance = ((orbie.x + orbie.dx)**2 + (orbie.y + orbie.dy)**2 + (orbie.z + orbie.dz)**2)**0.5;
        //if(distance < radius) {
          //let acc_ratio = (distance - radius) / (distance * 2);
          //orbie.dx -= orbie.x * acc_ratio;
          //orbie.dy -= orbie.y * acc_ratio;
          //orbie.dz -= orbie.z * acc_ratio;
        //}
        //orbie.dz += 2.7;
     // })
    //}
    if(this.time > 1) {
      this.orbeez.forEach(orbie => {
        orbie.move();
      });
      //for(let i = 0; i < 12; i++) {
        //this.orbee_interactions();
      //}
      
      this.orbeez.forEach(orbie => {
        orbie.update();
      });
    }
    
    this.scene.draw_everything(this.time);
    
  }
  
}

export {game};