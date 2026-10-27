uniform vec3 uYarnColor;

varying float vAlongBranch;
varying float vWrapProgress;

#include <fog_pars_fragment>

void main() {
    bool isUnwrapped = vWrapProgress <= 0.0 || vAlongBranch > vWrapProgress;
    if (isUnwrapped) discard;

    gl_FragColor = vec4(uYarnColor, 1.0);

    #include <tonemapping_fragment>
    #include <colorspace_fragment>
    #include <fog_fragment>
}
