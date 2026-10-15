uniform sampler2D uIrisTexture;
uniform float uPupilRadius;
uniform vec3 uHighlightColor;
uniform float uHighlightSize;

varying vec3 vPositionFacingPositiveZ;
varying vec3 vGazePosition;

const float IRIS_PLANE_SCALE = 2.0;
const float PUPIL_EDGE_SOFTNESS = 0.09;
const float PUPIL_SHADOW_REACH = 0.8;
const float PUPIL_SHADOW_DEPTH = 0.4;
const float PUPIL_WIDTH_TO_HEIGHT = 0.65;
const vec2 HIGHLIGHT_CENTER = vec2(0.54, 0.45);
const float HIGHLIGHT_STRENGTH = 0.9;
const float PI = 3.141592653589793;

vec2 equirectangularUvOf(vec3 direction) {
    float u = fract(atan(direction.z, -direction.x) / (2.0 * PI));
    float v = acos(clamp(direction.y, -1.0, 1.0)) / PI;
    return vec2(u, v);
}

void main() {
    vec3 gazeDirection = normalize(vGazePosition);
    vec3 color = texture2D(uIrisTexture, equirectangularUvOf(gazeDirection)).rgb;

    vec2 pupilSpacePosition =
        gazeDirection.xy * IRIS_PLANE_SCALE / vec2(PUPIL_WIDTH_TO_HEIGHT, 1.0);
    float pupilDistance = length(pupilSpacePosition);
    float pupilShadowMask =
        1.0 - smoothstep(uPupilRadius, uPupilRadius * (1.0 + PUPIL_SHADOW_REACH), pupilDistance);
    float outsidePupilMask =
        smoothstep(uPupilRadius, uPupilRadius + PUPIL_EDGE_SOFTNESS, pupilDistance);
    color *= (1.0 - PUPIL_SHADOW_DEPTH * pupilShadowMask) * outsidePupilMask;

    vec2 highlightPlanePosition = normalize(vPositionFacingPositiveZ).xy * IRIS_PLANE_SCALE;
    float highlightDistance = length(highlightPlanePosition - HIGHLIGHT_CENTER);
    float highlightMask = 1.0 - smoothstep(0.0, uHighlightSize, highlightDistance);
    color += uHighlightColor * HIGHLIGHT_STRENGTH * highlightMask;

    gl_FragColor = vec4(color, 1.0);

    #include <tonemapping_fragment>
    #include <colorspace_fragment>
}
