uniform mat3 uInverseGazeRotation;

varying vec3 vPositionFacingPositiveZ;
varying vec3 vGazePosition;

void main() {
    vPositionFacingPositiveZ = vec3(-position.x, position.y, -position.z);
    vGazePosition = uInverseGazeRotation * position;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
