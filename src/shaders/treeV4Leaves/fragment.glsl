uniform sampler2D uLeafAlphaTexture;
uniform vec3 uDarkColor;
uniform vec3 uLightColor;

varying vec2 vUv;
varying float vSeed;
varying vec3 vWorldPosition;
varying vec3 vNormal;

#include <fog_pars_fragment>

#include "../includes/reveal.glsl"
#include "../includes/canopyLighting.glsl"

void main() {
    float mask = texture2D(uLeafAlphaTexture, vUv).r;
    float alpha = smoothstep(0.2, 0.6, mask);

    if (alpha < 0.5) discard;

    vec2 noiseUv = vUv * 0.3 + vec2(vSeed, fract(vSeed * 7.13));
    float leafNoise = texture2D(uRevealNoiseTexture, noiseUv).r;

    vec3 finalColor = mix(uDarkColor, uLightColor, vUv.y + (leafNoise - 0.5) * 0.6);

    vec3 normal = normalize(vNormal) * (gl_FrontFacing ? 1.0 : -1.0);
    finalColor *= canopyLighting(normal);
    finalColor = revealColor(finalColor, vWorldPosition);

    gl_FragColor = vec4(finalColor, 1.0);

    #include <colorspace_fragment>
    #include <fog_fragment>
}
