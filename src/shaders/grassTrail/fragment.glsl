uniform sampler2D uPrevious;

uniform vec2 uCenter;
uniform vec2 uPreviousCenter;
uniform float uAreaSize;

uniform vec2 uPlayerPosition;
uniform vec2 uPreviousPlayerPosition;
uniform float uBrushRadius;

uniform float uDecay;

varying vec2 vUv;

float distanceToSegment(vec2 point, vec2 a, vec2 b, out vec2 closest) {
    vec2 ab = b - a;
    float lengthSquared = dot(ab, ab);
    float t = lengthSquared > 0.0
        ? clamp(dot(point - a, ab) / lengthSquared, 0.0, 1.0)
        : 0.0;

    closest = a + ab * t;

    return distance(point, closest);
}

void main() {
    vec2 worldPosition = uCenter + (vUv - 0.5) * uAreaSize;

    vec2 previousUv = (worldPosition - uPreviousCenter) / uAreaSize + 0.5;
    bool inPrevious = all(greaterThanEqual(previousUv, vec2(0.0)))
        && all(lessThanEqual(previousUv, vec2(1.0)));

    vec2 direction = vec2(0.0);
    float strength = 0.0;

    if (inPrevious) {
        vec4 previous = textureLod(uPrevious, previousUv, 0.0);
        direction = previous.rg * 2.0 - 1.0;
        strength = previous.b * uDecay;
    }

    vec2 closest;
    float distanceToPath = distanceToSegment(
        worldPosition,
        uPreviousPlayerPosition,
        uPlayerPosition,
        closest
    );

    float stamp = 1.0 - smoothstep(uBrushRadius * 0.4, uBrushRadius, distanceToPath);

    vec2 awayFromPath = worldPosition - closest;
    vec2 stampDirection = dot(awayFromPath, awayFromPath) > 1e-6
        ? normalize(awayFromPath)
        : vec2(0.0);

    float blend = strength > 0.001 ? stamp : 1.0;
    direction = mix(direction, stampDirection, blend);
    strength = max(strength, stamp);

    gl_FragColor = vec4(direction * 0.5 + 0.5, strength, 1.0);
}
