uniform float uPixelRatio;

#define QUADRANT_RADIUS 7

const float SAMPLES_PER_QUADRANT = float((QUADRANT_RADIUS + 1) * (QUADRANT_RADIUS + 1));

const vec3 LUMINANCE_WEIGHTS = vec3(0.299, 0.587, 0.114);

const vec2 QUADRANT_DIRECTIONS[4] = vec2[4](
    vec2(-1.0, -1.0), // bottom-left
    vec2(1.0, -1.0), // bottom-right
    vec2(1.0, 1.0), // top-right
    vec2(-1.0, 1.0) // top-left
);

vec3 sampleSceneColor(vec2 uv, vec2 pixelOffset) {
    return texture2D(inputBuffer, uv + pixelOffset * uPixelRatio * texelSize).rgb;
}

struct QuadrantStatistics {
    vec3 meanColor;
    float perceivedVariance;
};

QuadrantStatistics measureQuadrant(vec2 uv, vec2 quadrantDirection) {
    vec3 sum = vec3(0.0);
    vec3 sumOfSquares = vec3(0.0);

    for (int x = 0; x <= QUADRANT_RADIUS; x++) {
        for (int y = 0; y <= QUADRANT_RADIUS; y++) {
            vec2 pixelOffset = quadrantDirection * vec2(float(x), float(y));
            vec3 sampleColor = sampleSceneColor(uv, pixelOffset);
            sum += sampleColor;
            sumOfSquares += sampleColor * sampleColor;
        }
    }

    vec3 meanColor = sum / SAMPLES_PER_QUADRANT;
    vec3 colorVariance = sumOfSquares / SAMPLES_PER_QUADRANT - meanColor * meanColor;

    // weighted by how the eye sees brightness
    float perceivedVariance = dot(colorVariance, LUMINANCE_WEIGHTS);

    return QuadrantStatistics(meanColor, perceivedVariance);
}

void mainImage(const in vec4 inputColor, const in vec2 uv, out vec4 outputColor) {
    vec3 smoothestQuadrantMeanColor = inputColor.rgb;
    float lowestQuadrantVariance = 1e9; // infinity (sort of)

    QuadrantStatistics smoothestQuadrant = QuadrantStatistics(
        smoothestQuadrantMeanColor,
        lowestQuadrantVariance
    );

    for (int quadrantIndex = 0; quadrantIndex < 4; quadrantIndex++) {
        vec2 quadrantDirection = QUADRANT_DIRECTIONS[quadrantIndex];
        QuadrantStatistics quadrant = measureQuadrant(uv, quadrantDirection);

        if (quadrant.perceivedVariance < smoothestQuadrant.perceivedVariance) {
            smoothestQuadrant = quadrant;
        }
    }

    outputColor = vec4(smoothestQuadrant.meanColor, inputColor.a);
}