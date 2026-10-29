uniform sampler2D uLeafTexture;
uniform sampler2D uLeafAlphaTexture;

varying vec2 vUv;

#include <fog_pars_fragment>

void main() {
    float leafMask = texture2D(uLeafAlphaTexture, vUv).r;

    if (leafMask < 0.5) discard;

    vec3 leafColor = texture2D(uLeafTexture, vUv).rgb;

    gl_FragColor = vec4(leafColor, 1.0);

    #include <tonemapping_fragment>
    #include <colorspace_fragment>
    #include <fog_fragment>
}
