import {model} from "./model.js";

const tetrahedron = new model (
  [
    +1, +1, -1,
    +1, -1, +1,
    -1, +1, +1,
    -1, -1, -1
  ],
  [
    +1, +1, -1,
    +1, -1, +1,
    -1, +1, +1,
    -1, -1, -1
  ],
  [
    0, 1, 2,
    0, 1, 3,
    0, 2, 3,
    1, 2, 3
  ]
);

export {tetrahedron};