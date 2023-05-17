'use strict';

const vertexShaderSource = `#version 300 es
in vec4 a_position;
in vec4 color;

out vec4 v_color;

void main() {
  // Multiply the position by the matrix.
  gl_Position = a_position;

  // Pass the vertex color to the fragment shader.
  v_color = color;
}
`;

const fragmentShaderSource = `#version 300 es
precision highp float;

// Passed in from the vertex shader.
in vec4 v_color;

out vec4 outColor;

void main() {
  outColor = v_color;
}
`;

function load_shader(type, source, gl) {
  let shader = gl.createShader(type);
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    alert(`💩💩💩💩💩💩💩 ${gl.getShaderInfoLog(shader)}💩💩💩💩💩💩💩💩`);
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

function create_shader_program(vss, fss, gl) {
  let vs = load_shader(gl.VERTEX_SHADER, vss, gl);
  let fs = load_shader(gl.VERTEX_SHADER, fss, gl);
  let shader_program = gl.createProgram();
  gl.attachShader(shader_program, vs);
  gl.attachShader(shader_program, fs);
  gl.linkProgram(shader_program);
  return shader_program;
}


function main() {
  // Get A WebGL context
  /** @type {HTMLCanvasElement} */
  const canvas = document.querySelector('#canvas');
  const gl = canvas.getContext('webgl2');
  if (!gl) {
    return;
  }

  // Use our boilerplate utils to compile the shaders and link into a program
  var program = create_shader_program(vertexShaderSource, fragmentShaderSource, gl);

  const positionLoc = gl.getAttribLocation(program, 'a_position');
  const colorLoc = gl.getAttribLocation(program, 'color');
  //const matrixLoc = gl.getAttribLocation(program, 'matrix');

  // Create a vertex array object (attribute state)
  //const vao = gl.createVertexArray();

  // and make it the one we're currently working with
  //gl.bindVertexArray(vao);

  const positionBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
      -0.1,  0.4,
      -0.1, -0.4,
       0.1, -0.4,
      -0.1,  0.4,
       0.1, -0.4,
       0.1,  0.4,
      -0.4, -0.1,
       0.4, -0.1,
      -0.4,  0.1,
      -0.4,  0.1,
       0.4, -0.1,
       0.4,  0.1,
    ]), gl.STATIC_DRAW);
  const numVertices = 12;

  // setup the position attribute
  gl.enableVertexAttribArray(positionLoc);
  gl.vertexAttribPointer(
      positionLoc,  // location
      2,            // size (num values to pull from buffer per iteration)
      gl.FLOAT,     // type of data in buffer
      false,        // normalize
      0,            // stride (0 = compute from size and type above)
      0,            // offset in buffer
  );

  // setup matrixes, one per instance
  const numInstances = 5;
  // make a typed array with one view per matrix
  //const matrixData = new Float32Array(numInstances * 16);
  //const matrices = [];
//  for (let i = 0; i < numInstances; ++i) {
    //const byteOffsetToMatrix = i * 16 * 4;
  //  const numFloatsForView = 16;
//    matrices.push(new Float32Array(
      //  matrixData.buffer,
    //    byteOffsetToMatrix,
  //      numFloatsForView));
//  }

 // const matrixBuffer = gl.createBuffer();
//  gl.bindBuffer(gl.ARRAY_BUFFER, matrixBuffer);
  // just allocate the buffer
 // gl.bufferData(gl.ARRAY_BUFFER, matrixData.byteLength, gl.DYNAMIC_DRAW);

  // set all 4 attributes for matrix
//  const bytesPerMatrix = 4 * 16;
//  for (let i = 0; i < 4; ++i) {
 //   const loc = matrixLoc + i;
  //  gl.enableVertexAttribArray(loc);
    // note the stride and offset
  //  const offset = i * 16;  // 4 floats per row, 4 bytes per float
//    gl.vertexAttribPointer(
    //    loc,              // location
  //      4,                // size (num values to pull from buffer per iteration)
//        gl.FLOAT,         // type of data in buffer
       // false,            // normalize
      //  bytesPerMatrix,   // stride, num bytes to advance to get to next set of values
    //    offset,           // offset in buffer
    //);
    // this line says this attribute only changes for each 1 instance
    //gl.vertexAttribDivisor(loc, 1);
  //}

  // setup colors, one per instance
  const colorBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
  gl.bufferData(gl.ARRAY_BUFFER,
      new Float32Array([
          1, 0, 0, 1,  // red
          0, 1, 0, 1,  // green
          0, 0, 1, 1,  // blue
          1, 0, 1, 1,  // magenta
          0, 1, 1, 1,  // cyan
        ]),
      gl.STATIC_DRAW);

  // set attribute for color
  gl.enableVertexAttribArray(colorLoc);
  gl.vertexAttribPointer(colorLoc, 4, gl.FLOAT, false, 0, 0);
  // this line says this attribute only changes for each 1 instance
  gl.vertexAttribDivisor(colorLoc, 1);

  function render(time) {
    time *= 0.001; // seconds

    //webglUtils.resizeCanvasToDisplaySize(gl.canvas);
    
    // Tell WebGL how to convert from clip space to pixels
    //gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

    gl.useProgram(program);
    
    
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

  // setup the position attribute
  gl.enableVertexAttribArray(positionLoc);
  gl.vertexAttribPointer(
      positionLoc,  // location
      2,            // size (num values to pull from buffer per iteration)
      gl.FLOAT,     // type of data in buffer
      false,        // normalize
      0,            // stride (0 = compute from size and type above)
      0,            // offset in buffer
  );
    
    
    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
    gl.enableVertexAttribArray(colorLoc);
    gl.vertexAttribPointer(colorLoc, 4, gl.FLOAT, false, 0, 0);
    // this line says this attribute only changes for each 1 instance
    gl.vertexAttribDivisor(colorLoc, 1);
    // setup all attributes
    //gl.bindVertexArray(vao);

    // update all the matrices
    //matrices.forEach((mat, ndx) => {
      //mat4.translation(-0.5 + ndx * 0.25, 0, 0, mat);
      //mat4.zRotate(mat, time * (0.1 + 0.1 * ndx), mat);
    //});

    // upload the new matrix data
    //gl.bindBuffer(gl.ARRAY_BUFFER, matrixBuffer);
    //gl.bufferSubData(gl.ARRAY_BUFFER, 0, matrixData);

    gl.drawArraysInstanced(
      gl.TRIANGLES,
      0,             // offset
      numVertices,   // num vertices per instance
      numInstances,  // num instances
    );
    requestAnimationFrame(render);
  }
  requestAnimationFrame(render);
}

main();
