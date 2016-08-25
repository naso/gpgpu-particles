varying vec3 pos;

void main()
{
  gl_FragColor = vec4(vec3(1.0), 1.0);
  if(pos.z != 0.0) {
    gl_FragColor.a = 1.0;
  } else {
    gl_FragColor.a = 0.55;
  }

}
