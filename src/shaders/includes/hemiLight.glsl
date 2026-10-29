vec3 hemiLight(vec3 normal, vec3 groundColor, vec3 skyColor) {
    return mix(groundColor, skyColor, 0.5 * normal.y + 0.5);
}
