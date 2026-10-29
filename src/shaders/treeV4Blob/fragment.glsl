uniform sampler2D uBlobTexture;

varying vec2 vUv;
varying vec3 vWorldPosition;
varying vec3 vNormal;

#include <fog_pars_fragment>

#include "../includes/reveal.glsl"
#include "../includes/canopyLighting.glsl"

void main() {
    vec3 blobColor = texture2D(uBlobTexture, vUv).rgb;

    blobColor *= canopyLighting(normalize(vNormal));
    blobColor = revealColor(blobColor, vWorldPosition);

    gl_FragColor = vec4(blobColor, 1.0);

    #include <tonemapping_fragment>
    #include <colorspace_fragment>
    #include <fog_fragment>
}
