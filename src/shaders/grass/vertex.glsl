uniform vec4 grassParams;
uniform float uTime;
uniform vec3 uTipColor;
uniform vec3 uBaseColor;
uniform vec3 uTipColor2;
uniform vec3 uBaseColor2;
uniform sampler2D uGrassMap;
uniform float uGrassMapWorldSize;

uniform float uGridSize;

varying vec3 vColor;
varying vec4 vGrassData;
varying vec3 vNormal;
varying vec3 vWorldPosition;

#include "../includes/utils.glsl"
#include "../includes/hash.glsl"
#include "../includes/noise.glsl"

vec3 getGrassBladePosition(
    int instanceID,
    float gridSize,
    float grassPatchSize,
    vec2 tileOrigin
) {
    float cell = grassPatchSize / gridSize;

    float x = mod(float(instanceID), gridSize);
    float z = floor(float(instanceID) / gridSize);

    vec2 cellCenter = (vec2(x, z) + 0.5) * cell - grassPatchSize * 0.5;
    vec2 worldCellCenter = cellCenter + tileOrigin;

    vec2 randomOffset = hash(vec3(worldCellCenter.x, 0.0, worldCellCenter.y)).xy * 0.5;

    vec2 position = cellCenter + randomOffset * cell * 4.0;

    return vec3(position.x, 0.0, position.y);
}

void main() {
    int GRASS_SEGMENTS = int(grassParams.x);
    int GRASS_VERTICES = (GRASS_SEGMENTS + 1) * 2;
    float GRASS_PATCH_SIZE = grassParams.y;
    float GRASS_WIDTH = grassParams.z;
    float GRASS_HEIGHT = grassParams.w;

    vec2 tileOrigin = (modelMatrix * vec4(0.0, 0.0, 0.0, 1.0)).xz;
    vec3 grassOffset = getGrassBladePosition(
        gl_InstanceID,
        uGridSize,
        GRASS_PATCH_SIZE,
        tileOrigin
    );
    vec3 grassBladeWorldPos = (modelMatrix * vec4(grassOffset, 1.0)).xyz;
    vec2 grassMapUv = vec2(grassBladeWorldPos.x, -grassBladeWorldPos.z) / uGrassMapWorldSize + 0.5;
    float grassMask = textureLod(uGrassMap, grassMapUv, 0.0).r;

    vec3 hashVal = hash(grassBladeWorldPos);

    const float PI = 3.1415926535;
    float angle = remap(hashVal.x, -1.0, 1.0, -PI, PI);

    float stiffness = 1.0;

    int vertFB_ID = gl_VertexID % (GRASS_VERTICES * 2);
    int vertID = vertFB_ID % GRASS_VERTICES;

    int xTest = vertID & 0x1;
    int zTest = (vertFB_ID >= GRASS_VERTICES) ? 1 : -1;
    float xSide = float(xTest);
    float zSide = float(zTest);
    float heightPercent = float(vertID - xTest) / (float(GRASS_SEGMENTS) * 2.0);

    float grassMaskScale = smoothstep(0.5, 0.9, grassMask);
    float width = GRASS_WIDTH * easeOut(1.0 - heightPercent, 4.0) * grassMaskScale;
    float height = GRASS_HEIGHT * grassMaskScale;

    float x = (xSide - 0.5) * width;
    float y = heightPercent * height;
    float z = 0.0;

    float windStrength = noise(vec3(grassBladeWorldPos.xz * 0.05, 0.0) + uTime);
    float windAngle = 0.0;
    vec3 windAxis = vec3(cos(windAngle), 0.0, sin(windAngle));
    float windLeanAngle = windStrength * 0.25 * heightPercent * stiffness;

    float randomLeanAnimation = noise(vec3(grassBladeWorldPos.xz, uTime * 4.0)) * (windStrength * 0.5 + 0.125);
    float leanFactor = remap(hashVal.y, -1.0, 1.0, -0.5, 0.5) + randomLeanAnimation;

    vec3 p1 = vec3(0.0);
    vec3 p2 = vec3(0.0, 0.33, 0.0);
    vec3 p3 = vec3(0.0, 0.66, 0.0);
    vec3 p4 = vec3(0.0, cos(leanFactor), sin(leanFactor));
    vec3 curve = bezier(p1, p2, p3, p4, heightPercent);

    vec3 curveGrad = bezierGrad(p1, p2, p3, p4, heightPercent);
    mat2 curveRot90 = mat2(0.0, 1.0, -1.0, 0.0) * (-zSide);

    y = curve.y * height;
    z = curve.z * height;

    mat3 grassMat = rotateAxis(windAxis, windLeanAngle) * rotateY(angle);

    vec3 grassLocalPosition = grassMat * vec3(x, y, z) + grassOffset;
    vec3 grassLocalNormal = grassMat * vec3(0.0, curveRot90 * curveGrad.yz);

    float distanceBlend = smoothstep(0.0, 10.0, distance(cameraPosition, grassBladeWorldPos));
    grassLocalNormal = mix(grassLocalNormal, vec3(0.0, 1.0, 0.0), distanceBlend * 0.5);
    grassLocalNormal = normalize(grassLocalNormal);

    vec4 worldPosition = modelMatrix * vec4(grassLocalPosition, 1.0);

    vec4 mvPosition = viewMatrix * worldPosition;
    vec3 viewDir = normalize(cameraPosition - grassBladeWorldPos);
    vec3 grassFaceNormal = grassMat * vec3(0.0, 0.0, -zSide);
    float viewDotNormal = saturate(dot(grassFaceNormal, viewDir));
    float viewSpaceThickenFactor = easeOut(1.0 - viewDotNormal, 4.0) * smoothstep(0.0, 0.2, viewDotNormal);

    mvPosition.x += viewSpaceThickenFactor * (xSide - 0.5) * width * 0.5 * (-zSide);

    gl_Position = projectionMatrix * mvPosition;
    gl_Position.w = grassMaskScale <= 0.0 ? 0.0 : gl_Position.w;

    vec3 c1 = mix(uBaseColor, uTipColor, heightPercent);
    vec3 c2 = mix(uBaseColor2, uTipColor2, heightPercent);
    float noiseValue = noise(grassBladeWorldPos * 0.1);

    vColor = mix(c1, c2, smoothstep(-1.0, 1.0, noiseValue));
    // vColor = vec3(grassMask);
    vColor = mix(c1, vColor, stiffness);
    vGrassData = vec4(x, heightPercent, 0.0, 0.0);
    vNormal = normalize((modelMatrix * vec4(grassLocalNormal, 0.0)).xyz);
    vWorldPosition = worldPosition.xyz;
}
