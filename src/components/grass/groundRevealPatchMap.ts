import type { CSMPatchMap } from "three-custom-shader-material/vanilla";

export const GROUND_REVEAL_PATCH_MAP: CSMPatchMap = {
  "*": {
    "#include <opaque_fragment>": `
      #include <opaque_fragment>
      gl_FragColor = groundRevealColor(gl_FragColor, vRevealWorldPosition);
    `,
  },
};
