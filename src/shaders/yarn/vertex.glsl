attribute float aWrapProgress;
attribute float aWrapsFromEnd;
attribute vec3 aYarnColor;

uniform float uWrapGap;
uniform float uStrandRadius;
uniform float uTurnsPerUnitLength;
uniform vec3 uStemProfile[STEM_PROFILE_SAMPLE_COUNT];

varying float vAlongBranch;
varying float vWrapProgress;
varying vec3 vWorldNormal;
varying vec2 vStrandCrossSection;
varying float vDistanceAlongStrand;
varying float vWrapsFromEnd;
varying vec3 vYarnColor;

#include <fog_pars_vertex>

const float TAU = 6.28318530718;

vec3 sampleStemProfile(float alongBranch) {
    float samplePosition = clamp(alongBranch, 0.0, 1.0) * float(STEM_PROFILE_SAMPLE_COUNT - 1);
    int lowerSampleIndex = min(int(samplePosition), STEM_PROFILE_SAMPLE_COUNT - 2);
    float blendToUpperSample = samplePosition - float(lowerSampleIndex);

    return mix(
        uStemProfile[lowerSampleIndex],
        uStemProfile[lowerSampleIndex + 1],
        blendToUpperSample
    );
}

void main() {
    // branch real size
    float branchLength = length(instanceMatrix[0].xyz);
    float branchThickness = length(instanceMatrix[1].xyz);

    vec3 stemProfile = sampleStemProfile(position.x);
    vec2 stemCenter = stemProfile.xy * branchThickness;
    float stemRadius = stemProfile.z * branchThickness;

    float distanceAlongBranch = position.x * branchLength;
    // how many radians the yarn has turned
    float wrapAngle = TAU * uTurnsPerUnitLength * distanceAlongBranch;

    vec3 radialDirection = vec3(0.0, cos(wrapAngle), sin(wrapAngle));
    vec3 aroundDirection = vec3(0.0, -sin(wrapAngle), cos(wrapAngle));

    float strandRadius = uStrandRadius * branchThickness;
    float wrapRadius = stemRadius + strandRadius + uWrapGap * branchThickness;
    float advancePerRadian = 1.0 / (TAU * uTurnsPerUnitLength);

    vec3 helixVelocityPerRadian = vec3(advancePerRadian, 0.0, 0.0) + aroundDirection * wrapRadius;
    vec3 helixTangent = normalize(helixVelocityPerRadian);

    vec3 strandSideDirection = cross(helixTangent, radialDirection);
    vec3 helixCenter = vec3(distanceAlongBranch, stemCenter) + radialDirection * wrapRadius;
    vec3 strandSurfaceOffset = (radialDirection * position.y + strandSideDirection * position.z) * strandRadius;

    vec3 strandNormal = normalize(
        radialDirection * position.y + strandSideDirection * position.z
    );
    mat3 branchRotation = mat3(
        instanceMatrix[0].xyz / branchLength,
        instanceMatrix[1].xyz / branchThickness,
        instanceMatrix[2].xyz / branchThickness
    );

    vec3 worldScaledPosition = helixCenter + strandSurfaceOffset;
    vec3 localPosition = vec3(
        worldScaledPosition.x / branchLength,
        worldScaledPosition.yz / branchThickness
    );

    vec4 mvPosition = modelViewMatrix * instanceMatrix * vec4(localPosition, 1.0);

    #include <fog_vertex>

    gl_Position = projectionMatrix * mvPosition;

    vAlongBranch = position.x;
    vWrapProgress = aWrapProgress;
    vWorldNormal = normalize(mat3(modelMatrix) * branchRotation * strandNormal);
    vStrandCrossSection = position.yz;
    vDistanceAlongStrand = wrapAngle * length(helixVelocityPerRadian);
    vWrapsFromEnd = aWrapsFromEnd;
    vYarnColor = aYarnColor;
}
