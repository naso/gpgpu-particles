#ifndef PI
#define PI 3.141592653589793
#endif

uniform sampler2D positions;
uniform float pointSize;
uniform float time;
varying vec3 pos;

attribute vec3 oldPos;

float backEaseInOut (float t, float b, float c, float d) {
  float s = 1.70158;
  if ((t/=d/2.0) < 1.0) return c/2.0*(t*t*(((s*=(1.525))+1.0)*t - s)) + b;
  return c/2.0*((t-=2.0)*t*(((s*=(1.525))+1.0)*t + s) + 2.0) + b;
}

float expoEaseOut (float t, float b, float c, float d) {
  if (t==d) {
    return b+c;
  } else {
    return c*(-pow(2.0, -10.0*t/d) + 1.0) + b;
  }
}

void main() {
  pos = texture2D( positions, position.xy ).xyz;
  vec3 target = pos;

  if (time < 200.0) {
    float z = expoEaseOut(time, oldPos.z, distance(pos.z, oldPos.z), 200.0);
    target.z = z;
  }

  gl_Position = projectionMatrix * modelViewMatrix * vec4( target, 1.0 );

  gl_PointSize = pointSize;
}
