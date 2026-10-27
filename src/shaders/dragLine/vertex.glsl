varying vec3 vWorldNormal;
varying vec2 vStrandCrossSection;
varying float vDistanceAlongStrand;

void main() {
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);

    gl_Position = projectionMatrix * mvPosition;

    float lineLength = length(modelMatrix[1].xyz);

    vWorldNormal = normalize(mat3(modelMatrix) * normal);
    vStrandCrossSection = position.xz;
    vDistanceAlongStrand = (position.y + 0.5) * lineLength;
}
