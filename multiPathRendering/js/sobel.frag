precision mediump float;

uniform sampler2D tDiffuse;
uniform vec2 texelSize;

varying vec2 vUv;

void main() {
    vec2 offsets[9];
    offsets[0] = vec2(-1.0, -1.0);
    offsets[1] = vec2( 0.0, -1.0);
    offsets[2] = vec2( 1.0, -1.0);
    offsets[3] = vec2(-1.0,  0.0);
    offsets[4] = vec2( 0.0,  0.0);
    offsets[5] = vec2( 1.0,  0.0);
    offsets[6] = vec2(-1.0,  1.0);
    offsets[7] = vec2( 0.0,  1.0);
    offsets[8] = vec2( 1.0,  1.0);

    float gx[9];
    float gy[9];

    gx[0] = -1.0; gx[1] = 0.0; gx[2] = 1.0;
    gx[3] = -2.0; gx[4] = 0.0; gx[5] = 2.0;
    gx[6] = -1.0; gx[7] = 0.0; gx[8] = 1.0;

    gy[0] = -1.0; gy[1] = -2.0; gy[2] = -1.0;
    gy[3] =  0.0; gy[4] =  0.0; gy[5] =  0.0;
    gy[6] =  1.0; gy[7] =  2.0; gy[8] =  1.0;

    vec3 sumX = vec3(0.0);
    vec3 sumY = vec3(0.0);

    for(int i = 0; i < 9; i++) {
        vec3 color = texture2D(tDiffuse, vUv + texelSize * offsets[i]).rgb;
        sumX += gx[i] * color;
        sumY += gy[i] * color;
    }

    vec3 edge = sqrt(sumX * sumX + sumY * sumY); // per-channel magnitude
    gl_FragColor = vec4(edge, 1.0);
}
