import { shaderMaterial } from "@react-three/drei";
import {
  Color,
  type Texture,
  Uniform,
  UniformsLib,
  UniformsUtils,
} from "three";

import fragmentShader from "@/shaders/tree/fragment.glsl";
import vertexShader from "@/shaders/tree/vertex.glsl";

export const leavesTimeUniform = new Uniform(0);

const LeavesMaterial = shaderMaterial(
  {
    uTime: 0,
    uLeavesColor: new Color("#d9622b"),
    uLeavesTexture: null,
  },
  vertexShader,
  fragmentShader,
);

export function createLeavesMaterial(leavesTexture: Texture) {
  const material = new LeavesMaterial();

  Object.assign(material.uniforms, UniformsUtils.clone(UniformsLib.fog));
  material.fog = true;

  material.uniforms.uTime = leavesTimeUniform;
  material.uniforms.uLeavesTexture.value = leavesTexture;

  return material;
}
