uniform sampler2D uTex;
varying vec2 vUv;

void main() {
    vec4 tex = texture2D(uTex, vUv);
    gl_FragColor = vec4( tex.rgb , 1.0);
}