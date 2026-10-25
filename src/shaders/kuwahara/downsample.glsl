uniform sampler2D inputBuffer;
uniform vec2 uTexelSize;

varying vec2 vUv;

void main() {
    vec2 quarterTexel = uTexelSize * 0.25;

    vec4 sum = texture2D(inputBuffer, vUv + vec2(-quarterTexel.x, -quarterTexel.y))
             + texture2D(inputBuffer, vUv + vec2( quarterTexel.x, -quarterTexel.y))
             + texture2D(inputBuffer, vUv + vec2(-quarterTexel.x,  quarterTexel.y))
             + texture2D(inputBuffer, vUv + vec2( quarterTexel.x,  quarterTexel.y));

    gl_FragColor = sum * 0.25;
}
