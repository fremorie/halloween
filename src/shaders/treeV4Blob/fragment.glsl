uniform sampler2D uBlobTexture;

varying vec2 vUv;

#include <fog_pars_fragment>

void main() {
    vec3 blobColor = texture2D(uBlobTexture, vUv).rgb;

    gl_FragColor = vec4(blobColor, 1.0);

    #include <tonemapping_fragment>
    #include <colorspace_fragment>
    #include <fog_fragment>
}
