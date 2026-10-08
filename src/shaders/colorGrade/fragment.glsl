uniform float uToneLevels;
uniform vec2 uBrightnessRange;
uniform float uDarkestTone;
uniform float uSaturation;

float perceivedBrightness(vec3 color) {
    return dot(color, vec3(0.299, 0.587, 0.114));
}

float quantize(float value, float levels) {
    float stepCount = levels - 1.0;
    return floor(value * stepCount + 0.5) / stepCount;
}

vec3 adjustSaturation(vec3 color, float saturation) {
    vec3 grey = vec3(dot(color, vec3(0.2125, 0.7154, 0.0721)));
    return mix(grey, color, saturation);
}

vec3 acesToneMapping(vec3 color) {
    return clamp((color * (2.51 * color + 0.03)) / (color * (2.43 * color + 0.59) + 0.14), 0.0, 1.0);
}

void mainImage(const in vec4 inputColor, const in vec2 uv, out vec4 outputColor) {
    vec3 color = inputColor.rgb;

    // Fewer tones
    float toneLevel = clamp(
        quantize(perceivedBrightness(color), uToneLevels),
        uBrightnessRange.x,
        uBrightnessRange.y
    );

    // Darks towards near-black, lights towards white
    if (toneLevel < 0.5) {
        color = mix(vec3(uDarkestTone), color, toneLevel * 2.0);
    } else {
        color = mix(color, vec3(1.0), (toneLevel - 0.5) * 2.0);
    }

    color = adjustSaturation(color, uSaturation);
    color = acesToneMapping(color) / acesToneMapping(vec3(1.0));

    outputColor = vec4(color, inputColor.a);
}
