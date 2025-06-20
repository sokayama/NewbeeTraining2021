uniform vec3 lightDirection;

varying vec3 vNormal;
varying vec3 vLightDir;

void main() {
    vNormal = normalize(normalMatrix * normal);
    vLightDir = normalize((viewMatrix * vec4(lightDirection, 0.0)).xyz);
    
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}