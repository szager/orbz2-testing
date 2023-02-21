import {model} from "./model.js";


function obj2json(obj_file_contents) {
  let json_file = "";
  let positions = [];
  let normals = []
  
  
  
  
  
  
  
  
  
  
  let json_blob = new Blob([obj_file_contents], {type : "text/plain"});
  let blob_url  = window.URL.createObjectURL(json_blob);
  window.location.assign(blob_url);
}

export {obj2json};