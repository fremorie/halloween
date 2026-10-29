uniform sampler2D uLeafAlphaTexture;

varying vec2 vUv;

void main() {
    float mask = texture2D(uLeafAlphaTexture, vUv).r;
    float alpha = smoothstep(0.2, 0.6, mask);

    if (alpha < 0.5) discard;

    gl_FragColor = vec4(1.0);
}
