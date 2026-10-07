vec3 sampleNeighbor(vec2 uv, float x, float y) {
    return texture2D(inputBuffer, uv + vec2(x, y) * texelSize).rgb;
}

void mainImage(const in vec4 inputColor, const in vec2 uv, out vec4 outputColor) {
    vec3 topLeft = sampleNeighbor(uv, -1.0, 1.0);
    vec3 top = sampleNeighbor(uv, 0.0, 1.0);
    vec3 topRight = sampleNeighbor(uv, 1.0, 1.0);
    vec3 left = sampleNeighbor(uv, -1.0, 0.0);
    vec3 right = sampleNeighbor(uv, 1.0, 0.0);
    vec3 bottomLeft = sampleNeighbor(uv, -1.0, -1.0);
    vec3 bottom = sampleNeighbor(uv, 0.0, -1.0);
    vec3 bottomRight = sampleNeighbor(uv, 1.0, -1.0);

    vec3 gradientX = (topRight + 2.0 * right + bottomRight) - (topLeft + 2.0 * left + bottomLeft);
    vec3 gradientY = (topLeft + 2.0 * top + topRight) - (bottomLeft + 2.0 * bottom + bottomRight);

    float edgeStrength = sqrt(dot(gradientX, gradientX) + dot(gradientY, gradientY));

    outputColor = vec4(vec3(1.0 - clamp(edgeStrength * 1.5, 0.0, 1.0)), 1.0);
}