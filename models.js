import {model} from "./model.js";
    
let models = {
  "orbee_model": new model([0,-7,0,2.977261,-5.954578,2.163077,-1.137192,-5.954578,3.499965,5.065249,-3.13054,3.680075,5.954536,-3.6801519999999996,0,-3.68011,-5.9545639999999995,0,-1.137192,-5.954578,-3.499965,2.977261,-5.954578,-2.163077,6.657406,0,2.1630909999999997,-1.934716,-3.13054,5.954543,1.8400830000000001,-3.6801660000000003,5.663084,0,0,7,-6.260982,-3.130512,0,-4.817323,-3.6801519999999996,3.499979,-6.657406,0,2.1630909999999997,-1.934716,-3.13054,-5.954543,-4.817323,-3.6801519999999996,-3.499979,-4.114502,0,-5.663119,5.065249,-3.13054,-3.680075,1.8400830000000001,-3.6801660000000003,-5.663084,4.114502,0,-5.663119,4.114502,0,5.663119,-4.114502,0,5.663119,-6.657406,0,-2.1630909999999997,0,0,-7,6.657406,0,-2.1630909999999997,1.934716,3.13054,5.954543,4.817323,3.6801519999999996,3.499979,1.137192,5.954578,3.499965,-5.065249,3.13054,3.680075,-1.8400830000000001,3.6801660000000003,5.663084,-2.977261,5.954578,2.163077,-5.065249,3.13054,-3.680075,-5.954536,3.6801519999999996,0,-2.977261,5.954578,-2.163077,1.934716,3.13054,-5.954543,-1.8400830000000001,3.6801660000000003,-5.663084,1.137192,5.954578,-3.499965,6.260982,3.130512,0,4.817323,3.6801519999999996,-3.499979,3.68011,5.9545639999999995,0,0,7,0],[-0.0000,-1.0000,-0.0000,0.4253,-0.8507,0.3090,-0.1625,-0.8507,0.5000,0.7236,-0.4472,0.5257,0.8506,-0.5257,-0.0000,-0.5257,-0.8507,-0.0000,-0.1625,-0.8507,-0.5000,0.4253,-0.8507,-0.3090,0.9511,-0.0000,0.3090,-0.2764,-0.4472,0.8506,0.2629,-0.5257,0.8090,-0.0000,-0.0000,1.0000,-0.8944,-0.4472,-0.0000,-0.6882,-0.5257,0.5000,-0.9511,-0.0000,0.3090,-0.2764,-0.4472,-0.8506,-0.6882,-0.5257,-0.5000,-0.5878,-0.0000,-0.8090,0.7236,-0.4472,-0.5257,0.2629,-0.5257,-0.8090,0.5878,-0.0000,-0.8090,0.5878,-0.0000,0.8090,-0.5878,-0.0000,0.8090,-0.9511,-0.0000,-0.3090,-0.0000,-0.0000,-1.0000,0.9511,-0.0000,-0.3090,0.2764,0.4472,0.8506,0.6882,0.5257,0.5000,0.1625,0.8507,0.5000,-0.7236,0.4472,0.5257,-0.2629,0.5257,0.8090,-0.4253,0.8507,0.3090,-0.7236,0.4472,-0.5257,-0.8506,0.5257,-0.0000,-0.4253,0.8507,-0.3090,0.2764,0.4472,-0.8506,-0.2629,0.5257,-0.8090,0.1625,0.8507,-0.5000,0.8944,0.4472,-0.0000,0.6882,0.5257,-0.5000,0.5257,0.8507,-0.0000,-0.0000,1.0000,-0.0000],[0,1,2,3,1,4,0,2,5,0,5,6,0,6,7,3,4,8,9,10,11,12,13,14,15,16,17,18,19,20,3,8,21,9,11,22,12,14,23,15,17,24,18,20,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,40,37,41,40,39,37,39,35,37,37,34,41,37,36,34,36,32,34,34,31,41,34,33,31,33,29,31,31,28,41,31,30,28,30,26,28,28,40,41,28,27,40,27,38,40,25,39,38,25,20,39,20,35,39,24,36,35,24,17,36,17,32,36,23,33,32,23,14,33,14,29,33,22,30,29,22,11,30,11,26,30,21,27,26,21,8,27,8,38,27,20,24,35,20,19,24,19,15,24,17,23,32,17,16,23,16,12,23,14,22,29,14,13,22,13,9,22,11,21,26,11,10,21,10,3,21,8,25,38,8,4,25,4,18,25,7,19,18,7,6,19,6,15,19,6,16,15,6,5,16,5,12,16,5,13,12,5,2,13,2,9,13,4,7,18,4,1,7,1,0,7,2,10,9,2,1,10,1,3,10]),
  "some_other_model": new model([10, 10, 10, -10, -10, -10, 10, -10, 10,], [0.1, 0.1, 0.9, -0.1, -0.1, 0.9, 0.1, -0.1, 0.9], [0, 1, 2]),
  "room": new model([
    -1985, -1985, 0,
    -1985, +1985, 0,
    +1985, +1985, 0,
    +1985, -1985, 0,
    
    
    -1985, -1985, 0,
    -1985, +1985, 0,
    -1985, +1985, 80,
    -1985, -1985, 80,
    
    -1985, +1985, 0,
    +1985, +1985, 0,
    +1985, +1985, 80,
    -1985, +1985, 80,
    
    +1985, +1985, 0,
    +1985, -1985, 0,
    +1985, -1985, 80,
    +1985, +1985, 80,
    
    +1985, -1985, 0,
    -1985, -1985, 0,
    -1985, -1985, 80,
    +1985, -1985, 80,
    
    
    -2000, -2000, 80,
    -2000, +2000, 80,
    +2000, +2000, 80,
    +2000, -2000, 80,
    
    -1985, -1985, 80,
    -1985, +1985, 80,
    +1985, +1985, 80,
    +1985, -1985, 80,
    
    
    -2000, -2000, 80,
    -2000, +2000, 80,
    -2000, +2000, 2500,
    -2000, -2000, 2500,
    
    -2000, +2000, 80,
    +2000, +2000, 80,
    +2000, +2000, 2500,
    -2000, +2000, 2500,
    
    +2000, +2000, 80,
    +2000, -2000, 80,
    +2000, -2000, 2500,
    +2000, +2000, 2500,
    
    +2000, -2000, 80,
    -2000, -2000, 80,
    -2000, -2000, 2500,
    +2000, -2000, 2500,
    
    
    +2000, -2000, 2500,
    +2000, -2000, 2500,
    +2000, -2000, 2500,
    +2000, -2000, 2500,
  ],[
    0.0, 0.0, +1.0,
    0.0, 0.0, +1.0,
    0.0, 0.0, +1.0,
    0.0, 0.0, +1.0,
    
    
    -1.0, 0.0, 0.0,
    -1.0, 0.0, 0.0,
    -1.0, 0.0, 0.0,
    -1.0, 0.0, 0.0,
    
    0.0, -1.0, 0.0,
    0.0, -1.0, 0.0,
    0.0, -1.0, 0.0,
    0.0, -1.0, 0.0,
    
    +1.0, 0.0, 0.0,
    +1.0, 0.0, 0.0,
    +1.0, 0.0, 0.0,
    +1.0, 0.0, 0.0,
    
    0.0, -1.0, 0.0,
    0.0, -1.0, 0.0,
    0.0, -1.0, 0.0,
    0.0, -1.0, 0.0,
    
    
    0.0, 0.0, 1.0,
    0.0, 0.0, 1.0,
    0.0, 0.0, 1.0,
    0.0, 0.0, 1.0,
    
    0.0, 0.0, 1.0,
    0.0, 0.0, 1.0,
    0.0, 0.0, 1.0,
    0.0, 0.0, 1.0,
    
    
    -1.0, 0.0, 0.0,
    -1.0, 0.0, 0.0,
    -1.0, 0.0, 0.0,
    -1.0, 0.0, 0.0,
    
    0.0, -1.0, 0.0,
    0.0, -1.0, 0.0,
    0.0, -1.0, 0.0,
    0.0, -1.0, 0.0,
    
    +1.0, 0.0, 0.0,
    +1.0, 0.0, 0.0,
    +1.0, 0.0, 0.0,
    +1.0, 0.0, 0.0,
    
    0.0, -1.0, 0.0,
    0.0, -1.0, 0.0,
    0.0, -1.0, 0.0,
    0.0, -1.0, 0.0,
  ],[
    0, 1, 2, 2, 3, 0,
    
    4, 5, 6, 6, 7, 4,
    8, 9, 10, 10, 11, 8,
    12, 13, 14, 14, 15, 12,
    16, 17, 18, 18, 19, 16,
    
    20, 21, 24, 24, 25, 21,
    21, 22, 25, 25, 26, 22,
    22, 26, 23, 23, 26, 27,
    27, 23, 20, 20, 27, 24,
    
    28, 29, 30, 30, 31, 28,
    32, 33, 34, 34, 35, 32,
    36, 37, 38, 38, 39, 36,
    40, 41, 42, 42, 43, 40,
  ])
};

export {models};