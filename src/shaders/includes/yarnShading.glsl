#include "./hemiLight.glsl"

uniform vec3 uSunDirection;
uniform float uPlyCount;
uniform float uPlyTwistsPerUnitLength;
uniform float uPlyGrooveDarkness;
uniform vec3 uSkyLight;
uniform vec3 uGroundLight;
uniform float uSunStrength;

const float TAU = 6.28318530718;

vec3 shadeYarn(
    vec3 yarnColor,
    vec3 worldNormal,
    vec2 strandCrossSection,
    float distanceAlongStrand
) {
    float aroundStrandAngle = atan(strandCrossSection.y, strandCrossSection.x);
    float plyPhase = uPlyCount * aroundStrandAngle
        + TAU * uPlyTwistsPerUnitLength * distanceAlongStrand;
    float plyRidge = 0.5 + 0.5 * cos(plyPhase);
    float plyShading = mix(1.0 - uPlyGrooveDarkness, 1.0, plyRidge);

    vec3 ambientLight = hemiLight(worldNormal, uGroundLight, uSkyLight);
    float sunLight = max(dot(worldNormal, uSunDirection), 0.0) * uSunStrength;

    return yarnColor * plyShading * (ambientLight + sunLight);
}
