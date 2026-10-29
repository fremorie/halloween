const vec3 sunDirection = normalize(vec3(3.0, 5.0, 2.0));

vec3 directionalLight(vec3 normal, vec3 lightColor) {
    return lightColor * max(dot(normal, sunDirection), 0.0);
}
