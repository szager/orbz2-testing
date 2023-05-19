class octree { //it's O(nlogn)
  constructor(orbeez) {
    this.orbeez_inside = orbeez;
    this.corner_a = [-512, -512, -512];
    this.corner_b = [512, 512, 512];
  }
}

class octree_branch {
  constructor(corner_a, corner_b, parent, depth) {
    this.parent = parent;
    this.corner_a = corner_a;
    this.corner_b = corner_b;
    
  }
}