  uniform mat4 projectionMatrix;
  uniform mat4 viewMatrix;
  uniform mat4 modelMatrix;
  
 
  attribute vec3 position;
  attribute vec2 uv;

  varying vec2 vUv;

  void main(){  
        vec4 modeLposition = modelMatrix * vec4(position, 1.0);
        vec4 viewMatrixPosition = viewMatrix * modelPosition;
        vec4 projectedPosition = projectionMatrix * viewMatrix;


          gl_Position = projectedPosition;
  }