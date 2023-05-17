class model {
  constructor(vertex_positions, vertex_normals, faces, uv_map) {
    this.vertex_positions = vertex_positions;
    this.vertex_normals = vertex_normals;
    this.faces = faces;
    if(uv_map) {
      this.uv_map = uv_map;
      for(let i = 0; i < this.uv_map.length; i++) {
        this.uv_map[i] *= 1;
      }
      alert(`there is a uv map :)${(Math.round(this.uv_map.length/2)<Math.round(this.vertex_positions.length/3))?"but it's bad":"and it's pretty good"}`);
    } else {
      this.uv_map = "This model does not have a UV map." // abusing javascript
      alert("no uv map :(");
    }
  }
  add_to_scene(scene) {
    //return;
    //let object_index = scene.object_translations.length / 3;
    //scene.object_colors.push(Math.random(), Math.random(), Math.random());
    //scene.object_translations.push(0, 0, 0);
    //scene.object_shininess.push(0);
    //let scene_vertex_count = Math.floor(scene.vertex_positions.length / 3);
    //let this_vertex_count = Math.floor(this.vertex_positions.length / 3);
    //for (let i = 0; i < this_vertex_count; i++) {
      //scene.object_indices.push(object_index);
    //}
    //scene.vertex_positions = scene.vertex_positions.concat(this.vertex_positions);
    //scene.vertex_normals = scene.vertex_normals.concat(this.vertex_normals);
    //this.faces.forEach((corner) => {
      //scene.faces.push(corner + scene_vertex_count);
    //});
  }
}

export {model};