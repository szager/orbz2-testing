import {scene} from "./scene.js";
import {models} from "./models.js";
import {orbee} from "./orbee.js";
import {constants} from "./constants.js";
import {graph_displayer} from "./graph_displayer.js";
import {octree} from "./octree.js";

function modulo(a, b) {
  return a - Math.floor(a / b) * b;
}


class game {
  
  constructor(canvas, perf_canvas, mode) {
    this.mode = mode || "AUTO";
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
    this.additional_info = document.querySelector("b");
    for(let i = 0; i < constants.orbee_count; i++) {
      this.orbeez.push(new orbee(-5, 5, -5, 5, 10, 100));
    }
    this.stopping = false;
    this.paused = false;
    this.frame_time = 1 / 60;
    this.time = 0;
    this.bound_update_method = this.update_and_stuff.bind(this);

    document.addEventListener("mousedown", this.handle_mousedown.bind(this));
    document.addEventListener("mouseup", this.handle_mouseup.bind(this));
    document.addEventListener("mousemove", this.handle_mousemove.bind(this));    
    
    this.complete_scene().then(this.schedule_update.bind(this));
  }
  
  pause() {
    this.paused = true;
  }
  
  unpause() {
    this.paused = false;
  }
  
  stop() {
    this.stopping = true;
  }
  
  schedule_update() {
    if (this.mode != "MANUAL") {
      requestAnimationFrame(this.bound_update_method);
    }
  }
  
  update_and_stuff(now) {
    if(!this.stopping) {
      if(!this.paused) {
        this.schedule_update();
        this.update();
      }
    }
    //let now = performance.now();
    if(this.frame_timestamps.length <= constants.frame_timestamps) { //paranoia
      this.frame_timestamps.push(now);
    }
    for(let i = 0; i < 2; i++) {
      if(this.frame_timestamps.length > constants.frame_timestamps) {
        this.frame_timestamps.shift();
      }
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
    //alert("e");
  }
  
  
  async complete_scene() {
    this.scene.initialize_buffers();
    await Promise.all([
      this.scene.load_textures(),
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
      this.scene.pitch = Math.min(Math.PI * 0.5, Math.max(-0.3, this.scene.pitch + e.movementY * constants.sensitivity));
      if (this.mode == "MANUAL") {
        this.draw();
      }
    }
  }
  
  orbee_interactions() {
    let interactions = [];
    let orbee_count = constants.orbee_count;
    let diameter = constants.orbee_radius * 2;
    let diameter_squared = diameter**2;
    for(let i = 0; i < orbee_count; i++) {
      for(let j = i; j < orbee_count; j++) {
        let orbee_a = this.orbeez[i];
        let orbee_b = this.orbeez[j];
        let dx = orbee_a.x - orbee_b.x;
        let dy = orbee_a.y - orbee_b.y;
        let dz = orbee_a.z - orbee_b.z;
        if (Math.abs(dx) < diameter && Math.abs(dy) < diameter && Math.abs(dz) < diameter) { //before checking if the orbeez are touching, check if these cubes are touching
          let d_squared = (dx**2 + dy**2 + dz**2);
          if(d_squared < diameter_squared && d_squared > 0) {
            interactions.push(
              {
                orbee_a: orbee_a,
                orbee_b: orbee_b,
                dx: dx,
                dy: dy,
                dz: dz,
                d: d_squared**0.5
              }
            );
          }
        }
      }
    }
    interactions.forEach(interaction => {
      let acc_ratio = (diameter - interaction.d)/(interaction.d) * 0.1;
      let dx = interaction.dx * acc_ratio;
      let dy = interaction.dy * acc_ratio;
      let dz = interaction.dz * acc_ratio;
      interaction.orbee_a.dx += dx;
      interaction.orbee_a.dy += dy;
      interaction.orbee_a.dz += dz;
      interaction.orbee_b.dx -= dx;
      interaction.orbee_b.dy -= dy;
      interaction.orbee_b.dz -= dz;
      
      interaction.orbee_a.x += dx;
      interaction.orbee_a.y += dy;
      interaction.orbee_a.z += dz;
      interaction.orbee_b.x -= dx;
      interaction.orbee_b.y -= dy;
      interaction.orbee_b.z -= dz;
    });
  }
  
  update() {
    this.time += this.frame_time;
    

    //this.scene.objects[4].position[2] += Math.sin(this.time * 16.3);
    //this.scene.objects[5].position[2] += Math.sin(this.time * 14.3);
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
      
      
      let some_octree = new octree(this.orbeez);
      
      //this.additional_info.innerText = String(some_octree.orbeez_inside.length);
      
      //let radius = constants.orbee_radius;
      //let diameter = constants.orbee_radius * 2;
      //let radius_squared = constants.orbee_radius**2;
      //for(let i = 0; i < 8; i++) {
        //some_octree.adjust_walls(constants.orbee_radius);
        //let orbee_overlaps = some_octree.self_query(constants.orbee_radius, constants.orbee_radius**2);
        //if(i == 4) {
        //  this.additional_info.innerText = String(orbee_overlaps.length);
        //}

        //for(let j = 0; j < orbee_overlaps.length; j++) {
         // let overlap = orbee_overlaps[j];
        //  overlap.correct(radius);
       // }
        
        //for(let j = 0; j < this.orbeez.length; j++) {
          //let orbie = this.orbeez[j];
          //orbie.collisions = [];
        //}
        
      //}
      
      
      for(let i = 0; i < 8; i++) {
        this.orbee_interactions();
      }
      
      this.orbeez.forEach(orbie => {
        orbie.update();
      });
      this.scene.object_groups[0].copy_orbee_positions(this.orbeez);
    }

    this.draw();
  }

  draw() {
    this.scene.draw_everything(this.time);
  }

}

export {game};