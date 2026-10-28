uniform float uTime;
uniform float uGroundLevel;
uniform float uTopLevel;
uniform float uPixelRatio;

attribute float aSeed;
attribute float aSize;
attribute vec2 aWrapCenter;

const vec2 windDirection = normalize(vec2(1.0, -0.3));
const float windSpeed = 0.6;
const float wrapHalfLength = 5.0;

varying float vRotation;
varying float vTumble;
varying float vSeed;

void main() {
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);

    float phase = aSeed * 6.2831853;

    // Falling down
    float fallSpeed = mix(0.5, 1.0, aSeed);
    modelPosition.y -= uTime * fallSpeed;

    // Loop back to top
    modelPosition.y =
        uGroundLevel + mod(modelPosition.y - uGroundLevel, uTopLevel - uGroundLevel);

    float windTravel = uTime * windSpeed * mix(0.7, 1.3, aSeed);
    vec2 offsetFromWrapCenter = modelPosition.xz - aWrapCenter;
    float distanceAlongWind = dot(offsetFromWrapCenter, windDirection);
    float wrappedDistanceAlongWind =
        mod(distanceAlongWind + windTravel + wrapHalfLength, 2.0 * wrapHalfLength)
        - wrapHalfLength;
    modelPosition.xz += windDirection * (wrappedDistanceAlongWind - distanceAlongWind);

    // Wind
    float swaySlow = sin(uTime * 6.0 + phase);
    float swayFast = sin(uTime * 14.0 + phase * 1.7);
    modelPosition.x += swaySlow * 0.28 + swayFast * 0.06;
    modelPosition.z += cos(uTime * 5.5 + phase) * 0.24 + swayFast * 0.05;

    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectedPosition = projectionMatrix * viewPosition;

    gl_Position = projectedPosition;

    // Grow in at the top and shrink to nothing at the ground
    float fadeDistance = 0.25;
    float bottomScale =
        smoothstep(uGroundLevel, uGroundLevel + fadeDistance, modelPosition.y);
    float topScale =
        1.0 - smoothstep(uTopLevel - fadeDistance, uTopLevel, modelPosition.y);
    float heightScale = bottomScale * topScale;

    float wrapEdgeScale =
        1.0 - smoothstep(wrapHalfLength - 1.0, wrapHalfLength, abs(wrappedDistanceAlongWind));

    gl_PointSize = 600.0 * aSize * heightScale * wrapEdgeScale * uPixelRatio;
    gl_PointSize *= 1.0 / -viewPosition.z;

    if (gl_PointSize < 1.0) {
        gl_Position = vec4(9999.9);
    }

    float spinSpeed = mix(8.0, 16.0, aSeed);
    vRotation = uTime * spinSpeed + phase;

    vTumble = sin(uTime * 9.0 + phase);
    vSeed = aSeed;
}
