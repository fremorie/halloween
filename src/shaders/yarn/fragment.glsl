uniform vec3 uYarnColor;

#include <fog_pars_fragment>

void main() {
    gl_FragColor = vec4(uYarnColor, 1.0);

    #include <tonemapping_fragment>
    #include <colorspace_fragment>
    #include <fog_fragment>
}
