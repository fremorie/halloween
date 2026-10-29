import { shaderMaterial } from "@react-three/drei";
import { DoubleSide, type Texture } from "three";

import shadowFragmentShader from "@/shaders/treeV4Leaves/shadowFragment.glsl";
import vertexShader from "@/shaders/treeV4Leaves/vertex.glsl";

import { canopyLeavesTimeUniform } from "./canopyLeavesMaterial";

const CanopyLeavesShadowMaterial = shaderMaterial(
  {
    uTime: 0,
    uLeafAlphaTexture: null as Texture | null,
  },
  vertexShader,
  shadowFragmentShader,
);

export function createCanopyLeavesShadowMaterial(leafAlphaTexture: Texture) {
  const material = new CanopyLeavesShadowMaterial();

  material.side = DoubleSide;

  material.uniforms.uTime = canopyLeavesTimeUniform;
  material.uniforms.uLeafAlphaTexture.value = leafAlphaTexture;

  return material;
}
