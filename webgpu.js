import {constants} from "./constants.js";

class OrbeezProgram {
  const vshader_src =
`#version 300 es
precision highp float;
in vec4 position;
void main() {
  gl_Position = position;
}`;

  constructor(gl, size, fshader_src) {
    this.gl = gl;
    this.size = size;
    this.program = this.createProgram(vshader_src, fshader_src);
    this.positionAttrLoc = gl.getAttribLocation(this.program, "position");
  }

  createProgram(vshader_src, fshader_src) {
    const gl = this.gl;
    const program = gl.createProgram();
    gl.attachShader(program, this.loadShader(vshader_src, gl.VERTEX_SHADER));
    gl.attachShader(program, this.loadShader(fshader_src, gl.FRAGMENT_SHADER));
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.log('Error in program linking:' + gl.getProgramInfoLog(program));
      gl.deleteProgram(program);
      return null;
    }
    return program;
  }

  loadShader(shaderSource, shaderType) {
    const gl = this.gl;
    const shader = gl.createShader(shaderType);
    gl.shaderSource(shader, shaderSource);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      const lastError = gl.getShaderInfoLog(shader);
      console.log('*** Error compiling shader \'' + shader + '\':' + lastError + `\n` + shaderSource.split('\n').map((l,i) => `${i + 1}: ${l}`).join('\n'));
      gl.deleteShader(shader);
      return null;
    }
    return shader;
  }

  createTexture(data, width, height) {
    const gl = this.gl;
    const tex = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, tex);
    gl.texImage2D(
      gl.TEXTURE_2D,
      0,           // mip level
      gl.RGBA32F,  // internal format
      width,
      height,
      0,           // border
      gl.RGBA,     // format
      gl.FLOAT,    // type
      data,
    );
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    return tex;
  }
  
  createFramebuffer(tex) {
    const gl = this.gl;
    const fb = gl.createFramebuffer();
    gl.bindFramebuffer(gl.FRAMEBUFFER, fb);
    gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, tex, 0);
    return fb;
  }

  dumpPixelsToGrid(xstart, ystart, width, height) {
    const pixel_array = new Float32Array(4 * width * height);
    this.gl.readPixels(xstart, ystart, width, height, this.gl.RGBA, this.gl.FLOAT, pixel_array);
    const dump = document.createElement("div");
    dump.className = "dump";
    dump.style.setProperty("--grid-columns", width);
    const getfloat = (idx) => pixel_array[idx].toFixed(2);
    for (let i = 0; i < width; i++) {
      for (let j = 0; j < height; j++) {
	let idx = (i*width + j) * 4;
 	e.innerText =
`${getfloat(idx++)}
${getfloat(idx++)}
${getfloat(idx++)}
${getfloat(idx++)}`;
	dump.appendChild(e);
      }
    }
    return dump;
  }
}

class OrbeezCollide extends OrbeezProgram {
  const fshader_src =
`#version 300 es
precision highp float;

// TODO: wall collisions
//uniform vec3 spaceDimensions;
uniform float orbeeDiameter;
uniform float orbeeDiameterSquared;
uniform float orbeeBounceFactor;
uniform sampler2D positionTex;
out vec4 acc;

void main() {
  gl_FragColor = vec4(0);
  int idx0 = int(gl_FragCoord.x);
  int idx1 = int(gl_FragCoord.y);
  if (idx1 <= idx0) {
    return;
  }
  vec4 loc0 = texelFetch(positionTex, idx0, 0);
  vec4 loc1 = texelFetch(positionTex, idx1, 0);
  vec4 offset = loc0 - loc1;
  vec4 offset_squared = offset * offset;
  float d_squared = offset_squared.x + offset_squared.y + offset_squared.z;
  if (d_squared >= orbeeDiameterSquared) {
    return;
  }
  float d = sqrt(d_squared);
  float acc_ratio = (orbeeDiameter - d)/d * orbeeBounceFactor;
  acc = offset * acc_ratio;
}`;

