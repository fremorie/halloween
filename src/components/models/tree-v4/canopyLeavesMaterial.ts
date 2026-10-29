import { shaderMaterial } from "@react-three/drei";
import {
  DoubleSide,
  type Texture,
  Uniform,
  UniformsLib,
  UniformsUtils,
} from "three";

import fragmentShader from "@/shaders/treeV4Leaves/fragment.glsl";
import vertexShader from "@/shaders/treeV4Leaves/vertex.glsl";

export const canopyLeavesTimeUniform = new Uniform(0);

const CanopyLeavesMaterial = shaderMaterial(
  {
    uTime: 0,
    uLeafTexture: null as Texture | null,
    uLeafAlphaTexture: null as Texture | null,
  },
  vertexShader,
  fragmentShader,
);

export function createCanopyLeavesMaterial(
  leafTexture: Texture,
  leafAlphaTexture: Texture,
) {
  const material = new CanopyLeavesMaterial();

  Object.assign(material.uniforms, UniformsUtils.clone(UniformsLib.fog));
  material.fog = true;
  material.side = DoubleSide;

  material.uniforms.uTime = canopyLeavesTimeUniform;
  material.uniforms.uLeafTexture.value = leafTexture;
  material.uniforms.uLeafAlphaTexture.value = leafAlphaTexture;

  return material;
}
