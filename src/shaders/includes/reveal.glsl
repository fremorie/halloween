uniform float uRevealTime;
uniform float uRevealStartTime;
uniform vec3 uRevealCenter;
uniform float uRevealMaxRadius;
uniform float uRevealInitialSpeed;

float currentRevealRadius() {
    float timeSinceRevealStart = max(uRevealTime - uRevealStartTime, 0.0);
    float remainingGrowth = exp(-timeSinceRevealStart * uRevealInitialSpeed / uRevealMaxRadius);

    return uRevealMaxRadius * (1.0 - remainingGrowth);
}

vec3 revealColor(vec3 color, vec3 worldPosition) {
    float luminance = dot(color, vec3(0.2126, 0.7152, 0.0722));
    vec3 grayscaleColor = vec3(luminance);

    float distanceFromRevealCenter = distance(worldPosition.xz, uRevealCenter.xz);
    float isInsideReveal = step(distanceFromRevealCenter, currentRevealRadius());

    return mix(grayscaleColor, color, isInsideReveal);
}
