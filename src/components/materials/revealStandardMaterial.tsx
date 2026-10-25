import { MeshStandardMaterial, type Side } from "three";
import CustomShaderMaterial from "three-custom-shader-material";

import fragmentShader from "@/shaders/revealOutput/fragment.glsl";

import { REVEAL_PATCH_MAP } from "./revealPatchMap";

type Props = {
  sourceMaterial: MeshStandardMaterial;
  shadowSide?: Side;
};

export function RevealStandardMaterial({ sourceMaterial, shadowSide }: Props) {
  return (
    <CustomShaderMaterial
      baseMaterial={MeshStandardMaterial}
      fragmentShader={fragmentShader}
      patchMap={REVEAL_PATCH_MAP}
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
