class octree { //it's O(nlogn)
  constructor(orbeez) {
    this.orbeez_inside = orbeez;
    this.corner_a = [-512, -512, -512];
    this.corner_b = [512, 512, 512];
    
    this.branches = [];
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
      midpoint[i] = (corner_a[i] + corner_b[i]) / 2;
    }
  }
}