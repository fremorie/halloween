uniform vec3 uRevealCenter;
uniform float uRevealRadius;

vec3 revealColor(vec3 color, vec3 worldPosition) {
    float luminance = dot(color, vec3(0.2126, 0.7152, 0.0722));
    vec3 grayscaleColor = vec3(luminance);

    float distanceFromRevealCenter = distance(worldPosition.xz, uRevealCenter.xz);
    float isInsideReveal = step(distanceFromRevealCenter, uRevealRadius);

    return mix(grayscaleColor, color, isInsideReveal);
}
