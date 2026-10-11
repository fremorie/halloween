uniform float uTime;
uniform vec3 uGlowColor;
uniform vec3 uEmberColor;
uniform float uGlowIntensity;
uniform float uFlickerSeed;

varying vec3 vLocalPosition;

// See resources/pumpkins/magic-numbers
const float FACE_BOTTOM = 0.26;
const float FACE_TOP = 0.9;

const float FLICKER_SPEED = 8.0;
const float FLICKER_DEPTH = 0.25;

#include "../includes/hash11.glsl"

void main() {
    float flickerTime = uTime * FLICKER_SPEED + uFlickerSeed;
    float tickIndex = floor(flickerTime);
    float tickFraction = fract(flickerTime);

    float valueNow = hash11(tickIndex);
    float valueNext = hash11(tickIndex + 1.0);
    float flickerNoise = mix(valueNow, valueNext, smoothstep(0.0, 1.0, tickFraction));

    float flicker = 1.0 - FLICKER_DEPTH * flickerNoise;

    float candleCloseness = 1.0 - smoothstep(FACE_BOTTOM, FACE_TOP, vLocalPosition.y);
    vec3 faceColor = mix(uEmberColor, uGlowColor, candleCloseness);
    faceColor *= flicker;

    gl_FragColor = vec4(faceColor, 1.0);
}