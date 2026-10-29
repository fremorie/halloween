#include "./hemiLight.glsl"
#include "./directionalLight.glsl"

const vec3 skyColor = vec3(1.0, 1.0, 1.0);
const vec3 groundColor = vec3(0.3, 0.27, 0.22);
const float hemiIntensity = 0.6;

const vec3 sunColor = vec3(1.0, 0.95, 0.85);
const float sunIntensity = 0.7;

vec3 canopyLighting(vec3 normal) {
    vec3 hemiLighting = hemiLight(normal, groundColor, skyColor) * hemiIntensity;
    vec3 sunLighting = directionalLight(normal, sunColor) * sunIntensity;

    return hemiLighting + sunLighting;
}
