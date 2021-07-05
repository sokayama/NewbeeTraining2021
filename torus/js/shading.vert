uniform vec4 color;
uniform vec3 lightDirection;
varying vec4 vColor;

void main() {
    vec3 invLight = normalize(normalMatrix * lightDirection);
    float diffuse = clamp(dot(normal, invLight), 0.1, 1.0);
    vColor = color * vec4(vec3(diffuse), 1.0);
    
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}