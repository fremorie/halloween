uniform float uPixelRatio;
uniform float uBrushRadius;
uniform float uAlpha;
uniform sampler2D tTensor;

#include "../includes/hueToRgb.glsl"

#define SECTOR_COUNT 8
#define RING_COUNT 5
#define RAYS_PER_SIDE 1

const float TAU = 6.28318530718;
const float SECTOR_ANGLE = TAU / float(SECTOR_COUNT);
const float RAY_SPACING = SECTOR_ANGLE / float(2 * RAYS_PER_SIDE); // 2 gaps between 3 rays

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

struct EdgeOrientation {
    vec2 gradientDirection;
    float anisotropy;
};

SectorStatistics measureSector(vec2 uv, int sectorIndex, mat2 shape) {
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
            vec2 pixelOffset = shape * (ringRadius * vec2(cos(rayAngle), sin(rayAngle)));
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

EdgeOrientation readEdgeOrientation(vec2 uv) {
    vec3 tensor = texture2D(tTensor, uv).xyz;
    float jxx = tensor.x;
    float jyy = tensor.y;
    float jxy = tensor.z;

    // Eigenvalues of [[jxx, jxy], [jxy, jyy]]: the strongest and weakest change
    float trace = jxx + jyy;
    float determinant = jxx * jyy - jxy * jxy;
    float root = sqrt(max(0.0, trace * trace * 0.25 - determinant));
    float strongestChange = trace * 0.5 + root;
    float weakestChange = trace * 0.5 - root;

    vec2 gradientDirection = abs(jxy) > 0.0
        ? normalize(vec2(-jxy, jxx - strongestChange))
        : (jxx >= jyy ? vec2(1.0, 0.0) : vec2(0.0, 1.0));

    float anisotropy = (strongestChange - weakestChange) / (strongestChange + weakestChange + 1e-7);

    return EdgeOrientation(gradientDirection, anisotropy);
}

// Squashes the round kernel into an ellipse along the edge.
mat2 kernelShape(EdgeOrientation edge) {
    float acrossScale = uAlpha / (edge.anisotropy + uAlpha);
    float alongScale = (edge.anisotropy + uAlpha) / uAlpha;
    vec2 d = edge.gradientDirection;
    mat2 rotation = mat2(d.x, d.y, -d.y, d.x);

    return rotation * mat2(acrossScale, 0.0, 0.0, alongScale);
}

void mainImage(const in vec4 inputColor, const in vec2 uv, out vec4 outputColor) {
    mat2 shape = kernelShape(readEdgeOrientation(uv));

    vec3 smoothestSectorMeanColor = inputColor.rgb;
    float lowestSectorVariance = 1e9; // infinity (sort of)

    SectorStatistics smoothestSector = SectorStatistics(
        smoothestSectorMeanColor,
        lowestSectorVariance
    );

    for (int sectorIndex = 0; sectorIndex < SECTOR_COUNT; sectorIndex++) {
        SectorStatistics sector = measureSector(uv, sectorIndex, shape);

        if (sector.perceivedVariance < smoothestSector.perceivedVariance) {
            smoothestSector = sector;
        }
    }

    outputColor = vec4(smoothestSector.meanColor, inputColor.a);
    // outputColor = vec4(texture2D(tTensor, uv).rgb, 1.0);

    // DEBUG
//    EdgeOrientation edge = readEdgeOrientation(uv);
//    float edgeAngle = atan(edge.gradientDirection.y, edge.gradientDirection.x);
//    float hue = fract(edgeAngle / (0.5 * TAU));
//
//    outputColor = vec4(mix(vec3(1.0), hueToRgb(hue), edge.anisotropy), 1.0);
}
