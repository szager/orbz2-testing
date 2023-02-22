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
  let v_paragraph = content.substring(0, content.indexOf("vn"));
  let vn_paragraph = content.substring(content.indexOf("vn"), content.indexOf("s"));
  let f_paragraph = content.substring(content.indexOf("f")).replaceAll("f ","").replaceAll(`
`, "").replaceAll(" ",`
`);
  
  
  let json_blob = new Blob([f_paragraph], {type : "text/plain"});
  let blob_url  = window.URL.createObjectURL(json_blob);
  window.location.assign(blob_url);
}

export {obj2js};