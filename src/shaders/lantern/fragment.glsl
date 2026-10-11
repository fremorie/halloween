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

const float DRIFT_SPEED = 1.5;
const float DRIFT_DEPTH = 0.15;

#include "../includes/hash11.glsl"

float candleNoise(float sampleTime) {
    float tickIndex = floor(sampleTime);
    float tickFraction = fract(sampleTime);

    float valueNow = hash11(tickIndex);
    float valueNext = hash11(tickIndex + 1.0);

    return mix(valueNow, valueNext, smoothstep(0.0, 1.0, tickFraction));
}

void main() {
    float flickerTime = uTime * FLICKER_SPEED + uFlickerSeed;
    // 101 - just so that the second layer is far enough from the first
    float driftTime = uTime * DRIFT_SPEED + uFlickerSeed + 101.0;

    float flickerNoise = candleNoise(flickerTime);
    float driftNoise = candleNoise(driftTime);

    float flicker = (1.0 - FLICKER_DEPTH * flickerNoise) * (1.0 - DRIFT_DEPTH * driftNoise);

    float candleCloseness = 1.0 - smoothstep(FACE_BOTTOM, FACE_TOP, vLocalPosition.y);
    vec3 faceColor = mix(uEmberColor, uGlowColor, candleCloseness);
    faceColor *= flicker;

    gl_FragColor = vec4(faceColor, 1.0);
}