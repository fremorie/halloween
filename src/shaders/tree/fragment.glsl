uniform vec3 uLeavesColor;

varying vec3 vNormal;
varying vec3 vPosition;

void main() {
    // Normal
    vec3 normal = normalize(vNormal);

    // Fresnel
    vec3 viewDirection = normalize(vPosition - cameraPosition);
    float fresnel = dot(viewDirection, normal) + 1.0;
    fresnel = pow(fresnel, 0.25);

    gl_FragColor = vec4(uLeavesColor, fresnel);
}