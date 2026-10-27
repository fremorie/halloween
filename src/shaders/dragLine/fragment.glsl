uniform vec3 uYarnColor;

varying vec3 vWorldNormal;
varying vec2 vStrandCrossSection;
varying float vDistanceAlongStrand;

#include "../includes/yarnShading.glsl"

void main() {
    vec3 litYarnColor = shadeYarn(
        uYarnColor,
        normalize(vWorldNormal),
        vStrandCrossSection,
        vDistanceAlongStrand
    );

    gl_FragColor = vec4(litYarnColor, 1.0);

    #include <tonemapping_fragment>
    #include <colorspace_fragment>
}
