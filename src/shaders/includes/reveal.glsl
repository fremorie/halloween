#define REVEAL_STATION_COUNT 3

uniform float uRevealTime;
uniform float uRevealStartTimes[REVEAL_STATION_COUNT];
uniform vec3 uRevealCenters[REVEAL_STATION_COUNT];
uniform float uRevealMaxRadius;
uniform float uRevealInitialSpeed;
uniform sampler2D uRevealNoiseTexture;
uniform float uRevealNoiseScale;
uniform float uRevealEdgeWidth;
uniform float uRevealEdgeSoftness;
uniform float uRevealWobbleNoiseScale;
uniform float uRevealWobbleAmount;

float revealRadiusSince(float revealStartTime) {
    float timeSinceRevealStart = max(uRevealTime - revealStartTime, 0.0);
    float remainingGrowth = exp(-timeSinceRevealStart * uRevealInitialSpeed / uRevealMaxRadius);

    return uRevealMaxRadius * (1.0 - remainingGrowth);
}

vec3 revealColor(vec3 color, vec3 worldPosition) {
    float luminance = dot(color, vec3(0.2126, 0.7152, 0.0722));
    vec3 grayscaleColor = vec3(luminance);

    float edgeNoise = texture2D(uRevealNoiseTexture, worldPosition.xz * uRevealNoiseScale).r;
    float wobbleNoise = texture2D(uRevealNoiseTexture, worldPosition.xz * uRevealWobbleNoiseScale).r;
    float radiusWobbleFactor = 1.0 + (wobbleNoise * 2.0 - 1.0) * uRevealWobbleAmount;

    float isInsideAnyReveal = 0.0;
    for (int stationIndex = 0; stationIndex < REVEAL_STATION_COUNT; stationIndex++) {
        float revealStartTime = uRevealStartTimes[stationIndex];
        if (revealStartTime < 0.0) {
            continue;
        }

        float distanceFromRevealCenter = distance(worldPosition.xz, uRevealCenters[stationIndex].xz);
        float wobblyRevealRadius = revealRadiusSince(revealStartTime) * radiusWobbleFactor;
        float raggedRevealRadius = wobblyRevealRadius - edgeNoise * uRevealEdgeWidth;
        float isInsideReveal = 1.0 - smoothstep(raggedRevealRadius - uRevealEdgeSoftness, raggedRevealRadius, distanceFromRevealCenter);
        isInsideAnyReveal = max(isInsideAnyReveal, isInsideReveal);
    }

    return mix(grayscaleColor, color, isInsideAnyReveal);
}
