uniform vec3 uLeavesColor;

varying vec3 vNormal;
varying vec3 vPosition;
varying vec2 vUv;

#include "../includes/utils.glsl"

void main() {
    vec3 finalColor = uLeavesColor;

    // Normal
    vec3 normal = normalize(vNormal);
    vec2 uv = normalize(vUv);

    // Fresnel
    vec3 viewDirection = normalize(vPosition - cameraPosition);
    float fresnel = dot(viewDirection, normal) + 1.0;
    fresnel = remap(fresnel, 0.0, 2.0, 0.05, 1.0);

    finalColor *= fresnel;

    gl_FragColor = vec4(finalColor, 1.0);
}