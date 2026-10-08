uniform sampler2D tPainted;

void mainImage(const in vec4 inputColor, const in vec2 uv, out vec4 outputColor) {
    vec3 finalColor = texture2D(tPainted, uv).rgb;

    outputColor = vec4(finalColor, inputColor.a);
}
