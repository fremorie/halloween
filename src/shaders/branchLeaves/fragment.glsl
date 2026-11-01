uniform sampler2D uLeafTexture;

varying vec2 vUv;
varying vec3 vNormal;
varying vec3 vLeafTint;

#include <fog_pars_fragment>

#include "../includes/canopyLighting.glsl"

void main() {
    vec3 facingNormal = normalize(vNormal) * (gl_FrontFacing ? 1.0 : -1.0);

    vec3 leafColor = texture2D(uLeafTexture, vUv).rgb * vLeafTint;
    leafColor *= canopyLighting(facingNormal);

    gl_FragColor = vec4(leafColor, 1.0);

    #include <colorspace_fragment>
    #include <fog_fragment>
}
