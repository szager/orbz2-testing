class model {
  constructor(vertex_positions, vertex_normals, faces) {
    this.vertex_positions = vertex_positions;
    this.vertex_normals = vertex_normals;
    this.faces = faces;
  }
  add_to_scene(scene) {
    let object_index = scene.object_colors.length / 3;
    for(let i = 0; i < 3; i++) {
      scene.object_colors.push(Math.random());
      scene.object_translations.push(0);
    }
    //scene.object_shininess.push(0);
    let scene_vertex_count = Math.floor(scene.vertex_positions.length / 3);
    let this_vertex_count = Math.floor(this.vertex_positions.length / 3);
    for (let i = 0; i < this_vertex_count; i++) {
      scene.object_indices.push(object_index);
    }
    scene.vertex_positions = scene.vertex_positions.concat(this.vertex_positions);
    scene.vertex_normals = scene.vertex_normals.concat(this.vertex_normals);
    this.faces.forEach((corner) => {
      scene.faces.push(corner + scene_vertex_count);
    });
  }
}

export {model};