uniform float uTime;

attribute float _seed;

const float flutterSpeed = 3.5;
const float flutterAmount = 0.15;

varying vec2 vUv;
varying float vSeed;
varying vec3 vWorldPosition;
varying vec3 vNormal;

#include <fog_pars_vertex>

void main() {
    float flutterPhase = uTime * flutterSpeed + _seed * 6.2831853;
    float tipWeight = uv.y;
    float outwardFlutter = sin(flutterPhase) * 0.5 + 0.5;
    vec3 flutteredPosition = position + normal * outwardFlutter * flutterAmount * tipWeight;

    vec4 mvPosition = modelViewMatrix * vec4(flutteredPosition, 1.0);

    #include <fog_vertex>

    gl_Position = projectionMatrix * mvPosition;

    vUv = uv;
    vSeed = _seed;
    vWorldPosition = (modelMatrix * vec4(flutteredPosition, 1.0)).xyz;
    vNormal = normalize(mat3(modelMatrix) * normal);
}