  constructor(gl, size) {
    super(gl, size, fshader_src);
    // TODO: wall collisions
    //this.orbeeSpaceDimensionLoc = gl.getUniformLocation(this.program, "spaceDimensions");
    //gl.uniform3f(this.orbeeSpaceDimensionsLoc, constants.orbee_radius * 2);
    this.orbeeDiameterLoc = gl.getUniformLocation(this.program, "orbeeDiameter");
    gl.uniform1f(this.orbeeDiameterLoc, constants.orbee_radius * 2);
    this.orbeeDiameterSquaredLoc = gl.getUniformLocation(this.program, "orbeeDiameterSquared");
    gl.uniform1f(this.orbeeDiameterSquaredLoc,
		 constants.orbee_radius * constants.orbee_radius * 4);
    this.orbeeBounceLoc = gl.getUniformLocation(this.program, "orbeeBounceFactor");
    gl.uniform1f(this.orbeeBounceLoc, constants.bounce);
    this.positionTexLoc = gl.getUniformLocation(this.program, "positionTex");
    this.vertexBuf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
      -1, -1,
       1,  1,
      -1,  1]), gl.STATIC_DRAW);
    this.collisionTex = this.createTexture(null, size, size);
    this.collisionFb = this.createFramebuffer(this.collisionTex);
  }
  
  run(positionTex) {
    const gl = this.gl;
    gl.useProgram(this.program);
    gl.bindFramebuffer(gl.FRAMEBUFFER, this.collisionFb);
    gl.viewport(0, 0, this.size, this.size);
    gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuf);
    gl.enableVertexAttribArray(this.positionAttrLoc);
    gl.vertexAttribPointer(this.positionAttrLoc, 2, gl.FLOAT, false, 0, 0);
    gl.ActivateTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, positionTex);
    gl.uniform1i(this.positionTexLoc, 0);

    gl.drawArrays(gl.TRIANGES, 0, 3);
    return this.collisionTex;
  }
}

class OrbeezAccelerate extends OrbeezProgram {
  const fshader_src =
`#version 300 es
precision highp float;

uniform int size;
unfiorm float scale;
uniform float damping;
uniform float gravity;
uniform sampler2D velocityTex;
uniform sampler2D collisionTex;
out vec4 vel;

void main() {
  int i = int(gl_FragCoord.x);
  vel = texelFetch(velocityTex, ivec2(i, 0), 0);
  for (int j = 0; j < size; j++) {
    if (i < j) {
      vel += texelFetch(collisionTex, ivec2(i, j), 0);
    }
    if (i > j) {
      vel -= texelFetch(collisionTex, ivec2(j, i), 0);
    }
  }
  vel *= (damping * scale);
  vel.z -= (gravity * scale);
}`;

  constructor(gl, size) {
    super(gl, size, fshader_src);
    this.sizeLoc = gl.getUniformLocation(this.program, "size");
    gl.uniform1i(this.sizeLoc, size);
    this.orbeeScaleLoc = gl.getUniformLocation(this.program, "scale");
    this.orbeeDampingLoc = gl.getUniformLocation(this.program, "damping");
    this.orbeeGravityLoc = gl.getUniformLocation(this.program, "gravity");
    this.velocityTexLoc = gl.getUniformLocation(this.program, "velocityTex");
    this.collisionTexLoc = gl.getUniformLocation(this.program, "collisionTex");
    this.vertexBuf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
      -1, 0,
       1, 0]), gl.STATIC_DRAW);
    this.newVelocityTex = this.createTexture(null, size, 1);
    this.newVelocityFb = this.createFramebuffer(this.newVelocityTex);
  }

  run(velocityTex, collisionTex, scale) {
    const gl = this.gl;
    gl.useProgram(this.program);
    gl.uniform1f(this.orbeeScaleLoc, scale);
    gl.uniform1f(this.orbeeGravityLoc, gravity);
    gl.uniform1f(this.orbeeDampingLoc, damping);
    gl.bindFramebuffer(gl.FRAMEBUFFER, this.newVelocityFb);
    gl.viewport(0, 0, this.size, 1);
    gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuf);
    gl.enableVertexAttribArray(this.positionAttrLoc);
    gl.vertexAttribPointer(this.positionAttrLoc, 2, gl.FLOAT, false, 0, 0);
    gl.ActiveTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, velocityTex);
    gl.ActiveTexture(gl.TEXTURE0 + 1);
    gl.bindTexture(gl.TEXTURE_2D, collisionTex);
    gl.uniform1i(this.velocityTexLoc, 0);
    gl.uniform1i(this.collisionTexLoc, 1);

    gl.drawArrays(gl.LINES, 0, 2);
    let result = this.newVelocityTex;
    this.newVelocityTex = velocityTex;
    return result;
  }
}

