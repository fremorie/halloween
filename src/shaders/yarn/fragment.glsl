uniform vec3 uYarnColor;
uniform vec3 uSunDirection;

varying float vAlongBranch;
varying float vWrapProgress;
varying vec3 vWorldNormal;

#include <fog_pars_fragment>

#include "../includes/lights.glsl"

const vec3 SKY_LIGHT = vec3(1.0, 0.97, 0.93);
const vec3 GROUND_LIGHT = vec3(0.45, 0.4, 0.36);
const float SUN_STRENGTH = 0.5;
const float INSIDE_DARKNESS = 0.35;

void main() {
    bool isUnwrapped = vWrapProgress <= 0.0 || vAlongBranch > vWrapProgress;
    if (isUnwrapped) discard;

    vec3 normal = normalize(vWorldNormal);
    vec3 ambientLight = hemiLight(normal, GROUND_LIGHT, SKY_LIGHT);
    float sunLight = max(dot(normal, uSunDirection), 0.0) * SUN_STRENGTH;

    vec3 litYarnColor = uYarnColor * (ambientLight + sunLight);
    if (!gl_FrontFacing) litYarnColor *= INSIDE_DARKNESS;

    gl_FragColor = vec4(litYarnColor, 1.0);

    #include <tonemapping_fragment>
    #include <colorspace_fragment>
    #include <fog_fragment>
}
