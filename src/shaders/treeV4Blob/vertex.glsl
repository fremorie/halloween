varying vec2 vUv;
varying vec3 vWorldPosition;
varying vec3 vNormal;

#include <fog_pars_vertex>

void main() {
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);

    #include <fog_vertex>

    gl_Position = projectionMatrix * mvPosition;

    vUv = uv;
    vWorldPosition = (modelMatrix * vec4(position, 1.0)).xyz;
    vNormal = normalize(mat3(modelMatrix) * normal);
}
