uniform vec3 uHemiSkyColor;
uniform vec3 uHemiGroundColor;

varying vec3 vColor;
varying vec4 vGrassData;
varying vec3 vNormal;

#include <fog_pars_fragment>

#include "../includes/utils.glsl"
#include "../includes/lights.glsl"

void main() {
    float grassX = vGrassData.x;
    float grassY = vGrassData.y;

    vec3 normal = normalize(vNormal);

    vec3 baseColor = mix(
        vColor * 0.75,
        vColor,
        smoothstep(0.125, 0.0, abs(grassX))
    );

    vec3 ambientLighting = hemiLight(normal, uHemiGroundColor, uHemiSkyColor);

    float ao = remap(pow(grassY, 2.0), 0.0, 1.0, 0.125, 1.0);

    vec3 color = baseColor * ambientLighting;
    color *= ao;

    gl_FragColor = vec4(color, 1.0);

    #include <colorspace_fragment>
    #include <fog_fragment>
}
