class octree { //it's O(nlogn)
  constructor(orbeez) {
    this.orbeez_inside = orbeez;
    this.corner_a = [-256, -256, -256];
    this.corner_b = [256, 256, 256];
    
    this.branches = [];
    
    
    let half_space_diagonal = [0, 0, 0];
    for(let i = 0; i < 3; i++) {
      half_space_diagonal[i] = (this.corner_b[i] - this.corner_a[i]) / 2; //it's not going to be lossy because 512 is a power of 2
    }
    
    
    for (let x = 0; x < 1; x++) { //add up to 8 branches
      for(let y = 0; y < 1; y++) {
        for(let z = 0; z < 1; z++) {
          this.branches.push(
            new octree_branch(
              [
                this.corner_a[0] + this.half_space_diagonal[0] * x,
                this.corner_a[1] + this.half_space_diagonal[1] * y,
                this.corner_a[2] + this.half_space_diagonal[2] * z,
              ],
              [
                this.corner_b[0] - this.half_space_diagonal[0] * x,
                this.corner_b[1] - this.half_space_diagonal[1] * y,
                this.corner_b[2] - this.half_space_diagonal[2] * z,
              ],
              this.orbeez_inside,
              this
            )
          );
        }
      }
    }
    
    
    
  }
}

class octree_branch {
  constructor(corner_a, corner_b, depth, possible_orbeez, parent) {
    
    if(parent) {
      this.parent = parent;
    } else {
      this.parent = null; //i forgor ☠
    }
    
    
    this.corner_a = corner_a;
    this.corner_b = corner_b;
    
    let midpoint = [0, 0, 0];
    for(let i = 0; i < 3; i++) {
      midpoint[i] = (this.corner_a[i] + this.corner_b[i]) / 2;
    }
  }
}

export {octree};