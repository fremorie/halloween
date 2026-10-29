import { shaderMaterial } from "@react-three/drei";
import { type Texture, UniformsLib, UniformsUtils } from "three";

import { revealUniforms } from "@/components/materials/revealUniforms";
import fragmentShader from "@/shaders/treeV4Blob/fragment.glsl";
import vertexShader from "@/shaders/treeV4Blob/vertex.glsl";

const CanopyBlobMaterial = shaderMaterial(
  {
    uBlobTexture: null as Texture | null,
  },
  vertexShader,
  fragmentShader,
);

export function createCanopyBlobMaterial(blobTexture: Texture) {
  const material = new CanopyBlobMaterial();

  Object.assign(material.uniforms, revealUniforms);
  Object.assign(material.uniforms, UniformsUtils.clone(UniformsLib.fog));
  material.fog = true;

  material.uniforms.uBlobTexture.value = blobTexture;

  return material;
}
