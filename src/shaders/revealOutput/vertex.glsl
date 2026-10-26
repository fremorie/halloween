varying vec3 vRevealWorldPosition;

void main() {
    vec4 revealLocalPosition = vec4(position, 1.0);
    #ifdef USE_INSTANCING
        revealLocalPosition = instanceMatrix * revealLocalPosition;
    #endif
    vRevealWorldPosition = (modelMatrix * revealLocalPosition).xyz;
}
