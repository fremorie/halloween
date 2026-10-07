uniform float uPixelRatio;
uniform float uBrushRadius;
uniform sampler2D tTensor;

#define SECTOR_COUNT 8
#define RING_COUNT 8
#define RAYS_PER_SIDE 2

const float TAU = 6.28318530718;
const float SECTOR_ANGLE = TAU / float(SECTOR_COUNT);
const float RAY_SPACING = SECTOR_ANGLE / float(2 * RAYS_PER_SIDE); // 4 gaps between 5 rays

// exp(-d² / (2σ²)) with σ = radius / 3
// For d = ringFraction:
// 1 / (2 × (1/3)²) = 4.5
const float GAUSSIAN_FALLOFF = 4.5;

const vec3 LUMINANCE_WEIGHTS = vec3(0.299, 0.587, 0.114);

vec3 sampleSceneColor(vec2 uv, vec2 pixelOffset) {
    return texture2D(inputBuffer, uv + pixelOffset * uPixelRatio * texelSize).rgb;
}

struct SectorStatistics {
    vec3 meanColor;
    float perceivedVariance;
};

SectorStatistics measureSector(vec2 uv, int sectorIndex) {
    float sectorMiddleAngle = float(sectorIndex) * SECTOR_ANGLE;

    vec3 weightedSum = vec3(0.0);
    vec3 weightedSumOfSquares = vec3(0.0);
    float totalWeight = 0.0;

    for (int ring = 1; ring <= RING_COUNT; ring++) {
        float ringFraction = float(ring) / float(RING_COUNT);
        float ringRadius = ringFraction * uBrushRadius;
        float ringWeight = exp(-ringFraction * ringFraction * GAUSSIAN_FALLOFF);

        for (int ray = -RAYS_PER_SIDE; ray <= RAYS_PER_SIDE; ray++) {
            float rayAngle = sectorMiddleAngle + float(ray) * RAY_SPACING;
            vec2 pixelOffset = ringRadius * vec2(cos(rayAngle), sin(rayAngle));
            vec3 sampleColor = sampleSceneColor(uv, pixelOffset);

            weightedSum += sampleColor * ringWeight;
            weightedSumOfSquares += sampleColor * sampleColor * ringWeight;
            totalWeight += ringWeight;
        }
    }

    vec3 meanColor = weightedSum / totalWeight;
    vec3 colorVariance = weightedSumOfSquares / totalWeight - meanColor * meanColor;

    float perceivedVariance = dot(colorVariance, LUMINANCE_WEIGHTS);

    return SectorStatistics(meanColor, perceivedVariance);
}

void mainImage(const in vec4 inputColor, const in vec2 uv, out vec4 outputColor) {
    vec3 smoothestSectorMeanColor = inputColor.rgb;
    float lowestSectorVariance = 1e9; // infinity (sort of)

    SectorStatistics smoothestSector = SectorStatistics(
        smoothestSectorMeanColor,
        lowestSectorVariance
    );

    for (int sectorIndex = 0; sectorIndex < SECTOR_COUNT; sectorIndex++) {
        SectorStatistics sector = measureSector(uv, sectorIndex);

        if (sector.perceivedVariance < smoothestSector.perceivedVariance) {
            smoothestSector = sector;
        }
    }

    // outputColor = vec4(smoothestSector.meanColor, inputColor.a);
    outputColor = vec4(texture2D(tTensor, uv).rgb, 1.0);
}