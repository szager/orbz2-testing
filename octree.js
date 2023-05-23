

class orbee_in_octree {
  constructor(orbee) {
    this.orbee = orbee;
    this.parent = null;
    this.is_octree = false;
  }
}


class octree_branch {
  constructor(corner_a, corner_b, depth, orbeez, parent) {
    
    if(parent) {
      this.parent = parent;
    } else {
      this.parent = null; //i forgor ☠
    }
    
    this.is_octree = true;
    
    this.corner_a = corner_a;
    this.corner_b = corner_b;
    
    let half_space_diagonal = [0, 0, 0];
    for(let i = 0; i < 3; i++) {
      half_space_diagonal[i] = (this.corner_b[i] - this.corner_a[i]) / 2; //it's not going to be lossy because 512 is a power of 2
    }
    
    this.orbeez = orbeez;
    this.depth = depth;
    
    this.branches = [];
    if(this.depth > 0) {
      for (let x = 0; x <= 1; x++) { //add up to 8 branches
        for(let y = 0; y <= 1; y++) {
          for(let z = 0; z <= 1; z++) {
            let new_branch = this.generate_content(
              [
                this.corner_a[0] + half_space_diagonal[0] * x,
                this.corner_a[1] + half_space_diagonal[1] * y,
                this.corner_a[2] + half_space_diagonal[2] * z,
              ],
              [
                this.corner_a[0] + half_space_diagonal[0] * (x + 1),
                this.corner_a[1] + half_space_diagonal[1] * (y + 1),
                this.corner_a[2] + half_space_diagonal[2] * (z + 1),
              ],
              this.orbeez,
            );
            if(new_branch != null) {
              this.branches.push(
                new_branch
              );
            }
            
          }
        }
      }
    } else {
      for(let i = 0; i < orbeez.length; i++) {
        orbeez[i].parent = this;
      }
      this.branches = orbeez;
    }
  }
  generate_content(corner_a, corner_b, orbeez_outside) {
    let orbeez = [];
    for(let i = 0; i < orbeez_outside.length; i++) {
      
      let is_in_box = true;
      let orbee = orbeez_outside[i];
      
      let coordinate = [orbee.orbee.x, orbee.orbee.y, orbee.orbee.z]
      
      for(let j = 0; j < 3; j++) {
        if(coordinate[j] < corner_a[j] || coordinate[j] >= corner_b[j]) {
          is_in_box = false;
        }
      }
      if(is_in_box) {
        orbeez.push(orbee);
      }
      
    }
    
    if(orbeez.length == 0) {
      return null;
    } else if(orbeez.length == 1) {
      orbeez[0].parent = this;
      return orbeez[0];
    } else {
      let branch = new octree_branch(corner_a, corner_b, this.depth - 1, orbeez, this);
      if(branch.branches.length == 0) {
        alert("a photon has entered your computer!");
        return null;
      } else if (branch.branches.length == 1) {
        branch.branches[0].parent = this;
        return branch.branches[0];
      } else {
        return branch;
      }
    }
  }
  reset_walls() {
    for(let i = 0; i < 3; i++) {
      this.corner_a[i] = Infinity; //cursed programming
      this.corner_b[i] = -Infinity;
    }
    
    for(let i = 0; i < this.branches.length; i++) {
      let branch = this.branches[i];
      if(branch.is_octree) {
        branch.reset_walls();
      }
    }
    
  }
  
  extend_walls(position, radius) {
    let walls_changed = false;
    for(let i = 0; i < 3; i++) {
      if(this.corner_a[i] > position[i] - radius) {
        walls_changed = true;
        this.corner_a[i] = position[i] - radius;
      }
      if(this.corner_b[i] < position[i] + radius) {
        walls_changed = true;
        this.corner_b[i] = position[i] + radius;
      }
    }
    
    if(walls_changed && this.parent) {
      this.parent.extend_walls(position, radius);
    }
  }
  
  query_another_branch(branch) {
    let result = [];
    return result;
  }
  self_query() {
    let result = [];
    return result;
  }
}

class octree {
  constructor(orbeez) {
    this.corner_a = [-256, -256, -256];
    this.corner_b = [256, 256, 256];
    this.max_depth = 8; //2cm cubed
    this.orbeez_inside = [];
    for(let i = 0; i < orbeez.length; i++) {
      let orbee = orbeez[i]
      
      let coordinate = [orbee.x, orbee.y, orbee.z]
      let is_where_orbeez_are_supposed_to_be = true;
      
      for(let j = 0; j < 3; j++) {
        if(coordinate[j] < this.corner_a[j] || coordinate[j] >= this.corner_b[j]) {
          is_where_orbeez_are_supposed_to_be = false;
        }
      }
      if(is_where_orbeez_are_supposed_to_be) {
        this.orbeez_inside.push(new orbee_in_octree(orbee));
      }
    }
    this.branch = new octree_branch(this.corner_a, this.corner_b, this.max_depth, this.orbeez_inside);
  }
  
  adjust_walls(radius) {
    this.branch.reset_walls();
    for(let i = 0; i < this.orbeez_inside.length; i++) {
      let orbee = this.orbeez_inside[i];
      orbee.parent.extend_walls([orbee.orbee.x, orbee.orbee.y, orbee.orbee.z, radius]);
    }
  }
  self_query() {
    return this.branch.self_query();
  }
}


export {octree};