uniform float uTime;
uniform sampler2D uPerlinNoise;
uniform float uAspectRatio;

varying vec2 vUv;

#include "../../../../shaders/includes/hash11.glsl"
#include "../../../../shaders/includes/hash21.glsl"

const float SPEED = 1.5; // screens per second
const float COLUMNS_COUNT = 80.0;
const float SLOT_HEIGHT = 0.3;
const float LINE_WIDTH = 0.003;

float rainLayer(vec2 p, float columnsCount, float slotHeight, float lineWidth, float speed, float seed) {
    // #start HORIZONTAL
    float x = p.x * columnsCount;
    float columnX = fract(x) - 0.5;

    float lineWidthInColumns = lineWidth * columnsCount;
    float maxShift = 0.5 - lineWidthInColumns; // how far the center can move

    float columnID = floor(x);
    float columnRandom = (hash11(columnID + seed * 100.0) - 0.5) * 2.0; // [-1, 1]
    float shift = columnRandom * maxShift;

    float distanceToLine = abs(columnX + shift); // in column units
    distanceToLine /= columnsCount; // convert to screen units
    float line = 1.0 - smoothstep(0.0, lineWidth, distanceToLine);
    // #end HORIZONTAL

    // #start VERTICAL
    float y = p.y / slotHeight;

    // Infer new random from columnRandom, so we don't compute yet another hash
    float columnRandom2 = fract(columnRandom * 13.7); // [0, 1)
    float verticalShift = columnRandom2;
    y += verticalShift;

    // Animate
    float columnRandom3 = fract(columnRandom * 7.31); // [0, 1)
    float columnSpeed = speed * mix(0.7, 1.3, columnRandom3);
    y += uTime * columnSpeed / slotHeight;

    float slotY = fract(y);
    float slotID = floor(y);

    float slotRandom = hash21(vec2(columnID + seed * 113.0, slotID));
    float dropLength = mix(0.2, 0.8, slotRandom);

    float density = 0.3;
    float slotRandom2 = fract(slotRandom * 13.7);
    float shouldShowDrop = step(slotRandom2, density);
    // #end VERTICAL

    // Fade the tail of the drop
    float distanceFromHead = slotY / dropLength; // 0 at the head, 1 at the tail, n above the tail
    distanceFromHead = 1.0 - distanceFromHead; // 1 at the head, 0 at the tail, -n above the tail
    float tailFade = clamp(distanceFromHead, 0.0, 1.0); // 1 at the head, 0 at the tail, 0 above the tail
    tailFade = pow(tailFade, 3.0);

    // Fade the head of the drop
    float headFade = smoothstep(0.0, 0.02, slotY);

    // Randomize drops brightness
    float slotRandom3 = fract(slotRandom * 3.1);
    float dropBrightness = mix(0.6, 1.0, slotRandom3);

    // Combine horizontal + vertical split
    float drop = line * tailFade * headFade * shouldShowDrop * dropBrightness;

    return drop;
}

void main() {
    vec3 color = vec3(0.0, 0.0, 0.0);

    vec2 p = vec2(vUv.x * uAspectRatio, vUv.y);

    float drop = rainLayer(p, COLUMNS_COUNT, SLOT_HEIGHT, LINE_WIDTH, SPEED, 1.0);

    color = vec3(drop);

    gl_FragColor = vec4(color, 1.0);
}
