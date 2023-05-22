let constants = {
  orbee_count: 1000,
  orbee_radius: .7,
  far_distance: 1000,
  near_distance: 1,
  traction: 0.4,
  restitution: 0.25,
  sensitivity: 0.003, //radians per pixel
  fov: 1.0,
  frame_timestamps: 30,
  
  //1 centimetre per frame squared is 3.6 metres per second squared
  //gravity: .2725, //this is 1 g of acceleration
  gravity: 0.06810173611, //floaty gravity!
  
  
  damping: .01  //the orbeez will have their real-life terminal velocity
}

export {constants};