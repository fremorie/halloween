import { shaderMaterial } from "@react-three/drei";
import {
  DoubleSide,
  type Texture,
  Uniform,
  UniformsLib,
  UniformsUtils,
} from "three";

import fragmentShader from "@/shaders/branchLeaves/fragment.glsl";
import shadowFragmentShader from "@/shaders/branchLeaves/shadowFragment.glsl";
import vertexShader from "@/shaders/branchLeaves/vertex.glsl";

export const branchLeavesTimeUniform = new Uniform(0);

const BranchLeavesMaterial = shaderMaterial(
  {
    uTime: 0,
    uLeafTexture: null as Texture | null,
  },
  vertexShader,
  fragmentShader,
);

const BranchLeavesShadowMaterial = shaderMaterial(
  { uTime: 0 },
  vertexShader,
  shadowFragmentShader,
);

export function createBranchLeavesMaterial(leafTexture: Texture) {
  const material = new BranchLeavesMaterial();

  Object.assign(material.uniforms, UniformsUtils.clone(UniformsLib.fog));
  material.fog = true;
  material.side = DoubleSide;

  material.uniforms.uTime = branchLeavesTimeUniform;
  material.uniforms.uLeafTexture.value = leafTexture;

  return material;
}

export function createBranchLeavesShadowMaterial() {
  const material = new BranchLeavesShadowMaterial();

  material.uniforms.uTime = branchLeavesTimeUniform;

  return material;
}
