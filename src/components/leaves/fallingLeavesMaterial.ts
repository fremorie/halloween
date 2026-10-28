import { shaderMaterial } from "@react-three/drei";
import { Color, type Texture, Uniform } from "three";

import fragmentShader from "@/shaders/leaves/fragment.glsl";
import vertexShader from "@/shaders/leaves/vertex.glsl";

import { LEAVES_GROUND_LEVEL, LEAVES_SPAWN_HEIGHT } from "./constants";

export const fallingLeavesTimeUniform = new Uniform(0);

const FallingLeavesMaterial = shaderMaterial(
  {
    uTime: 0,
    uTexture: null as Texture | null,
    uDarkColor: new Color(),
    uLightColor: new Color(),
    uGroundLevel: LEAVES_GROUND_LEVEL,
    uTopLevel: LEAVES_SPAWN_HEIGHT,
  },
  vertexShader,
  fragmentShader,
);

export function createFallingLeavesMaterial(leafTexture: Texture) {
  const material = new FallingLeavesMaterial();

  material.transparent = true;
  material.depthWrite = false;

  material.uniforms.uTime = fallingLeavesTimeUniform;
  material.uniforms.uTexture.value = leafTexture;

  return material;
}
