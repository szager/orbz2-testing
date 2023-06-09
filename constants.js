let constants = {
  orbee_count: 2000,
  orbee_radius: .7,
  far_distance: 10000,
  near_distance: 1,
  traction: 0.1,
  restitution: 0.4,
  bounce: 0.1,
  sensitivity: 0.003, //radians per pixel
  fov: 1.0,
  frame_timestamps: 45,
  
  //1 centimetre per frame squared is 3.6 metres per second squared
  gravity: .2725, //this is 1 g of acceleration
  //gravity: 0.006810173611, //floaty gravity
  
  
  damping: .01  //the orbeez will have their real-life terminal velocity
}

export {constants};
