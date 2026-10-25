uniform sampler2D tGrain;
uniform vec3 uPaperColor;
uniform float uGrainStrength;

void mainImage(const in vec4 inputColor, const in vec2 uv, out vec4 outputColor) {
    float grain = texture2D(tGrain, uv).r;
    vec3 paper = uPaperColor * (1.0 + uGrainStrength * (grain - 0.5));

    // White becomes the paper, dark stays dark
    outputColor = vec4(inputColor.rgb * paper, inputColor.a);
}
