vec3 position;

void main() {
  vec2 uv = gl_FragCoord.xy / positionsResolution.xy;
  vec4 tmpPos = texture2D(positions, uv);
  vec3 position = tmpPos.xyz;

  gl_FragColor = vec4(position, 1.0);
}
