uniform vec3 uSunDirection;
uniform float uPlyCount;
uniform float uPlyTwistsPerUnitLength;
uniform float uPlyGrooveDarkness;
uniform vec3 uSkyLight;
uniform vec3 uGroundLight;
uniform float uSunStrength;

varying float vAlongBranch;
varying float vWrapProgress;
varying vec3 vWorldNormal;
varying vec2 vStrandCrossSection;
varying float vDistanceAlongStrand;
varying float vWrapsFromEnd;
varying vec3 vYarnColor;

#include <fog_pars_fragment>

#include "../includes/lights.glsl"

const float TAU = 6.28318530718;

void main() {
    float distanceFromWrapStart = mix(vAlongBranch, 1.0 - vAlongBranch, vWrapsFromEnd);
    bool isUnwrapped = vWrapProgress <= 0.0 || distanceFromWrapStart > vWrapProgress;
    if (isUnwrapped) discard;

    float aroundStrandAngle = atan(vStrandCrossSection.y, vStrandCrossSection.x);
    float plyPhase = uPlyCount * aroundStrandAngle + TAU * uPlyTwistsPerUnitLength * vDistanceAlongStrand;
    float plyRidge = 0.5 + 0.5 * cos(plyPhase);
    float plyShading = mix(1.0 - uPlyGrooveDarkness, 1.0, plyRidge);

    vec3 normal = normalize(vWorldNormal);
    vec3 ambientLight = hemiLight(normal, uGroundLight, uSkyLight);
    float sunLight = max(dot(normal, uSunDirection), 0.0) * uSunStrength;

    vec3 litYarnColor = vYarnColor * plyShading * (ambientLight + sunLight);

    gl_FragColor = vec4(litYarnColor, 1.0);

    #include <tonemapping_fragment>
    #include <colorspace_fragment>
    #include <fog_fragment>
}
