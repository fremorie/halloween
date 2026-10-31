#include "../includes/reveal.glsl"

uniform sampler2D uGrassMap;
uniform float uGrassMapWorldSize;

varying vec3 vRevealWorldPosition;

float grassPatchCoverage(vec3 worldPosition) {
    vec2 grassMapUv = vec2(worldPosition.x, -worldPosition.z) / uGrassMapWorldSize + 0.5;
    float grassMask = texture2D(uGrassMap, grassMapUv).r;

    return smoothstep(0.2, 0.9, grassMask);
}

vec4 groundRevealColor(vec4 paintedGroundColor, vec3 worldPosition) {
    float paintedLuminance = dot(paintedGroundColor.rgb, vec3(0.2126, 0.7152, 0.0722));
    vec4 grayGrassPatchGround = vec4(
        vec3(paintedLuminance),
        paintedGroundColor.a * grassPatchCoverage(worldPosition)
    );

    return mix(grayGrassPatchGround, paintedGroundColor, revealAmount(worldPosition));
}

void main() {
}
