uniform vec4 color;
uniform vec3 ambientLight; 
uniform float shininess; // 光沢度
uniform vec3 specularColor;

varying vec3 vNormal;
varying vec3 vLightDir;
varying vec3 vViewDir;

void main() {
    vec3 N = normalize(vNormal);
    vec3 L = normalize(vLightDir);
    vec3 V = normalize(vViewDir);
    vec3 R = reflect(-L, N);  // 反射ベクトル

    float diff = max(dot(N, L), 0.0);
    float spec = pow(max(dot(R, V), 0.0), shininess);

    vec3 ambient = ambientLight * color.rgb;
    vec3 diffuse = diff * color.rgb;
    vec3 specular = spec * specularColor;

    vec3 finalColor = ambient + diffuse + specular;
    gl_FragColor = vec4(finalColor, 1.0);
}