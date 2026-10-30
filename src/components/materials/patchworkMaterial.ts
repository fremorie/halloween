import { shaderMaterial } from "@react-three/drei";
import {
  DoubleSide,
  type Texture,
  Uniform,
  UniformsLib,
  UniformsUtils,
} from "three";

import fragmentShader from "@/shaders/patchwork/fragment.glsl";
import vertexShader from "@/shaders/patchwork/vertex.glsl";
import type { CostumePiece } from "@/types/level";

export const patchworkStitchProgressUniforms = {
  hat: new Uniform(0),
  cape: new Uniform(0),
  wings: new Uniform(0),
} satisfies Record<CostumePiece, Uniform<number>>;
export const patchworkRowCountUniform = new Uniform(8);

const PatchworkMaterial = shaderMaterial(
  {
    uPatchworkTexture: null as Texture | null,
    uStitchProgress: 0,
    uRowCount: 8,
  },
  vertexShader,
  fragmentShader,
);

export function createPatchworkMaterial(
  patchworkTexture: Texture,
  costumePiece: CostumePiece,
) {
  const material = new PatchworkMaterial();

  Object.assign(material.uniforms, UniformsUtils.clone(UniformsLib.fog));
  material.fog = true;

  material.uniforms.uPatchworkTexture.value = patchworkTexture;
  material.uniforms.uStitchProgress =
    patchworkStitchProgressUniforms[costumePiece];
  material.uniforms.uRowCount = patchworkRowCountUniform;
  material.side = DoubleSide;

  return material;
}
