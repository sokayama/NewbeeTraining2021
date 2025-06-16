uniform vec3 lightDirection;

varying vec3 vNormal;
varying vec3 vLightDir;
varying vec3 vViewDir; // カメラからの視線ベクトル

void main() {
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    vNormal = normalize(normalMatrix * normal);
    vLightDir = normalize((viewMatrix * vec4(lightDirection, 0.0)).xyz);
    vViewDir = normalize(-mvPosition.xyz);

    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}