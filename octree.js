class orbee_in_octree {
  constructor(orbee) {
    this.orbee = orbee;
    this.parent = null;
  }
}


class octree_branch {
  constructor(corner_a, corner_b, depth, orbeez, parent) {
    
    if(parent) {
      this.parent = parent;
    } else {
      this.parent = null; //i forgor ☠
    }
    
    
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
          this.branches.push(
            this.generate_content(
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
              )
            );
          }
        }
      }
    }
  }
  generate_content(corner_a, corner_b, orbeez_outside) {
    let orbeez = [];
    for(let i = 0; i < orbeez_outside.length; i++) {
      
      let is_in_box = true;
      let orbee = orbeez_outside[i];
      
      let coordinate = [orbee.orbee.x, orbee.orbee.y, orbee.orbee.z]
      
      let corners = [corner_a, corner_b];
      
      for(let j = 0; j < 3; j++) {
        if(coordinate[j] > corner_a[j] && coordinate[j] <= corner_b[j]) {
          orbeez.push(orbee);
        }
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
        return;
      } else if (branch.branches.length == 1) {
        branch.branches[0].parent = this;
        return branch.branches[0];
      } else {
        return branch;
      }
    }
  }
}

export {octree_branch};