uniform float uPixelRatio;
uniform vec3 uPaperColor;
uniform float uGrainStrength;

#include "../includes/hash21.glsl"

float valueNoise(vec2 position) {
    vec2 cell = floor(position);
    vec2 positionInCell = fract(position);
    vec2 blend = positionInCell * positionInCell * (3.0 - 2.0 * positionInCell);

    float bottomLeft = hash21(cell);
    float bottomRight = hash21(cell + vec2(1.0, 0.0));
    float topLeft = hash21(cell + vec2(0.0, 1.0));
    float topRight = hash21(cell + vec2(1.0, 1.0));

    return mix(mix(bottomLeft, bottomRight, blend.x), mix(topLeft, topRight, blend.x), blend.y);
}

float layeredNoise(vec2 position) {
    float value = 0.0;
    float amplitude = 0.5;

    for (int layer = 0; layer < 5; layer++) {
        value += amplitude * valueNoise(position);
        position *= 2.03; // not exactly 2, so the layers' grids don't line up
        amplitude *= 0.5;
    }

    return value;
}

void mainImage(const in vec4 inputColor, const in vec2 uv, out vec4 outputColor) {
    vec2 positionInCssPixels = uv * resolution / uPixelRatio;

    float fibers = layeredNoise(positionInCssPixels / 1.5);
    float blotches = layeredNoise(positionInCssPixels / 40.0);
    float grain = 0.6 * fibers + 0.4 * blotches;

    vec3 paper = uPaperColor * (1.0 + uGrainStrength * (grain - 0.5));

    // White becomes the paper, dark stays dark
    outputColor = vec4(inputColor.rgb * paper, inputColor.a);
}
