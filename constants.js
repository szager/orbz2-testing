let constants = {
  
  orbee_radius: 7,
  far_distance: 100000,
  near_distance: 10,
  traction: 0.25,
  restitution: 0.25,
  fov: 0.5,
  
  //1 millimeter per frame squared is 3.6 meters per second squared
  gravity: 2.725, //this is 1 g of acceleration
  
  damping: .01  //so orbeez have a terminal velocity of 324⅔ speed units, the same as real life
}

export {constants};