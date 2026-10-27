uniform vec3 uYarnColor;
uniform vec3 uSunDirection;

varying float vAlongBranch;
varying float vWrapProgress;
varying vec3 vWorldNormal;
varying vec2 vStrandCrossSection;
varying float vDistanceAlongStrand;

#include <fog_pars_fragment>

#include "../includes/lights.glsl"

const float TAU = 6.28318530718;
const float PLY_COUNT = 3.0;
const float PLY_TWISTS_PER_UNIT_LENGTH = 8.0;
const float PLY_GROOVE_DARKNESS = 0.35;
const vec3 SKY_LIGHT = vec3(1.0, 0.97, 0.93);
const vec3 GROUND_LIGHT = vec3(0.45, 0.4, 0.36);
const float SUN_STRENGTH = 0.5;
const float INSIDE_DARKNESS = 0.35;

void main() {
    bool isUnwrapped = vWrapProgress <= 0.0 || vAlongBranch > vWrapProgress;
    if (isUnwrapped) discard;

    float aroundStrandAngle = atan(vStrandCrossSection.y, vStrandCrossSection.x);
    float plyPhase = PLY_COUNT * aroundStrandAngle + TAU * PLY_TWISTS_PER_UNIT_LENGTH * vDistanceAlongStrand;
    float plyRidge = 0.5 + 0.5 * cos(plyPhase);
    float plyShading = mix(1.0 - PLY_GROOVE_DARKNESS, 1.0, plyRidge);

    vec3 normal = normalize(vWorldNormal);
    vec3 ambientLight = hemiLight(normal, GROUND_LIGHT, SKY_LIGHT);
    float sunLight = max(dot(normal, uSunDirection), 0.0) * SUN_STRENGTH;

    vec3 litYarnColor = uYarnColor * plyShading * (ambientLight + sunLight);
    if (!gl_FrontFacing) litYarnColor *= INSIDE_DARKNESS;

    gl_FragColor = vec4(litYarnColor, 1.0);

    #include <tonemapping_fragment>
    #include <colorspace_fragment>
    #include <fog_fragment>
}
