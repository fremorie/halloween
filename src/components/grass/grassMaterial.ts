import { shaderMaterial } from "@react-three/drei";
import { Color, Texture, Uniform, Vector4 } from "three";

import fragmentShader from "@/shaders/grass/fragment.glsl";
import vertexShader from "@/shaders/grass/vertex.glsl";

import { GRASS_MAP_WORLD_SIZE } from "./utils";

const GRASS_WIDTH = 0.05;
const GRASS_HEIGHT = 0.6;

export const grassTimeUniform = new Uniform(0);

const GrassMaterial = shaderMaterial(
  {
    uTime: 0,
    grassParams: new Vector4(),
    uTipColor: new Color("#608d34"),
    uBaseColor: new Color("#90d64b"),
    uTipColor2: new Color("#b2b418"),
    uBaseColor2: new Color("#365517"),
    uGrassMap: null as Texture | null,
    uGrassMapWorldSize: GRASS_MAP_WORLD_SIZE,
  },
  vertexShader,
  fragmentShader,
);

export function createGrassMaterial(
  grassSegments: number,
  grassMapTexture: Texture | null,
) {
  const material = new GrassMaterial();
  material.uniforms.uTime = grassTimeUniform;
  material.uniforms.grassParams.value.set(
    grassSegments,
    0,
    GRASS_WIDTH,
    GRASS_HEIGHT,
  );
  material.uniforms.uGrassMap.value = grassMapTexture;

  return material;
}
