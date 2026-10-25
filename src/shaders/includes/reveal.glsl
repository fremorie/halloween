vec3 revealColor(vec3 color) {
    float luminance = dot(color, vec3(0.2126, 0.7152, 0.0722));
    return vec3(luminance);
}
