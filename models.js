import {model} from "./model.js";
    
let models = {
  "orbee_model": new model(
    [
      0,-.7,0,.2977261,-.5954578,.2163077,-.1137192,-.5954578,.3499965,.5065249,-.313054,.3680075,.5954536,-.36801519999999996,0,-.368011,-.59545639999999995,0,-.1137192,-.5954578,-.3499965,.2977261,-.5954578,-.2163077,.6657406,0,.21630909999999997,-.1934716,-.313054,.5954543,.18400830000000001,-.36801660000000003,.5663084,0,0,.7,-.6260982,-.3130512,0,-.4817323,-.36801519999999996,.3499979,-.6657406,0,.21630909999999997,-.1934716,-.313054,-.5954543,-.4817323,-.36801519999999996,-.3499979,-.4114502,0,-.5663119,.5065249,-.313054,-.3680075,.18400830000000001,-.36801660000000003,-.5663084,.4114502,0,-.5663119,.4114502,0,.5663119,-.4114502,0,.5663119,-.6657406,0,-.21630909999999997,0,0,-.7,.6657406,0,-.21630909999999997,.1934716,.313054,.5954543,.4817323,.36801519999999996,.3499979,.1137192,.5954578,.3499965,-.5065249,.313054,.3680075,-.18400830000000001,.36801660000000003,.5663084,-.2977261,.5954578,.2163077,-.5065249,.313054,-.3680075,-.5954536,.36801519999999996,0,-.2977261,.5954578,-.2163077,.1934716,.313054,-.5954543,-.18400830000000001,.36801660000000003,-.5663084,.1137192,.5954578,-.3499965,.6260982,.3130512,0,.4817323,.36801519999999996,-.3499979,.368011,.59545639999999995,0,0,.7,0],
    [-0.0000,-1.0000,-0.0000,0.4253,-0.8507,0.3090,-0.1625,-0.8507,0.5000,0.7236,-0.4472,0.5257,0.8506,-0.5257,-0.0000,-0.5257,-0.8507,-0.0000,-0.1625,-0.8507,-0.5000,0.4253,-0.8507,-0.3090,0.9511,-0.0000,0.3090,-0.2764,-0.4472,0.8506,0.2629,-0.5257,0.8090,-0.0000,-0.0000,1.0000,-0.8944,-0.4472,-0.0000,-0.6882,-0.5257,0.5000,-0.9511,-0.0000,0.3090,-0.2764,-0.4472,-0.8506,-0.6882,-0.5257,-0.5000,-0.5878,-0.0000,-0.8090,0.7236,-0.4472,-0.5257,0.2629,-0.5257,-0.8090,0.5878,-0.0000,-0.8090,0.5878,-0.0000,0.8090,-0.5878,-0.0000,0.8090,-0.9511,-0.0000,-0.3090,-0.0000,-0.0000,-1.0000,0.9511,-0.0000,-0.3090,0.2764,0.4472,0.8506,0.6882,0.5257,0.5000,0.1625,0.8507,0.5000,-0.7236,0.4472,0.5257,-0.2629,0.5257,0.8090,-0.4253,0.8507,0.3090,-0.7236,0.4472,-0.5257,-0.8506,0.5257,-0.0000,-0.4253,0.8507,-0.3090,0.2764,0.4472,-0.8506,-0.2629,0.5257,-0.8090,0.1625,0.8507,-0.5000,0.8944,0.4472,-0.0000,0.6882,0.5257,-0.5000,0.5257,0.8507,-0.0000,-0.0000,1.0000,-0.0000],[0,1,2,3,1,4,0,2,5,0,5,6,0,6,7,3,4,8,9,10,11,12,13,14,15,16,17,18,19,20,3,8,21,9,11,22,12,14,23,15,17,24,18,20,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,40,37,41,40,39,37,39,35,37,37,34,41,37,36,34,36,32,34,34,31,41,34,33,31,33,29,31,31,28,41,31,30,28,30,26,28,28,40,41,28,27,40,27,38,40,25,39,38,25,20,39,20,35,39,24,36,35,24,17,36,17,32,36,23,33,32,23,14,33,14,29,33,22,30,29,22,11,30,11,26,30,21,27,26,21,8,27,8,38,27,20,24,35,20,19,24,19,15,24,17,23,32,17,16,23,16,12,23,14,22,29,14,13,22,13,9,22,11,21,26,11,10,21,10,3,21,8,25,38,8,4,25,4,18,25,7,19,18,7,6,19,6,15,19,6,16,15,6,5,16,5,12,16,5,13,12,5,2,13,2,9,13,4,7,18,4,1,7,1,0,7,2,10,9,2,1,10,1,3,10]),
  "some_other_model": new model([10, 10, 10, -10, -10, -10, 10, -10, 10,], [0.1, 0.1, 0.9, -0.1, -0.1, 0.9, 0.1, -0.1, 0.9], [0, 1, 2]),
  "floor": new model(
  [
    198, 198, 0,
    198, -198, 0,
    -198, -198, 0,
    -198, 198, 0,
    
    -55, -198, 0,
    -55, -213, 0,
    -145, -213, 0,
    -145, -198, 0,
    
  ],
  [
    0, 0, 1,
    0, 0, 1,
    0, 0, 1,
    0, 0, 1,
    
    0, 0, 1,
    0, 0, 1,
    0, 0, 1,
    0, 0, 1,
  ],
  [
    0, 1, 2,
    2, 3, 0,
    
    4, 5, 6,
    6, 7, 4,
  ],
  [
    396 / 512, 396 / 512,
    396 / 512, 0,
    0, 0,
    0, 396 / 512,
    
    0.6, 0,
    0.6, -0.1,
    0.75, -0.1,
    0.75, 0,
  ]
  ),
  "walls": new model(
    [
      -200, -200, 10, //0; -x wall
      -200, 200, 10,
      -200, 200, 250,
      -200, -200, 250, //3
      
      -200, 200, 10, //4; +y wall
      200, 200, 10,
      200, 200, 250,
      -200, 200, 250, //7
      
      200, 200, 10, //8; +x wall
      200, -200, 10,
      200, -200, 250,
      200, 200, 250, //11
      
      200, -200, 10, //12; -y wall with doorway
      -50, -200, 10,
      -50, -200, 200,
      -150, -200, 200,
      -150, -200, 10,
      -200, -200, 10,
      -200, -200, 250,
      200, -200, 250, //19
      
      -150, 200, 100, //20 -x window
      -50, 200, 100,
      -50, 200, 200,
      -150, 200, 200, //23
      
      50, 200, 100, //24 +x window
      150, 200, 100,
      150, 200, 200,
      50, 200, 200, //27
      
    ],
    [
      1, 0, 0,
      1, 0, 0,
      1, 0, 0,
      1, 0, 0,
    
      0, -1, 0,
      0, -1, 0,
      0, -1, 0,
      0, -1, 0,
    
      -1, 0, 0,
      -1, 0, 0,
      -1, 0, 0,
      -1, 0, 0,
    
      0, 1, 0,
      0, 1, 0,
      0, 1, 0,
      0, 1, 0,
      0, 1, 0,
      0, 1, 0,
      0, 1, 0,
      0, 1, 0,
      
      0, -1, 0,
      0, -1, 0,
      0, -1, 0,
      0, -1, 0,
      
      0, -1, 0,
      0, -1, 0,
      0, -1, 0,
      0, -1, 0,
      
    ],
    [
      0, 1, 2,
      2, 3, 0,
      
      
      21, 22, 24,
      22, 24, 27,
      
      23, 26, 6,
      23, 6, 7,
      
      23, 7, 4,
      23, 4, 20,
      
      4, 20, 5,
      20, 25, 5,
      
      25, 5, 6,
      26, 25, 6,
      
      
      8, 9, 10,
      10, 11, 8,
      
      12, 13, 14,
      12, 14, 19,
      14, 19, 15,
      19, 15, 18,
      18, 17, 15,
      15, 17, 16,
    ],
    [
      0, 480 / 512,
      400 / 1024, 480 / 512,
      400 / 1024, 240 / 512,
      0, 240 / 512,
      
      400 / 1024, 240 / 512,
      800 / 1024, 240 / 512,
      800 / 1024, 0,
      400 / 1024, 0,
      
      0,0,
      400 / 1024, 0,
      400 / 1024, 240 / 512,
      0, 240 / 512,
      
      400 / 1024, 480 / 512,
      
      650 / 1024, 480 / 512,
      650 / 1024, 280 / 512,
      750 / 1024, 280 / 512,
      750 / 1024, 480 / 512,
      
      800 / 1024, 480 / 512,
      800 / 1024, 240 / 512,
      400 / 1024, 240 / 512,
      
      450 / 1024, 150 / 512,
      550 / 1024, 150 / 512,
      550 / 1024, 50 / 512,
      450 / 1024, 50 / 512,
      
      650 / 1024, 150 / 512,
      750 / 1024, 150 / 512,
      750 / 1024, 50 / 512,
      650 / 1024, 50 / 512,
    ] 
  ),
  "trim": new model(
    [
      -198, -198, 0, //0
      -198, 198, 0,
      -198, 198, 10,
      -198, -198, 10, //3
      
      -198, 198, 0, //4
      198, 198, 0,
      198, 198, 10,
      -198, 198, 10, //7
      
      198, 198, 0, //8
      198, -198, 0,
      198, -198, 10,
      198, 198, 10, //11
      
      -198, -198, 0, //12
      198, -198, 0,
      198, -198, 10,
      -198, -198, 10, //15
      
      -145, -198, 0, //16 interior bottom right
      -55, -198, 0, //17 interior bottom left
      -55, -198, 195, //18 interior top left
      -145, -198, 195, //19 interior top right
      
      -150, -198, 10,//20 exterior bottom right
      -50, -198, 10,//21 exterior bottom left
      -50, -198, 200,//22 exterior top left
      -150, -198, 200, //23 exterior top right
      
      -200, 200, 10, // 24
      200, 200, 10,
      200, -200, 10,
      -50, -200, 10,//27
      -150, -200, 10,//28
      -200, -200, 10, //29
      
      -198, 198, 10, // 30
      198, 198, 10,
      198, -198, 10,
      -50, -198, 10,//33
      -150, -198, 10,//34
      -198, -198, 10, //35
      
      -50, -198, 10, //36
      -50, -200, 10,
      -50, -200, 200,
      -50, -198, 200,//39
      
      -50, -198, 200,//40
      -50, -200, 200,
      -150, -200, 200,
      -150, -198, 200,//43
      
      -150, -198, 200,//44
      -150, -200, 200,
      -150, -200, 10,
      -150, -198, 10,//47
      
      -145, -198, 0,//48
      -145, -213, 0,
      -145, -213, 195,
      -145, -198, 195,//51
    ],
    [
      -1, 0, 0,
      -1, 0, 0,
      -1, 0, 0,
      -1, 0, 0,
      
      0, 1, 0,
      0, 1, 0,
      0, 1, 0,
      0, 1, 0,
      
      1, 0, 0,
      1, 0, 0,
      1, 0, 0,
      1, 0, 0,
      
      0, -1, 0,
      0, -1, 0,
      0, -1, 0,
      0, -1, 0,
      
      0, -1, 0,
      0, -1, 0,
      0, -1, 0,
      0, -1, 0,
      
      0, -1, 0,
      0, -1, 0,
      0, -1, 0,
      0, -1, 0,
      
      0, 0, 1,
      0, 0, 1,
      0, 0, 1,
      0, 0, 1,
      0, 0, 1,
      0, 0, 1,
      
      0, 0, 1,
      0, 0, 1,
      0, 0, 1,
      0, 0, 1,
      0, 0, 1,
      0, 0, 1,
      
      1, 0, 0,
      1, 0, 0,
      1, 0, 0,
      1, 0, 0,
      
      0, 0, 1,
      0, 0, 1,
      0, 0, 1,
      0, 0, 1,
      
      -1, 0, 0,
      -1, 0, 0,
      -1, 0, 0,
      -1, 0, 0,
      
      -1, 0, 0,
      -1, 0, 0,
      -1, 0, 0,
      -1, 0, 0,
    ],
    [
      0, 1, 2,
      2, 3, 0,
      
      4, 5, 6,
      6, 7, 4,
      
      8, 9, 10,
      10, 11, 8,
      
      12, 15, 20,
      12, 16, 20,
      20, 16, 23,
      16, 23, 19,
      23, 18, 19,
      23, 18, 22,
      22, 18, 21,
      17, 18, 21,
      21, 17, 14,
      17, 14, 13,
      
      28, 34, 35,
      28, 29, 35,
      29, 35, 30,
      29, 24, 30,
      24, 30, 31,
      24, 25, 31,
      25, 31, 32,
      25, 26, 32,
      26, 32, 33,
      26, 27, 33,
      
      36, 37, 38,
      38, 39, 36,
      
      40, 41, 42,
      42, 43, 40,
      
      44, 45, 46,
      46, 47, 44,
      
      48, 49, 50,
      50, 51, 48,
    ],
    [
      0, 0,
      0, 1,
      1, 1,
      1, 0,
      
      0, 0,
      0, 1,
      1, 1,
      1, 0,
      
      0, 0,
      0, 1,
      1, 1,
      1, 0,
      
      0, 0,
      0, 1,
      1, 1,
      1, 0,
      
      0, 0,
      0, 1,
      1, 1,
      1, 0,
      
      0, 0,
      0, 1,
      1, 1,
      1, 0,
      
      0, 0,
      0, 1,
      1, 1,
      1, 0,
      
      .1, .9,
      .1, .9,
      .9, .9,
      .9, .1,
      
      0, 0,
      0, 1,
      1, 1,
      1, 0,
      0, 0,
      0, 0, //idc
      
      0, 0,
      0, 1,
      1, 1,
      1, 0,
      0, 0,
      0, 0,
      
      0, 0,
      0, 1,
      1, 1,
      1, 0,
      
      0, 0,
      0, 1,
      1, 1,
      1, 0,
    ]
  ),
  "ceiling": new model(
    [
      200, 200, 250,
      200, -200, 250,
      -200, -200, 250,
      -200, 200, 250,
    ],
    [
      0, 0, -1,
      0, 0, -1,
      0, 0, -1,
      0, 0, -1,
    ],
    [
      0, 1, 2,
      2, 3, 0,
    ],
    [
      400 / 512, 400 / 512,
      400 / 512, 0,
      0, 0,
      0, 400 / 512,
    ]
  ),
  "shelf": new model(
    [
      -2, -48, 12, //0
      -2, 48, 12,
      -50, 48, 12,
      -50, -48, 12, //3
      
      -2, -48, 59,//4
      -2, 48, 59,
      -50, 48, 59,
      -50, -48, 59, //7
      
      -2, -48, 106, //8
      -2, 48, 106,
      -50, 48, 106,
      -50, -48, 106, //11
      
      -2, -48, 153, //12
      -2, 48, 153,
      -50, 48, 153,
      -50, -48, 153, //15
      
      0, -50, 0, //16
      -50, -50, 0,
      -50, -50, 200,
      0, -50, 200, //19
      
      0, 50, 0, //20
      -50, 50, 0,
      -50, 50, 200,
      0, 50, 200, //23
      
      0, 50, 0, //24
      0, -50, 0,
      0, -50, 200,
      0, 50, 200, //27
      
      -50, 50, 0, //28
      -50, -50, 0,
      -50, -50, 12,
      -50, 50, 12, //31
      
      0, -50, 200, //32
      0, 50, 200,
      -50, 50, 200,
      -50, -50, 200, //35
      
      -50, 48, 12, //36
      -50, -48, 12,
      -50, -48, 198,
      -50, 48, 198, //39
      -50, -50, 200,
      -50, 50, 200, //41
      
      -50, -48, 59, //42
      -50, 48, 59,
      -50, 48, 57,
      -50, -48, 57, //45
      
      -50, -48, 106, //46
      -50, 48, 106,
      -50, 48, 104,
      -50, -48, 104, //49
      
      -50, -48, 153, //50
      -50, 48, 153,
      -50, 48, 151,
      -50, -48, 151, //53
      
      -2, -48, 12,//54
      -2, -48, 57,
      -50, -48, 57,
      -50, -48, 12, //57
      
      -2, -48, 59,//58
      -2, -48, 104,
      -50, -48, 104,
      -50, -48, 59, //61
      
      -2, -48, 106,//62
      -2, -48, 151,
      -50, -48, 151,
      -50, -48, 106, //65
      
      -2, -48, 153,//66
      -2, -48, 198,
      -50, -48, 198,
      -50, -48, 153, //69
      
      
      -2, 48, 12,//70
      -2, 48, 57,
      -50, 48, 57,
      -50, 48, 12, //73
      
      -2, 48, 59,//74
      -2, 48, 104,
      -50, 48, 104,
      -50, 48, 59, //77
      
      -2, 48, 106,//78
      -2, 48, 151,
      -50, 48, 151,
      -50, 48, 106, //81
      
      -2, 48, 153,//82
      -2, 48, 198,
      -50, 48, 198,
      -50, 48, 153, //85
      
      
      -2, 48, 12,//86
      -2, 48, 57,
      -2, -48, 57,
      -2, -48, 12, //89
      
      -2, 48, 59,//90
      -2, 48, 104,
      -2, -48, 104,
      -2, -48, 59, //93
      
      -2, 48, 106,//94
      -2, 48, 151,
      -2, -48, 151,
      -2, -48, 106, //97
      
      -2, 48, 153,//98
      -2, 48, 198,
      -2, -48, 198,
      -2, -48, 153, //101
      
      
      -50, 48, 57,//102
      -2, 48, 57,
      -2, -48, 57,
      -50, -48, 57, //105
      
      -50, 48, 104,//106
      -2, 48, 104,
      -2, -48, 104,
      -50, -48, 104, //109
      
      -50, 48, 151,//110
      -2, 48, 151,
      -2, -48, 151,
      -50, -48, 151, //113
      
      -50, 48, 198,//114
      -2, 48, 198,
      -2, -48, 198,
      -50, -48, 198, //117
      
    ],
    [
      0, 0, -1,
      0, 0, -1,
      0, 0, -1,
      0, 0, -1,
      
      0, 0, -1,
      0, 0, -1,
      0, 0, -1,
      0, 0, -1,
      
      0, 0, -1,
      0, 0, -1,
      0, 0, -1,
      0, 0, -1,
      
      0, 0, -1,
      0, 0, -1,
      0, 0, -1,
      0, 0, -1,
      
      0, 1, 0,
      0, 1, 0,
      0, 1, 0,
      0, 1, 0,
      
      0, -1, 0,
      0, -1, 0,
      0, -1, 0,
      0, -1, 0,
      
      1, 0, 0,
      1, 0, 0,
      1, 0, 0,
      1, 0, 0,
      
      -1, 0, 0,
      -1, 0, 0,
      -1, 0, 0,
      -1, 0, 0,
      
      0, 0, -1,
      0, 0, -1,
      0, 0, -1,
      0, 0, -1,
      
      1, 0, 0,
      1, 0, 0,
      1, 0, 0,
      1, 0, 0,
      1, 0, 0,
      1, 0, 0,
      
      1, 0, 0,
      1, 0, 0,
      1, 0, 0,
      1, 0, 0,
      
      1, 0, 0,
      1, 0, 0,
      1, 0, 0,
      1, 0, 0,
      
      1, 0, 0,
      1, 0, 0,
      1, 0, 0,
      1, 0, 0,
      
      0, 1, 0,
      0, 1, 0,
      0, 1, 0,
      0, 1, 0,
      
      0, 1, 0,
      0, 1, 0,
      0, 1, 0,
      0, 1, 0,
      
      0, 1, 0,
      0, 1, 0,
      0, 1, 0,
      0, 1, 0,
      
      0, 1, 0,
      0, 1, 0,
      0, 1, 0,
      0, 1, 0,
      
      
      0, -1, 0,
      0, -1, 0,
      0, -1, 0,
      0, -1, 0,
      
      0, -1, 0,
      0, -1, 0,
      0, -1, 0,
      0, -1, 0,
      
      0, -1, 0,
      0, -1, 0,
      0, -1, 0,
      0, -1, 0,
      
      0, -1, 0,
      0, -1, 0,
      0, -1, 0,
      0, -1, 0,
      
      
      1, 0, 0,
      1, 0, 0,
      1, 0, 0,
      1, 0, 0,
      
      1, 0, 0,
      1, 0, 0,
      1, 0, 0,
      1, 0, 0,
      
      1, 0, 0,
      1, 0, 0,
      1, 0, 0,
      1, 0, 0,
      
      1, 0, 0,
      1, 0, 0,
      1, 0, 0,
      1, 0, 0,
      
      
      0, 0, 1,
      0, 0, 1,
      0, 0, 1,
      0, 0, 1,
      
      0, 0, 1,
      0, 0, 1,
      0, 0, 1,
      0, 0, 1,
      
      0, 0, 1,
      0, 0, 1,
      0, 0, 1,
      0, 0, 1,
      
      0, 0, 1,
      0, 0, 1,
      0, 0, 1,
      0, 0, 1,
    ],
    [
      0, 1, 2,
      2, 3, 0,
      
      4, 5, 6,
      6, 7, 4,
      
      8, 9, 10,
      10, 11, 8,
      
      12, 13, 14,
      14, 15, 12,
      
      16, 17, 18,
      18, 19, 16,
      
      20, 21, 22,
      22, 23, 20,
      
      24, 25, 26,
      26, 27, 24,
      
      28, 29, 30,
      30, 31, 28,
      
      32, 33, 34,
      34, 35, 32,
      
      31, 36, 39,
      31, 41, 39,
      
      38, 39, 41,
      38, 40, 41,
      
      37, 38, 40,
      37, 30, 40,
      
      42, 43, 44,
      44, 45, 42,
      
      46, 47, 48,
      48, 49, 46,
      
      50, 51, 52,
      52, 53, 50,
      
      
      54, 55, 56,
      56, 57, 54,
      
      58, 59, 60,
      60, 61, 58,
      
      62, 63, 64,
      64, 65, 62,
      
      66, 67, 68,
      68, 69, 66,
      
      
      70, 71, 72,
      72, 73, 70,
      
      74, 75, 76,
      76, 77, 74,
      
      78, 79, 80,
      80, 81, 78,
      
      82, 83, 84,
      84, 85, 82,
      
      
      86, 87, 88,
      88, 89, 86,
      
      90, 91, 92,
      92, 93, 90,
      
      94, 95, 96,
      96, 97, 94,
      
      98, 99, 100,
      100, 101, 98,
      
      
      102, 103, 104,
      104, 105, 102,
      
      106, 107, 108,
      108, 109, 106,
      
      110, 111, 112,
      112, 113, 110,
      
      114, 115, 116,
      116, 117, 114,
      
    ],
    [
      1, 1,
      1, 0,
      0, 0,
      0, 1,
      
      1, 1,
      1, 0,
      0, 0,
      0, 1,
      
      1, 1,
      1, 0,
      0, 0,
      0, 1,
      
      1, 1,
      1, 0,
      0, 0,
      0, 1,
      
      1, 1,
      1, 0,
      0, 0,
      0, 1,
      
      1, 1,
      1, 0,
      0, 0,
      0, 1,
      
      1, 1,
      1, 0,
      0, 0,
      0, 1,
      
      1, 1,
      1, 0,
      0, 0,
      0, 1,
      
      1, 1,
      1, 0,
      0, 0,
      0, 1,
      
      0, 0,
      0, 0,
      0, 0,
      0, 0,
      0, 0,
      0, 0,
      
      0, 0,
      0, 0,
      0, 0,
      0, 0,
      
      0, 0,
      0, 0,
      0, 0,
      0, 0,
      
      0, 0,
      0, 0,
      0, 0,
      0, 0,
      
      1, 1,
      1, 0,
      0, 0,
      0, 1,
      
      1, 1,
      1, 0,
      0, 0,
      0, 1,
      
      1, 1,
      1, 0,
      0, 0,
      0, 1,
      
      1, 1,
      1, 0,
      0, 0,
      0, 1,
      
      
      1, 1,
      1, 0,
      0, 0,
      0, 1,
      
      1, 1,
      1, 0,
      0, 0,
      0, 1,
      
      1, 1,
      1, 0,
      0, 0,
      0, 1,
      
      1, 1,
      1, 0,
      0, 0,
      0, 1,
      
      
      1, 1,
      1, 0,
      0, 0,
      0, 1,
      
      1, 1,
      1, 0,
      0, 0,
      0, 1,
      
      1, 1,
      1, 0,
      0, 0,
      0, 1,
      
      1, 1,
      1, 0,
      0, 0,
      0, 1,
      
      
      1, 1,
      1, 0,
      0, 0,
      0, 1,
      
      1, 1,
      1, 0,
      0, 0,
      0, 1,
      
      1, 1,
      1, 0,
      0, 0,
      0, 1,
      
      1, 1,
      1, 0,
      0, 0,
      0, 1,
    ]
  ),
  "picture_frame_stand": new model(
    [
      0, 0, 0,//0
      
      4, 2, -.5,
      -.5, 2, 4,
      
      8, 8, 6,
      6, 8, 8,//4
      
      14, 8, -2,//5
      -2, 8, -2,
      -2, 8, 18,
      14, 8, 18,//8
    ],
    [
       //-1, 3, 3,
       //3, 3, -1,
       //
      4/9, -7/9, 4/9,
      4/9, -7/9, 4/9,
      4/9, -7/9, 4/9,
      4/9, -7/9, 4/9,
      4/9, -7/9, 4/9,
      
      0, -1, 0,
      0, -1, 0,
      0, -1, 0,
      0, -1, 0,
    ],
    [
      0, 1, 2,
      1, 2, 3,
      2, 3, 4,
      
      5, 6, 7,
      7, 8, 5,
      
    ],
    [
      0, 0,
      0, 0,
      0, 0,
      0, 0,
      0, 0,
      
      0, 0,
      0, 0,
      0, 0,
      0, 0,
    ]
  ),
};

export {models};