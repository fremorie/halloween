uniform sampler2D uTexture;
uniform vec3 uLightColor;
uniform vec3 uDarkColor;

varying vec2 vUv;
varying float vSeed;
varying vec3 vWorldPosition;

#include <fog_pars_fragment>

#include "../includes/reveal.glsl"

void main() {
    float mask = texture2D(uTexture, vUv).r;
    float alpha = smoothstep(0.2, 0.6, mask);

    if (alpha < 0.5) discard;

    vec2 noiseUv = vUv * 0.3 + vec2(vSeed, fract(vSeed * 7.13));
    float leafNoise = texture2D(uRevealNoiseTexture, noiseUv).r;

    vec3 finalColor = mix(uDarkColor, uLightColor, vUv.y + (leafNoise - 0.5) * 0.6);

    finalColor = revealColor(finalColor, vWorldPosition);

    gl_FragColor = vec4(finalColor, 1.0);

    #include <colorspace_fragment>
    #include <fog_fragment>
}
