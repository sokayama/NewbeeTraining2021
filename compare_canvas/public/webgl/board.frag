precision mediump float;

uniform sampler2D uTex;
uniform vec4 uColor;
varying vec2 vTexCoord;

void main(){
  vec4 dest = texture2D(uTex, vTexCoord); 
  vec4 color = dest * uColor;
  // color = vec3(vTexCoord.x, vTexCoord.y/ 100.0, 0.0);
  // color = vec3(gl_FragCoord.x / 100.0, gl_FragCoord.y / 100.0, 0.0);

  gl_FragColor = vec4( color );
}
