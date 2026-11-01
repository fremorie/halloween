uniform float uTime;

varying vec2 vUv;
varying vec3 vNormal;
varying vec3 vLeafTint;

#include <fog_pars_vertex>

const float swaySpeed = 1.6;
const float swayAmount = 0.15;

void main() {
    mat4 leafModelMatrix = modelMatrix * instanceMatrix;

    vec3 leafOrigin = instanceMatrix[3].xyz;
    float swayPhase = uTime * swaySpeed + dot(leafOrigin, vec3(7.0, 5.0, 3.0));
    float distanceFromStem = -position.z;

    vec3 swayedPosition = position;
    swayedPosition.y += sin(swayPhase) * swayAmount * distanceFromStem;

    vec4 mvPosition = viewMatrix * leafModelMatrix * vec4(swayedPosition, 1.0);

    #include <fog_vertex>

    gl_Position = projectionMatrix * mvPosition;

    vUv = uv;
    vNormal = normalize(mat3(leafModelMatrix) * normal);
    vLeafTint = vec3(1.0);
    #ifdef USE_INSTANCING_COLOR
        vLeafTint = instanceColor;
    #endif
}
