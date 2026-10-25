uniform float uPixelRatio;
uniform float uBrushRadius;
uniform float uAlpha;
uniform sampler2D tTensor;
uniform sampler2D inputBuffer;
uniform vec2 uTexelSize;

varying vec2 vUv;

#define SECTOR_COUNT 8
#define RING_COUNT 5
#define BORDER_RAY_WEIGHT 1.0

// exp(-d² / (2σ²)) with σ = radius / 3
// For d = ringFraction:
// 1 / (2 × (1/3)²) = 4.5
const float GAUSSIAN_FALLOFF = 4.5;

const vec3 LUMINANCE_WEIGHTS = vec3(0.299, 0.587, 0.114);

const float COS_HALF_SECTOR = 0.92387953251;
const float SIN_HALF_SECTOR = 0.38268343236;
const mat2 ROTATE_BY_HALF_SECTOR = mat2(
    COS_HALF_SECTOR, SIN_HALF_SECTOR,
    -SIN_HALF_SECTOR, COS_HALF_SECTOR
);

vec3 sampleSceneColor(vec2 uv, vec2 pixelOffset) {
    return texture2D(inputBuffer, uv + pixelOffset * uPixelRatio * uTexelSize).rgb;
}

struct EdgeOrientation {
    vec2 gradientDirection;
    float anisotropy;
};

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

struct SectorAccumulator {
    vec3 weightedSum;
    vec3 weightedSumOfSquares;
    float totalWeight;
};

void addSample(inout SectorAccumulator sector, vec3 sampleColor, float weight) {
    sector.weightedSum += sampleColor * weight;
    sector.weightedSumOfSquares += sampleColor * sampleColor * weight;
    sector.totalWeight += weight;
}

void main() {
    vec2 uv = vUv;
    mat2 shape = kernelShape(readEdgeOrientation(uv));

    SectorAccumulator sectors[SECTOR_COUNT];
    for (int sectorIndex = 0; sectorIndex < SECTOR_COUNT; sectorIndex++) {
        sectors[sectorIndex] = SectorAccumulator(vec3(0.0), vec3(0.0), 0.0);
    }

    for (int ring = 1; ring <= RING_COUNT; ring++) {
        float ringFraction = float(ring) / float(RING_COUNT);
        float ringRadius = ringFraction * uBrushRadius;
        float ringWeight = exp(-ringFraction * ringFraction * GAUSSIAN_FALLOFF);
        float borderRayWeight = ringWeight * BORDER_RAY_WEIGHT;

        vec2 centreDirection = vec2(1.0, 0.0);

        for (int sectorIndex = 0; sectorIndex < SECTOR_COUNT; sectorIndex++) {
            int nextSectorIndex = sectorIndex + 1 == SECTOR_COUNT ? 0 : sectorIndex + 1;

            vec3 centreColor = sampleSceneColor(uv, shape * (ringRadius * centreDirection));
            addSample(sectors[sectorIndex], centreColor, ringWeight);

            vec2 borderDirection = ROTATE_BY_HALF_SECTOR * centreDirection;
            vec3 borderColor = sampleSceneColor(uv, shape * (ringRadius * borderDirection));
            addSample(sectors[sectorIndex], borderColor, borderRayWeight);
            addSample(sectors[nextSectorIndex], borderColor, borderRayWeight);

            centreDirection = ROTATE_BY_HALF_SECTOR * borderDirection;
        }
    }

    vec3 smoothestMeanColor = vec3(0.0);
    float lowestVariance = 1e9; // infinity (sort of)

    for (int sectorIndex = 0; sectorIndex < SECTOR_COUNT; sectorIndex++) {
        SectorAccumulator sector = sectors[sectorIndex];
        vec3 meanColor = sector.weightedSum / sector.totalWeight;
        vec3 colorVariance = sector.weightedSumOfSquares / sector.totalWeight - meanColor * meanColor;
        float perceivedVariance = dot(colorVariance, LUMINANCE_WEIGHTS);

        if (perceivedVariance < lowestVariance) {
            lowestVariance = perceivedVariance;
            smoothestMeanColor = meanColor;
        }
    }

    gl_FragColor = vec4(smoothestMeanColor, 1.0);
}
