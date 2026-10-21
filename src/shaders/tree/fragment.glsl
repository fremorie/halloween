uniform vec3 uLeavesColor;
uniform sampler2D uLeavesTexture;

varying vec3 vNormal;
varying vec3 vPosition;
varying vec2 vUv;

#include "../includes/utils.glsl"

void main() {
    vec3 baseColor = texture2D(uLeavesTexture, vUv).rgb;

    vec3 finalColor = baseColor;

    // Normal
    vec3 normal = normalize(vNormal);
    vec2 uv = normalize(vUv);

    // Fresnel
    vec3 viewDirection = normalize(vPosition - cameraPosition);
    float fresnel = dot(viewDirection, normal) + 1.0;
    fresnel = remap(fresnel, 0.0, 2.0, 0.2, 1.0);

    finalColor *= fresnel;

    float gradient = remap(vPosition.y, 0.0, 4.0, 0.0, 1.5);

    finalColor *= vec3(gradient, 1.0, 1.0);

    gl_FragColor = vec4(finalColor, 1.0);
}