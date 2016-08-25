uniform sampler2D positions;
varying vec3 pos;

float rand(vec2 n)
{
  return 0.5 + 0.5 * fract(sin(dot(n.xy, vec2(12.9898, 78.233)))* 43758.5453);
}

void main()
{
  gl_FragColor = vec4(vec3(1.0), 1.0);
  if(pos.z != 0.0) {
    gl_FragColor.a = 0.25;
  } else {
    gl_FragColor.a = 0.15;
  }

}