class OrbeezMove extends OrbeezProgram {
  const fshader_src =
`#version 300 es
precision highp float;

uniform sampler2D positionTex;
uniform sampler2D velocityTex;
out vec4 new_loc;

void main() {
  int idx = int(gl_FragCoord.x);
  vec4 old_loc = texelFetch(positionTex, ivec2(idx, 0), 0);
  vec4 vel = texelFetch(velocityTex, ivec2(idx, 0), 0);
  new_loc = old_loc + vel;
}`;

  constructor(gl, size) {
    super(gl, size, fshader_src);
    this.positionTexLoc = gl.getUniformLocation(this.program, "positionTex");
    this.velocityTexLoc = gl.getUniformLocation(this.program, "velocityTex");
    this.vertexBuf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
      -1, 0,
       1, 0], gl.STATIC_DRAW));
    this.newPositionTex = this.createTexture(null, size, 1);
    this.newPositionFb = this.createFramebuffer(this.newPositionTex);
  }

  run(positionTex, velocityTex) {
    const gl = this.gl;
    gl.bindFramebuffer(gl.FRAMEBUFFER, this.newPositionFb);
    gl.viewport(0, 0, this.size, 1);
    gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuf);
    gl.enableVertexAttribArray(this.positionAttrLoc);
    gl.vertexAttribPointer(this.positionAttrLoc, 2, gl.FLOAT, false, 0, 0);
    gl.ActiveTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, positionTex);
    gl.ActiveTexture(gl.TEXTURE0 + 1);
    gl.bindTexture(gl.TEXTURE_2D, velocityTex);
    gl.useProgram(this.program);
    gl.uniform1i(this.positionTexLoc, 0);
    gl.uniform1i(this.velocityTexLoc, 1);

    gl.drawArrays(gl.LINES, 0, 2);
    let result = this.newPositionTex;
    this.newPositionTex = positionTex;
    return result;
  }
}

class OrbeezPhysics {
  constructor(gl, size) {
    this.gl = gl;
    this.size = size;
    this.move = new OrbeezMove(gl, size);
    this.accelerate = new OrbeezAccelerate(gl, size);
    this.collide = new OrbeezCollide(gl, size);
    this.positionTex = this.move.createTexture(null, size, 1);
    this.velocityTex = this.move.createTexture(null, size, 1);
    gl.bindTexture(gl.TEXTURE_2D, this.positionTex);
    gl.texStorage2D(gl.TEXTURE_2D, 1, gl.RGBA32F, size, 1);
    gl.bindTexture(gl.TEXTURE_2D, this.velocitesTex);
    gl.texStorage2D(gl.TEXTURE_2D, 1, gl.RGBA32F, size, 1);
    gl.bindTexture(gl.TEXTURE_2D, null);
  }    

  run(positionBuf, velocityBuf, iterations) {
    const gl = this.gl;
    gl.bindBuffer(gl.PIXEL_UNPACK_BUFFER, positionBuf);
    gl.bindTexture(gl.TEXTURE_2D, this.positionTex);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA32F, this.size, 1, 0, gl.RGBA, gl.FLOAT, 0);
    gl.bindBuffer(gl.PIXEL_UNPACK_BUFFER, velocityBuf);
    gl.bindTexture(gl.TEXTURE_2D, this.velocityTex);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA32F, this.size, 1, 0, gl.RGBA, gl.FLOAT, 0);
    gl.bindBuffer(gl.PIXEL_UNPACK_BUFFER, null);
    gl.bindTexture(gl.TEXTURE_2D, null);
    const scale = 1 / iterations;
    for (let i = 0; i < iterations; i++) {
      const collisionTex = this.collide.run(this.positionTex);
      this.velocityTex = this.accelerate.run(this.velocityTex, collisionTex, scale);
      if (i == iterations - 1) {
	gl.bindBuffer(gl.PIXEL_PACK_BUFFER, velocityBuf);
	gl.readPixels(0, 0, this.size, 1, gl.RGBA, gl.FLOAT, 0);
	gl.bindBuffer(gl.PIXEL_PACK_BUFFER, null);
      }
      this.positionTex = this.move.run(this.positionTex, this.velocityTex);
    }
    gl.bindBuffer(gl.PIXEL_PACK_BUFFER, positionBuf);
    gl.readPixels(0, 0, this.size, 1, gl.RGBA, gl.FLOAT, 0);
    gl.bindBuffer(gl.PIXEL_PACK_BUFFER, null);
  }
}

export {OrbeezPhysics};
