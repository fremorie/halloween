varying vec2 vUv;
varying float vWorldHeight;

void main() {
    vec4 worldPosition = modelMatrix * vec4(position, 1.0);
    gl_Position = projectionMatrix * viewMatrix * worldPosition;

    vUv = uv;
    vWorldHeight = worldPosition.y;
}
