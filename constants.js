let constants = {
  orbee_count: 1000,
  orbee_radius: .7,
  far_distance: 100000,
  near_distance: 10,
  traction: 0.01,
  restitution: 0.25,
  sensitivity: 0.003, //radians per pixel
  fov: 1.0,
  frame_timestamps: 90,
  
  //1 centimetre per frame squared is 3.6 metres per second squared
  //gravity: .2725, //this is 1 g of acceleration
  gravity: 0.068125, //floaty gravity!
  
  
  damping: .01  //the orbeez will have their real-life terminal velocity
}

export {constants};