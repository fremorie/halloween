uniform sampler2D uPatchworkTexture;
uniform float uStitchProgress;
uniform float uRowCount;

varying vec2 vUv;
varying vec2 vStitchCoordinate;

#include <fog_pars_fragment>

void main() {
    float rowIndex = floor(vStitchCoordinate.y * uRowCount);
    float rowProgress = clamp(uStitchProgress * uRowCount - rowIndex, 0.0, 1.0);
    bool isReturnRow = mod(rowIndex, 2.0) > 0.5;
    float shuttlePosition = isReturnRow ? 1.0 - vStitchCoordinate.x : vStitchCoordinate.x;

    if (shuttlePosition > rowProgress) discard;

    vec3 patchworkColor = texture2D(uPatchworkTexture, vUv).rgb;

    gl_FragColor = vec4(patchworkColor, 1.0);

    #include <tonemapping_fragment>
    #include <colorspace_fragment>
    #include <fog_fragment>
}
