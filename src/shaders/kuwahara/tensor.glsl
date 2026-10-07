uniform sampler2D inputBuffer;
uniform vec2 uTexelSize;
varying vec2 vUv;

vec3 sampleNeighbor(float x, float y) {
    return texture2D(inputBuffer, vUv + vec2(x, y) * uTexelSize).rgb;
}

void main() {
    vec3 topLeft = sampleNeighbor(-1.0, 1.0);
    vec3 top = sampleNeighbor(0.0, 1.0);
    vec3 topRight = sampleNeighbor(1.0, 1.0);
    vec3 left = sampleNeighbor(-1.0, 0.0);
    vec3 right = sampleNeighbor(1.0, 0.0);
    vec3 bottomLeft = sampleNeighbor(-1.0, -1.0);
    vec3 bottom = sampleNeighbor(0.0, -1.0);
    vec3 bottomRight = sampleNeighbor(1.0, -1.0);

    vec3 gradientX = (topRight + 2.0 * right + bottomRight) - (topLeft + 2.0 * left + bottomLeft);
    vec3 gradientY = (topLeft + 2.0 * top + topRight) - (bottomLeft + 2.0 * bottom + bottomRight);

    gl_FragColor = vec4(dot(gradientX, gradientX), dot(gradientY, gradientY), dot(gradientX, gradientY), 1.0);
}
