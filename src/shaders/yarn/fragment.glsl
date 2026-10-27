varying float vAlongBranch;
varying float vWrapProgress;
varying vec3 vWorldNormal;
varying vec2 vStrandCrossSection;
varying float vDistanceAlongStrand;
varying float vWrapsFromEnd;
varying vec3 vYarnColor;

#include <fog_pars_fragment>

#include "../includes/yarnShading.glsl"

void main() {
    float distanceFromWrapStart = mix(vAlongBranch, 1.0 - vAlongBranch, vWrapsFromEnd);
    bool isUnwrapped = vWrapProgress <= 0.0 || distanceFromWrapStart > vWrapProgress;
    if (isUnwrapped) discard;

    vec3 litYarnColor = shadeYarn(
        vYarnColor,
        normalize(vWorldNormal),
        vStrandCrossSection,
        vDistanceAlongStrand
    );

    gl_FragColor = vec4(litYarnColor, 1.0);

    #include <tonemapping_fragment>
    #include <colorspace_fragment>
    #include <fog_fragment>
}
