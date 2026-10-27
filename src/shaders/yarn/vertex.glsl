uniform float uWrapRadius;
uniform float uStrandRadius;
uniform float uTurnsPerUnitLength;

#include <fog_pars_vertex>

const float TAU = 6.28318530718;

void main() {
    // branch real size
    float branchLength = length(instanceMatrix[0].xyz);
    float branchThickness = length(instanceMatrix[1].xyz);

    float distanceAlongBranch = position.x * branchLength;
    // how many radians the yarn has turned
    float wrapAngle = TAU * uTurnsPerUnitLength * distanceAlongBranch;

    vec3 radialDirection = vec3(0.0, cos(wrapAngle), sin(wrapAngle));
    vec3 aroundDirection = vec3(0.0, -sin(wrapAngle), cos(wrapAngle));

    float wrapRadius = uWrapRadius * branchThickness;
    float strandRadius = uStrandRadius * branchThickness;
    float advancePerRadian = 1.0 / (TAU * uTurnsPerUnitLength);

    vec3 helixTangent = normalize(
        vec3(advancePerRadian, 0.0, 0.0) + aroundDirection * wrapRadius
    );

    vec3 strandSideDirection = cross(helixTangent, radialDirection);
    vec3 helixCenter = vec3(distanceAlongBranch, 0.0, 0.0) + radialDirection * wrapRadius;
    vec3 strandSurfaceOffset = (radialDirection * position.y + strandSideDirection * position.z) * strandRadius;

    vec3 worldScaledPosition = helixCenter + strandSurfaceOffset;
    vec3 localPosition = vec3(
        worldScaledPosition.x / branchLength,
        worldScaledPosition.yz / branchThickness
    );

    vec4 mvPosition = modelViewMatrix * instanceMatrix * vec4(localPosition, 1.0);

    #include <fog_vertex>

    gl_Position = projectionMatrix * mvPosition;
}