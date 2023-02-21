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
  
  
  
  
  
  let json_blob = new Blob([content], {type : "text/plain"});
  let blob_url  = window.URL.createObjectURL(json_blob);
  window.location.assign(blob_url);
}

export {obj2js};