varying vec3 vRevealWorldPosition;

void main() {
    vRevealWorldPosition = (modelMatrix * vec4(position, 1.0)).xyz;
}
