uniform sampler2D inputBuffer;
uniform vec2 uTexelSize;
uniform float uPixelRatio;
uniform vec2 uDirection; // (1, 0) - sideways, (0, 1) - up and down
uniform float uSigma; // blur size in CSS pixels

varying vec2 vUv;

#define MAX_SAMPLES_PER_SIDE 8

const float SAMPLE_SPACING = 1.5;
const float CUTOFF_IN_SIGMAS = 2.5;

float gaussianWeight(float distanceInPixels, float sigma) {
    return exp(-(distanceInPixels * distanceInPixels) / (2.0 * sigma * sigma));
}

void main() {
    float sigmaInDevicePixels = max(uSigma * uPixelRatio, 0.5);
    float cutoffDistance = CUTOFF_IN_SIGMAS * sigmaInDevicePixels;
    vec2 onePixelAlongDirection = uDirection * uTexelSize;

    vec4 weightedSum = texture2D(inputBuffer, vUv);
    float totalWeight = 1.0;

    for (int sampleIndex = 1; sampleIndex <= MAX_SAMPLES_PER_SIDE; sampleIndex++) {
        float distanceInPixels = float(sampleIndex) * SAMPLE_SPACING;
        if (distanceInPixels > cutoffDistance) break;

        float weight = gaussianWeight(distanceInPixels, sigmaInDevicePixels);
        vec2 sampleOffset = onePixelAlongDirection * distanceInPixels;

        // the bell curve is symmetric: one sample on each side, same weight
        weightedSum += weight * texture2D(inputBuffer, vUv + sampleOffset);
        weightedSum += weight * texture2D(inputBuffer, vUv - sampleOffset);
        totalWeight += 2.0 * weight;
    }

    gl_FragColor = weightedSum / totalWeight;
}
