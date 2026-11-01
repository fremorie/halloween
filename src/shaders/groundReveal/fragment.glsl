#include "../includes/reveal.glsl"

varying vec3 vRevealWorldPosition;

vec4 groundRevealColor(vec4 paintedGroundColor, vec3 worldPosition) {
    return vec4(
        paintedGroundColor.rgb,
        paintedGroundColor.a * revealAmount(worldPosition)
    );
}

void main() {
}
