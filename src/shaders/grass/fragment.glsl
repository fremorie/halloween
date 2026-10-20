varying vec3 vColor;
varying vec4 vGrassData;
varying vec3 vNormal;

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

    vec3 c1 = vec3(0.9, 0.68, 0.27);
    vec3 c2 = vec3(0.25, 0.34, 0.13);

    vec3 ambientLighting = hemiLight(normal, c2, c1);

    float ao = remap(pow(grassY, 2.0), 0.0, 1.0, 0.125, 1.0);

    vec3 color = baseColor * ambientLighting;
    color *= ao;

    gl_FragColor = vec4(color, 1.0);

    #include <colorspace_fragment>
}
