#version 300 es
precision highp float;
in vec3 diffuse_color;
in vec3 fNormal;
in vec3 fPosition;
in vec3 to_lights[3];
out vec4 FragColor;




void main() {
  //cook-torance 
  highp float pi = 3.14159265359; //nah bro it's 4
  
  highp float ambient = 0.5;
   
  highp float sun = 10000.0;
  highp vec3 up = vec3(0.5, 0.25, 1.0);
  
  
  highp vec3 specular_color = vec3(0.5, 0.5, 0.5);
  highp float roughness = 0.1;
  highp float ri = 1.39;
  
  highp vec3 n = normalize(fNormal);
  highp vec3 v = normalize(-fPosition);
  if(dot(v, n) < 0.0) {
    n *= -1.0;
  }
  
  highp float angle = max(dot(v, n), 0.0);

  highp float sqrt_reflectance = (ri - 1.0) / (ri + 1.0);
  highp float reflectance = sqrt_reflectance * sqrt_reflectance;
  highp float fresnel = reflectance + (1.0 - reflectance) * pow(1.0 - angle, 5.0);
  highp float transmission = 1.0 - fresnel;
  
  highp float specular_illumination = ambient * fresnel;//d * fresnel * g * sun / (4.0 * dot(v, n) * dot(n, up)) + ambient * fresnel;
  
  
  
  highp float diffuse_illumination = ambient * transmission; //(max(dot(up, n), 0.0) * sun + ambient) * transmission;
  
  for(int i = 0; i < 3; i++) {
    highp vec3 to_light = to_lights[i] - fPosition;
    highp vec3 l = normalize(to_light);
    highp float intensity = sun / (pow(to_light.x, 2.0) + pow(to_light.y, 2.0) + pow(to_light.z, 2.0));
    
    
    highp vec3 h = normalize(l + v);
  //highp float d = 0.4;
  
    highp float fish = acos(dot(n, h)); //the symbol in the equation on wikipedia looks like a fish
    highp float d = exp(-pow(tan(fish),2.0) / pow(roughness, 2.0)) / (pi * pow(roughness, 2.0) * pow(cos(fish), 4.0));
  
  
    highp float g = min(1.0, min(
      2.0 * dot(h, n) * dot(v, n) / dot(v, h),
      2.0 * dot(h, n) * dot(l, n) / dot(v, h)
    ));
    
    specular_illumination += d * fresnel * g * intensity / (4.0 * dot(v, n) * dot(n, l));
    diffuse_illumination += (max(dot(l, n), 0.0) * intensity) * transmission;
  }
  
  highp vec3 illumination = specular_illumination * specular_color + diffuse_illumination * diffuse_color;
  highp vec3 gamma_corrected_illumination = pow(illumination, vec3(0.45359237));
  
  
  FragColor = vec4(gamma_corrected_illumination, 1.0);
  
}