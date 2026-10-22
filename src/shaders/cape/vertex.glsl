uniform float uCapeWaveTime;
uniform float uCapeHemHeight;
uniform float uCapeWaveTopHeight;
uniform float uCapeStillFrontDepth;
uniform float uCapeWaveFrontDepth;
uniform float uCapeWaveAmplitude;
uniform float uCapeWaveNumber;
uniform float uCapeWaveSpeed;

void main() {
    float hemWeight = 1.0 - smoothstep(uCapeHemHeight, uCapeWaveTopHeight, position.y);
    hemWeight *= hemWeight;
    hemWeight *= smoothstep(uCapeStillFrontDepth, uCapeWaveFrontDepth, position.z);

    float capeRipple = sin(position.z * uCapeWaveNumber + position.x * 2.0 - uCapeWaveTime * uCapeWaveSpeed);
    float capeSway = cos(position.x * 3.0 - uCapeWaveTime * uCapeWaveSpeed * 0.6);

    float outwardFromSpine = clamp(position.x / 0.25, -1.0, 1.0);

    vec3 wavedPosition = position;
    wavedPosition.x += outwardFromSpine * capeRipple * uCapeWaveAmplitude * hemWeight;
    wavedPosition.z += capeSway * uCapeWaveAmplitude * 0.5 * hemWeight;

    csm_Position = wavedPosition;
}
