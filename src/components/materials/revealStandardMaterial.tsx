import { MeshStandardMaterial, type Side } from "three";
import CustomShaderMaterial from "three-custom-shader-material";

import fragmentShader from "@/shaders/revealOutput/fragment.glsl";
import vertexShader from "@/shaders/revealOutput/vertex.glsl";

import { REVEAL_PATCH_MAP } from "./revealPatchMap";
import { revealUniforms } from "./revealUniforms";

type Props = {
  sourceMaterial: MeshStandardMaterial;
  shadowSide?: Side;
};

export function RevealStandardMaterial({ sourceMaterial, shadowSide }: Props) {
  return (
    <CustomShaderMaterial
      baseMaterial={MeshStandardMaterial}
      vertexShader={vertexShader}
      fragmentShader={fragmentShader}
      patchMap={REVEAL_PATCH_MAP}
      uniforms={revealUniforms}
      map={sourceMaterial.map}
      normalMap={sourceMaterial.normalMap}
      normalScale={sourceMaterial.normalScale}
      roughness={sourceMaterial.roughness}
      metalness={sourceMaterial.metalness}
      side={sourceMaterial.side}
      shadowSide={shadowSide}
    />
  );
}
