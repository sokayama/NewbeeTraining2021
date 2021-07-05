uniform sampler2D uTex;
uniform float time;
varying vec2 vUv;

void main() {
    vec4 tex = texture2D(uTex, vUv);
    vec4 color = vec4(1.0);
    color.r = sin(time * 0.01 + 0.1);
    color.g = cos(time * 0.01 + 0.3);
    color.b = sin(time * 0.015 + 0.5);
    gl_FragColor = vec4( tex.rgb , 1.0) + (color * 0.5);
}