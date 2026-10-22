uniform float uOpacity;
uniform float uPedestalTopHeight;
uniform float uPedestalFadeHeight;
uniform vec3 uCentreColor;
uniform vec3 uEdgeColor;

varying vec2 vUv;
varying float vWorldHeight;

float sdfCircle( vec2 position, float radius ) {
    return length(position) - radius;
}

void main() {
    vec2 uv = (vUv - 0.5) * 2.0;

    float strength = sdfCircle(uv, 0.7);

    float alpha = 1.0 - smoothstep(-0.3, 0.2, strength);
    alpha *= smoothstep(uPedestalTopHeight, uPedestalTopHeight + uPedestalFadeHeight, vWorldHeight);

    float edgeAmount = smoothstep(0.1, 0.85, length(uv));
    vec3 backgroundColor = mix(uCentreColor, uEdgeColor, edgeAmount);

    gl_FragColor = vec4(backgroundColor, alpha * uOpacity);

    #include <tonemapping_fragment>
    #include <colorspace_fragment>
}