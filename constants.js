let constants = {
  
  orbee_radius: 7,
  far_distance: 100000,
  near_distance: 10,
  traction: 0.25,
  restitution: 0.25,
  fov: 0.5,
  frame_timestamps: 10,
  
  //1 millimeter per frame squared is 3.6 meters per second squared
  gravity: 2.725, //this is 1 g of acceleration
  
  damping: .01  //the orbeez will have their real-life terminal velocity
}

export {constants};