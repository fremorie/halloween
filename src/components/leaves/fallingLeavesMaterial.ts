import { shaderMaterial } from "@react-three/drei";
import {
  Color,
  type Texture,
  Uniform,
  UniformsLib,
  UniformsUtils,
} from "three";

import { revealUniforms } from "@/components/materials/revealUniforms";
import fragmentShader from "@/shaders/leaves/fragment.glsl";
import vertexShader from "@/shaders/leaves/vertex.glsl";
import { LEAVES_GROUND_LEVEL, LEAVES_SPAWN_HEIGHT } from "./constants";

export const fallingLeavesTimeUniform = new Uniform(0);
export const fallingLeavesViewportHeightUniform = new Uniform(1);

const FallingLeavesMaterial = shaderMaterial(
  {
    uTime: 0,
    uTexture: null as Texture | null,
    uDarkColor: new Color(),
    uLightColor: new Color(),
    uGroundLevel: LEAVES_GROUND_LEVEL,
    uTopLevel: LEAVES_SPAWN_HEIGHT,
    uViewportHeight: 1,
  },
  vertexShader,
  fragmentShader,
);

export function createFallingLeavesMaterial(leafTexture: Texture) {
  const material = new FallingLeavesMaterial();

  Object.assign(material.uniforms, revealUniforms);
  Object.assign(material.uniforms, UniformsUtils.clone(UniformsLib.fog));
  material.fog = true;

  material.transparent = true;
  material.depthWrite = false;

  material.uniforms.uTime = fallingLeavesTimeUniform;
  material.uniforms.uViewportHeight = fallingLeavesViewportHeightUniform;
  material.uniforms.uTexture.value = leafTexture;

  return material;
}
