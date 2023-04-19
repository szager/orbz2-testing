#version 300 es
in vec3 vertex_position;
in vec3 vertex_normal;

in vec3 color;
in vec3 position;

uniform mat4 perspective_matrix;
uniform mat4 view_matrix;

uniform vec3 camera_translation;
out vec3 diffuse_color;
out vec3 fNormal;
out vec3 fPosition;

void main() {
  fNormal = vertex_normal;
  //diffuse_color = color;
  diffuse_color = vec3(0.1, 1.0, 0.0); // (0.5, 0.7, 0.2) is the color of grass, and (0.6, 0.9, 0.3) is the color of tennis ball.
  //gl_Position = perspective_matrix * view_matrix * vec4((vertex_position + position) - camera_translation, 1.0);
  fPosition = (vertex_position) - camera_translation;
  gl_Position = perspective_matrix * view_matrix * vec4(fPosition, 1.0);
}