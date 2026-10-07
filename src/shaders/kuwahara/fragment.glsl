uniform float uPixelRatio;

#define RADIUS 6

void mainImage(const in vec4 inputColor, const in vec2 uv, out vec4 outputColor) {
    vec3 sum = vec3(0.0);
    float count = 0.0;

    for (int x = -RADIUS; x <= RADIUS; x++) {
        for (int y = -RADIUS; y <= RADIUS; y++) {
            vec2 offset = vec2(float(x), float(y)) * uPixelRatio * texelSize;
            sum += texture2D(inputBuffer, uv + offset).rgb;
            count += 1.0;
        }
    }

    outputColor = vec4(sum / count, 1.0);
}