varying vec4 vColor;

void main() {
    vColor = vec4(uv, 1.0, 1.0);
    
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}