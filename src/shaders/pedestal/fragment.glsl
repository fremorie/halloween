void main() {
    float diffuseLuminance = dot(csm_DiffuseColor.rgb, vec3(0.2126, 0.7152, 0.0722));
    csm_DiffuseColor.rgb = vec3(diffuseLuminance);
}
