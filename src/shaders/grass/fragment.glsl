uniform vec3 uHemiSkyColor;
uniform vec3 uHemiGroundColor;

varying vec3 vColor;
varying vec3 vGroundColor;
varying vec4 vGrassData;
varying vec3 vNormal;
varying vec3 vWorldPosition;

#include <fog_pars_fragment>

#include "../includes/utils.glsl"
#include "../includes/hemiLight.glsl"
#include "../includes/reveal.glsl"

const float GROUND_COLOR_HEIGHT = 0.15;
const float AO_FLOOR = 0.65;
const float GROUND_HUE_MATCH = 0.88;
const float GROUND_BRIGHTNESS_MATCH = 0.45;
const float TIP_BRIGHTNESS_LIFT = 1.22;
const float TIP_LIFT_START_HEIGHT = 0.6;
const vec3 LUMINANCE_WEIGHTS = vec3(0.2126, 0.7152, 0.0722);

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

    float ao = remap(pow(grassY, 2.0), 0.0, 1.0, AO_FLOOR, 1.0);

    vec3 litColor = baseColor * ambientLighting;

    float groundLuminance = max(dot(vGroundColor, LUMINANCE_WEIGHTS), 0.0001);
    float litLuminance = max(dot(litColor, LUMINANCE_WEIGHTS), 0.0001);
    vec3 groundHue = vGroundColor / groundLuminance;

    vec3 groundHuedBladeColor = mix(litColor, groundHue * litLuminance, GROUND_HUE_MATCH);
    float brightnessTowardGround = pow(groundLuminance / litLuminance, GROUND_BRIGHTNESS_MATCH);
    vec3 bladeColor = groundHuedBladeColor * brightnessTowardGround;
    bladeColor *= ao;
    bladeColor *= mix(1.0, TIP_BRIGHTNESS_LIFT, smoothstep(TIP_LIFT_START_HEIGHT, 1.0, grassY));

    vec3 color = mix(vGroundColor, bladeColor, smoothstep(0.0, GROUND_COLOR_HEIGHT, grassY));

    color = revealColor(color, vWorldPosition);

    gl_FragColor = vec4(color, 1.0);

    #include <colorspace_fragment>
    #include <fog_fragment>
}
