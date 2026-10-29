import { MeshStandardMaterial, type Texture } from "three";
import CustomShaderMaterial from "three-custom-shader-material/vanilla";

import { REVEAL_PATCH_MAP } from "@/components/materials/revealPatchMap";
import { revealUniforms } from "@/components/materials/revealUniforms";
import fragmentShader from "@/shaders/revealOutput/fragment.glsl";
import vertexShader from "@/shaders/revealOutput/vertex.glsl";

export function createTrunkMaterial(
  trunkBaseColorTexture: Texture,
  trunkNormalMap: Texture,
) {
  return new CustomShaderMaterial({
    baseMaterial: MeshStandardMaterial,
    vertexShader,
    fragmentShader,
    patchMap: REVEAL_PATCH_MAP,
    uniforms: revealUniforms,
    map: trunkBaseColorTexture,
    normalMap: trunkNormalMap,
  });
}
