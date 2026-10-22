import { shaderMaterial } from "@react-three/drei";
import { type Texture, Uniform, UniformsLib, UniformsUtils } from "three";

import fragmentShader from "@/shaders/patchwork/fragment.glsl";
import vertexShader from "@/shaders/patchwork/vertex.glsl";

export const patchworkStitchProgressUniform = new Uniform(0);

const PatchworkMaterial = shaderMaterial(
  {
    uPatchworkTexture: null as Texture | null,
    uStitchProgress: 0,
  },
  vertexShader,
  fragmentShader,
);

export function createPatchworkMaterial(patchworkTexture: Texture) {
  const material = new PatchworkMaterial();

  Object.assign(material.uniforms, UniformsUtils.clone(UniformsLib.fog));
  material.fog = true;

  material.uniforms.uPatchworkTexture.value = patchworkTexture;
  material.uniforms.uStitchProgress = patchworkStitchProgressUniform;

  return material;
}
