uniform float uTime;
uniform vec3 uGlowColor;
uniform vec3 uEmberColor;
uniform float uGlowIntensity;
uniform float uFlickerSeed;

varying vec3 vLocalPosition;

// See resources/pumpkins/magic-numbers
const float FACE_BOTTOM = 0.26;
const float FACE_TOP = 0.9;

void main() {
    float heightFraction = (vLocalPosition.y - FACE_BOTTOM) / (FACE_TOP - FACE_BOTTOM);
    float candleCloseness = 1.0 - smoothstep(FACE_BOTTOM, FACE_TOP, vLocalPosition.y);

    vec3 faceColor = mix(uEmberColor, uGlowColor, candleCloseness);

    gl_FragColor = vec4(faceColor, 1.0);
}