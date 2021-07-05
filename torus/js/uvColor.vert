uniform vec4 color;
uniform vec3 lightDirection;
varying vec4 vColor;

void main() {
    vColor = color * vec4(uv, 1.0, 1.0);
    
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}