uniform float uTime;

varying vec3 vNormal;
varying vec3 vPosition;

#include "../includes/utils.glsl"

float hash(float n) {
    return fract(sin(n)*43758.5453);
}

float noise(in vec2 x) {
    vec2 i = floor(x);
    vec2 f = fract(x);

    f = f*f*(3.0-2.0*f);

    float n = i.x + i.y*57.0;

    return mix(mix( hash(n+ 0.0), hash(n+ 1.0),f.x),
               mix( hash(n+57.0), hash(n+58.0),f.x),f.y);
}

void main() {
    vec3 localSpacePosition = position;
    float n = noise(localSpacePosition.xy * 2.0 + 0.5 * uTime);
    localSpacePosition += normal * n * 0.55;
    localSpacePosition.y *= 0.9;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(localSpacePosition, 1.0);

    vNormal = (modelMatrix * vec4(normal, 0.0)).xyz;
    vPosition = (modelMatrix * vec4(localSpacePosition, 1.0)).xyz;
}