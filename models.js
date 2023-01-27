class icosahedron {
  #golden_ratio = 0.5 + Math.sqrt(1.25);
  #ico_coord_a = golden_ratio / Math.sqrt(golden_ratio**2 + 1);
  #ico_coord_b = 1 / Math.sqrt(golden_ratio**2 + 1);
  #icosahedron_model = {
    positions: [
      0, +ico_coord_a, +ico_coord_b,
      0, -ico_coord_a, +ico_coord_b,
      0, -ico_coord_a, -ico_coord_b,
      0, +ico_coord_a, -ico_coord_b,
      +ico_coord_a, +ico_coord_b, 0,
      -ico_coord_a, +ico_coord_b, 0,
      -ico_coord_a, -ico_coord_b, 0,
      +ico_coord_a, -ico_coord_b, 0,
      +ico_coord_b, 0, +ico_coord_a,
      +ico_coord_b, 0, -ico_coord_a,
      -ico_coord_b, 0, -ico_coord_a,
      -ico_coord_b, 0, +ico_coord_a,
    ],
    normals: [
      0, +ico_coord_a, +ico_coord_b,
      0, -ico_coord_a, +ico_coord_b,
      0, -ico_coord_a, -ico_coord_b,
      0, +ico_coord_a, -ico_coord_b,
      +ico_coord_a, +ico_coord_b, 0,
      -ico_coord_a, +ico_coord_b, 0,
      -ico_coord_a, -ico_coord_b, 0,
      +ico_coord_a, -ico_coord_b, 0,
      +ico_coord_b, 0, +ico_coord_a,
      +ico_coord_b, 0, -ico_coord_a,
      -ico_coord_b, 0, -ico_coord_a,
      -ico_coord_b, 0, +ico_coord_a,
    ],
    faces: [
      0, 3, 4,
      0, 3, 5,
      1, 2, 6,
      1, 2, 7,
      4, 7, 8,
      4, 7, 9,
      5, 6, 10,
      5, 6, 11,
      8, 11, 0,
      8, 11, 1,
      9, 10, 2,
      9, 10, 3,
      0, 4, 8,
      3, 4, 9,
      1, 7, 8,
      2, 7, 9,
      0, 5, 11,
      3, 5, 10,
      1, 6, 11,
      2, 6, 10,
    ]
  };
}