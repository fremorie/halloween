#include "../includes/reveal.glsl"

void main() {
    csm_DiffuseColor.rgb = revealColor(csm_DiffuseColor.rgb);
}
