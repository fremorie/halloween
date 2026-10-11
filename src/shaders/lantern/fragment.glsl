uniform float uTime;
uniform vec3 uGlowColor;
uniform vec3 uEmberColor;
uniform float uGlowIntensity;
uniform float uFlickerSeed;

void main() {
    gl_FragColor = vec4(uEmberColor, 1.0);
}