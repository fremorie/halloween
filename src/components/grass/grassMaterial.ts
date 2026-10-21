import { shaderMaterial } from "@react-three/drei";
import {
  Color,
  Texture,
  Uniform,
  UniformsLib,
  UniformsUtils,
  Vector2,
  Vector4,
} from "three";

import {
  TRAIL_AREA_SIZE,
  TRAIL_FLATTEN,
  TRAIL_PUSH,
} from "@/settings/grassTrailSettings";
import fragmentShader from "@/shaders/grass/fragment.glsl";
import vertexShader from "@/shaders/grass/vertex.glsl";

import { GRASS_MAP_WORLD_SIZE } from "./utils";

const GRASS_WIDTH = 0.1;
const GRASS_HEIGHT = 0.6;

export const grassTimeUniform = new Uniform(0);
export const grassTrailMapUniform = new Uniform<Texture | null>(null);
export const grassTrailCenterUniform = new Uniform(new Vector2());

const GrassMaterial = shaderMaterial(
  {
    uTime: 0,
    grassParams: new Vector4(),
    uTipColor: new Color(),
    uBaseColor: new Color(),
    uTipColor2: new Color(),
    uBaseColor2: new Color(),
    uHemiSkyColor: new Color(),
    uHemiGroundColor: new Color(),
    uGrassMap: null as Texture | null,
    uGrassMapWorldSize: GRASS_MAP_WORLD_SIZE,
    uTrailSize: TRAIL_AREA_SIZE,
    uTrailPush: TRAIL_PUSH,
    uTrailFlatten: TRAIL_FLATTEN,
  },
  vertexShader,
  fragmentShader,
);

export function createGrassMaterial(
  grassSegments: number,
  grassMapTexture: Texture | null,
) {
  const material = new GrassMaterial();
  Object.assign(material.uniforms, UniformsUtils.clone(UniformsLib.fog));
  material.fog = true;
  material.uniforms.uTime = grassTimeUniform;
  material.uniforms.uTrailMap = grassTrailMapUniform;
  material.uniforms.uTrailCenter = grassTrailCenterUniform;
  material.uniforms.grassParams.value.set(
    grassSegments,
    0,
    GRASS_WIDTH,
    GRASS_HEIGHT,
  );
  material.uniforms.uGrassMap.value = grassMapTexture;

  return material;
}
