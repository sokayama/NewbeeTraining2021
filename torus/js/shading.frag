uniform vec4 color;

varying vec3 vNormal;
varying vec3 vLightDir;

void main() {
    float light = max(dot(vNormal, normalize(vLightDir)), 0.0);
    gl_FragColor = vec4(color.rgb * light, 1.0);
}