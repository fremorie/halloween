import type { CSMPatchMap } from "three-custom-shader-material/vanilla";

export const REVEAL_PATCH_MAP: CSMPatchMap = {
  "*": {
    "#include <opaque_fragment>": `
      #include <opaque_fragment>
      gl_FragColor.rgb = revealColor(gl_FragColor.rgb, vRevealWorldPosition);
    `,
  },
};
