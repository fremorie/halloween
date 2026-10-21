import { shaderMaterial } from "@react-three/drei";
import { Color, Uniform } from "three";

import fragmentShader from "@/shaders/tree/fragment.glsl";
import vertexShader from "@/shaders/tree/vertex.glsl";

export const leavesTimeUniform = new Uniform(0);

const LeavesMaterial = shaderMaterial(
  {
    uTime: 0,
    uLeavesColor: new Color("#d9622b"),
  },
  vertexShader,
  fragmentShader,
);

export function createLeavesMaterial() {
  const material = new LeavesMaterial();
  material.uniforms.uTime = leavesTimeUniform;

  return material;
}
