import {model} from "./model.js";


function obj2js(obj_file_contents) {
  let js_file_contents = "";
  let positions = [];
  let normals = [];
  let corners = [];
  let vertices = [];
  let ordered_positions = [];
  let ordered_normals = [];
  let faces = [];
  
  let content = obj_file_contents.substring(obj_file_contents.indexOf("v"));
  let v_paragraph = content.substring(0, content.indexOf("vn")).replaceAll("v ","").replaceAll(" ",`
`).split(`
`);
  let vn_paragraph = content.substring(content.indexOf("vn"), content.indexOf("s")).replaceAll("vn ","").replaceAll(" ",`
`).split(`
`);
  
  
  let f_paragraph = content.substring(content.indexOf("f"), content.length - 1).replaceAll("f ","").replaceAll(" ",`
`).split(`
`);
  
  f_paragraph.forEach(corner => {
    if(corners.indexOf(corner) == -1 ) {
      corners.push(corner);
      let pos_index = Number(corner.split("//")[0]);
      let n_index = Number(corner.split("//")[1]);
      positions.push(v_paragraph[pos_index*3-3] * 7);
      positions.push(v_paragraph[pos_index*3-2] * 7);
      positions.push(v_paragraph[pos_index*3-1] * 7);
      normals.push(vn_paragraph[n_index*3-3]);
      normals.push(vn_paragraph[n_index*3-2]);
      normals.push(vn_paragraph[n_index*3-1]);
    }
    faces.push(corners.indexOf(corner));
  });
  
  
  
  js_file_contents = `    
new model([${positions}],[${normals}],[${faces}]);
  `;
  //let json_blob = new Blob([js_file_contents], {type : "text/plain"});
  //let blob_url  = window.URL.createObjectURL(json_blob);
  //window.location.assign(blob_url);
  console.log(js_file_contents);
}

export {obj2js};