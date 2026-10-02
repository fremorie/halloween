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

    float lineWidth = 0.003;
    float lineWidthInColumns = lineWidth * columnsCount;
    float maxShift = 0.5 - lineWidthInColumns; // how far the center can move

    float columnID = floor(x);
    float columnRandom = (hash11(columnID) - 0.5) * 2.0; // [-1, 1]
    float shift = columnRandom * maxShift;

    float distanceToLine = abs(columnX + shift); // in screen units
    distanceToLine /= columnsCount; // convert to screen units
    float line = 1.0 - smoothstep(0.0, lineWidth, distanceToLine);

    color = vec3(line);

    gl_FragColor = vec4(color, 1.0);
}
