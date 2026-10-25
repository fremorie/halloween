const vec3 REVEAL_CENTER = vec3(-5.8, 0.0, 0.0);
const float REVEAL_RADIUS = 8.0;

vec3 revealColor(vec3 color, vec3 worldPosition) {
    float luminance = dot(color, vec3(0.2126, 0.7152, 0.0722));
    vec3 grayscaleColor = vec3(luminance);

    float distanceFromRevealCenter = distance(worldPosition.xz, REVEAL_CENTER.xz);
    float isInsideReveal = step(distanceFromRevealCenter, REVEAL_RADIUS);

    return mix(grayscaleColor, color, isInsideReveal);
}
