uniform float uOpacity;

varying vec2 vUv;

float sdfCircle( vec2 position, float radius ) {
    return length(position) - radius;
}

void main() {
    vec2 uv = (vUv - 0.5) * 2.0;

    float strength = sdfCircle(uv, 0.7);

    float alpha = 1.0 - smoothstep(-0.3, 0.2, strength);

    vec4 color = vec4(
        vec3(1.0),
        alpha * uOpacity
    );


    gl_FragColor = color;
}