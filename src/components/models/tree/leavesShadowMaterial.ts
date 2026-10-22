import { ShaderMaterial } from "three";

import vertexShader from "@/shaders/tree/vertex.glsl";

import { leavesTimeUniform } from "./leavesMaterial";

export function createLeavesShadowMaterial() {
  return new ShaderMaterial({
    vertexShader,
    uniforms: {
      uTime: leavesTimeUniform,
    },
  });
}
