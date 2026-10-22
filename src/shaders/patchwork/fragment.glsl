uniform sampler2D uPatchworkTexture;
uniform float uStitchProgress;

varying vec2 vUv;
varying vec2 vStitchCoordinate;

#include <fog_pars_fragment>

void main() {
    if (vStitchCoordinate.y > uStitchProgress) discard;

    vec3 patchworkColor = texture2D(uPatchworkTexture, vUv).rgb;

    gl_FragColor = vec4(patchworkColor, 1.0);

    #include <tonemapping_fragment>
    #include <colorspace_fragment>
    #include <fog_fragment>
}
