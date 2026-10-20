import { shaderMaterial } from "@react-three/drei";
import { Color, Uniform, Vector4 } from "three";

import fragmentShader from "@/shaders/grass/fragment.glsl";
import vertexShader from "@/shaders/grass/vertex.glsl";

import { GRASS_PATCH_SIZE } from "./utils";

const GRASS_WIDTH = 0.2;
const GRASS_HEIGHT = 0.8;

export const grassTimeUniform = new Uniform(0);

const GrassMaterial = shaderMaterial(
  {
    uTime: 0,
    grassParams: new Vector4(),
    uGridSize: 1,
    uTipColor: new Color("#608d34"),
    uBaseColor: new Color("#90d64b"),
    uTipColor2: new Color("#b2b418"),
    uBaseColor2: new Color("#365517"),
  },
  vertexShader,
  fragmentShader,
);

export function createGrassMaterial(
  grassSegments: number,
  grassBladeCount: number,
) {
  const material = new GrassMaterial();
  material.uniforms.uTime = grassTimeUniform;
  material.uniforms.grassParams.value.set(
    grassSegments,
    GRASS_PATCH_SIZE,
    GRASS_WIDTH,
    GRASS_HEIGHT,
  );
  material.uniforms.uGridSize.value = Math.sqrt(grassBladeCount);
  return material;
}
