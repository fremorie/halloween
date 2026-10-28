uniform float uTime;
uniform float uGroundLevel;
uniform float uTopLevel;
uniform float uViewportHeight;

attribute float aSeed;
attribute float aSize;
attribute vec2 aWrapCenter;

const float leafWorldSize = 0.4;
const vec2 windDirection = normalize(vec2(1.0, -0.3));
const float windSpeed = 0.6;
const float wrapHalfLength = 5.0;
const float gustStrength = 0.3;
const float gustFrequency = 1.2;
const float gustSpatialFrequency = 0.15;
const float swingFrequency = 7.0;
const float swingWidth = 0.8;
const float swingLift = 0.06;
const float swingRockAngle = 0.3;
const float tumblerShare = 0.15;

varying float vRotation;
varying float vTumble;
varying float vSeed;
varying vec3 vWorldPosition;

#include <fog_pars_vertex>

void main() {
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);

    float phase = aSeed * 6.2831853;
    float isTumbler = step(1.0 - tumblerShare, fract(aSeed * 17.31));

    // Falling down
    float fallSpeed = mix(1.5, 3.0, aSeed) * mix(1.0, 2.0, isTumbler);
    modelPosition.y -= uTime * fallSpeed;

    // Loop back to top
    modelPosition.y =
        uGroundLevel + mod(modelPosition.y - uGroundLevel, uTopLevel - uGroundLevel);

    float windTravel = uTime * windSpeed * mix(0.7, 1.3, aSeed);
    windTravel += sin(uTime * gustFrequency - modelPosition.x * gustSpatialFrequency) * gustStrength;
    vec2 offsetFromWrapCenter = modelPosition.xz - aWrapCenter;
    float distanceAlongWind = dot(offsetFromWrapCenter, windDirection);
    float wrappedDistanceAlongWind =
        mod(distanceAlongWind + windTravel + wrapHalfLength, 2.0 * wrapHalfLength)
        - wrapHalfLength;
    modelPosition.xz += windDirection * (wrappedDistanceAlongWind - distanceAlongWind);

    float swingPhase = uTime * swingFrequency + phase;
    vec2 swingAxis = vec2(cos(phase * 3.0), sin(phase * 3.0));
    float swingAmount = 1.0 - isTumbler * 0.9;
    modelPosition.xz += swingAxis * sin(swingPhase) * swingWidth * swingAmount;
    modelPosition.y -= cos(2.0 * swingPhase) * swingLift * (1.0 - isTumbler);

    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectedPosition = projectionMatrix * viewPosition;

    vec4 mvPosition = viewPosition;
    #include <fog_vertex>

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

    float pixelsPerWorldUnit =
        uViewportHeight * projectionMatrix[1][1] * 0.5 / -viewPosition.z;
    gl_PointSize = leafWorldSize * aSize * heightScale * wrapEdgeScale * pixelsPerWorldUnit;

    if (gl_PointSize < 1.0) {
        gl_Position = vec4(9999.9);
    }

    float rockingRotation = phase + cos(swingPhase) * swingRockAngle;
    float tumblingRotation = uTime * mix(3.0, 6.0, aSeed) + phase;
    vRotation = mix(rockingRotation, tumblingRotation, isTumbler);

    float rockingSquash = mix(1.0, 0.6, abs(sin(swingPhase)));
    float tumblingSquash = sin(uTime * 8.0 + phase);
    vTumble = mix(rockingSquash, tumblingSquash, isTumbler);
    vSeed = aSeed;
    vWorldPosition = modelPosition.xyz;
}
