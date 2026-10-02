uniform float uTime;
uniform sampler2D uPerlinNoise;
uniform float uAspectRatio;

varying vec2 vUv;

#include "../../../../shaders/includes/hash11.glsl"

void main() {
    vec3 color = vec3(0.0, 0.0, 0.0);

    vec2 p = vec2(vUv.x * uAspectRatio, vUv.y);

    float columnsCount = 80.0;
    float x = p.x * columnsCount;
    float columnX = fract(x) - 0.5;

    float columnID = floor(x);
    float columnRandom = hash11(columnID);

    float dist = abs(columnX) / columnsCount; // convert to screen units
    float line = 1.0 - smoothstep(0.0, 0.003, dist);

    color = vec3(columnRandom);

    gl_FragColor = vec4(color, 1.0);
}
