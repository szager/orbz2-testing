let constants = {
  
  orbee_radius: 7,
  far_distance: 100000,
  near_distance: 10,
  traction: 0.25,
  restitution: 0.25,
  fov: 0.5,
  
  //1 millimeter per frame squared is 3.6 meters per second squared
  gravity: 2.725, //this is 1 g of acceleration
  
  //the drag coefficient of a ball is 0.47
  //an orbee weighs 1.4 grams
  //and has a shadow area of 154 square millimetres
  //air has a density of one gram per liter, or one micro-gram per cubic millimetre
  //the square root of 2.725
  
  damping: .995
}

export {constants};