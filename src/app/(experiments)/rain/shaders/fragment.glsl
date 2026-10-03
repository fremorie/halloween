uniform float uTime;
uniform sampler2D uPerlinNoise;
uniform float uAspectRatio;

varying vec2 vUv;

#include "../../../../shaders/includes/hash11.glsl"
#include "../../../../shaders/includes/hash21.glsl"

float rainLayer(vec2 p, float columnsCount, float slotHeight, float lineWidth, float speed, float seed) {
    // #start HORIZONTAL
    float x = (p.x + seed * 0.37) * columnsCount;
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

float lightning(float time) {
    float period = 7.0; // seconds
    float periodID = floor(time / period);

    float periodRandom = hash11(periodID);
    float hasFlash = step(periodRandom, 0.45); // 45% of periods get a flash

    float flashStart = fract(periodRandom * 13.7) * (period - 1.0); // between 0 and 6 seconds
    float timeInPeriod = fract(time / period) * period; // seconds since period started (0-7)
    float timeSinceFlash = timeInPeriod - flashStart;

    float hasStarted = step(0.0, timeSinceFlash);

    return exp(-timeSinceFlash * 9.0) * hasFlash * hasStarted;
}

void main() {
    // Sky
    vec3 skyTop = vec3(0.035, 0.05, 0.085);
    vec3 skyBottom = vec3(0.008, 0.01, 0.018);
    vec3 color = mix(skyBottom, skyTop, vUv.y);

    // Lightning
    float lightningStrike = lightning(uTime);
    color += vec3(0.35, 0.4, 0.55) * lightningStrike * mix(0.4, 1.0, vUv.y);

    vec2 p = vec2(vUv.x * uAspectRatio, vUv.y);

    // Slant
    float slant = 0.12 + 0.04 * sin(uTime * 0.25);
    p.x += p.y * slant;

    const int LAYERS = 6;

    for (int i = 0; i < LAYERS; i++) {
        float depth = float(i) / float(LAYERS - 1); // 0 = near, 1 = far
        float columnsCount = mix(20.0, 100.0, depth);
        float slotHeight = mix(0.4, 0.2, depth);
        float lineWidth = mix(0.003, 0.001, depth);
        float speed = mix(1.5, 1.0, depth);
        float layerBrightness = mix(1.0, 0.4, depth);

        float drop = rainLayer(p, columnsCount, slotHeight, lineWidth, speed, float(i));

        vec3 tint = mix(vec3(0.85, 0.9, 1.0), vec3(0.75, 0.82, 0.95), depth);
        vec3 layerColor = drop * layerBrightness * tint;

        // lightning
        layerColor *= 1.0 + lightningStrike * 2.5;

        color += layerColor;
    }

    // Vignette
    vec2 fromCenter = vUv - 0.5;
    float vignette = 1.0 - dot(fromCenter, fromCenter) * 2.0;
    vignette = max(vignette, 0.0);
    color *= vignette;

    // Final color
    gl_FragColor = vec4(color, 1.0);
}
