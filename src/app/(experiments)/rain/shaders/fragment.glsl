uniform float uTime;
uniform sampler2D uPerlinNoise;
uniform float uAspectRatio;

varying vec2 vUv;

#include "../../../../shaders/includes/hash11.glsl"
#include "../../../../shaders/includes/hash21.glsl"

void main() {
    vec3 color = vec3(0.0, 0.0, 0.0);

    vec2 p = vec2(vUv.x * uAspectRatio, vUv.y);

    // #start HORIZONTAL
    float columnsCount = 80.0;
    float x = p.x * columnsCount;
    float columnX = fract(x) - 0.5;

    float lineWidth = 0.003;
    float lineWidthInColumns = lineWidth * columnsCount;
    float maxShift = 0.5 - lineWidthInColumns; // how far the center can move

    float columnID = floor(x);
    float columnRandom = (hash11(columnID) - 0.5) * 2.0; // [-1, 1]
    float shift = columnRandom * maxShift;

    float distanceToLine = abs(columnX + shift); // in column units
    distanceToLine /= columnsCount; // convert to screen units
    float line = 1.0 - smoothstep(0.0, lineWidth, distanceToLine);
    // #end HORIZONTAL

    // #start VERTICAL
    float slotHeight = 0.3;
    float y = p.y / slotHeight;
    float slotY = fract(y);
    float slotID = floor(y);

    float slotRandom = hash21(vec2(columnID, slotID));
    float dropLength = mix(0.2, 0.8, slotRandom);

    float density = 0.3;
    float slotRandom2 = fract(slotRandom * 13.7);
    float shouldShowDrop = step(slotRandom2, density);
    // #end VERTICAL

    // Combine horizontal + vertical split
    float drop = line * step(slotY, dropLength) * shouldShowDrop;

    color = vec3(drop);

    gl_FragColor = vec4(color, 1.0);
}
