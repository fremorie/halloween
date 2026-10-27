import { shaderMaterial } from "@react-three/drei";
import { Color, Uniform, UniformsLib, UniformsUtils } from "three";

import {
  YARN_STRAND_RADIUS,
  YARN_TURNS_PER_UNIT_LENGTH,
  YARN_WRAP_RADIUS,
} from "@/settings/puzzleSettings";
import fragmentShader from "@/shaders/yarn/fragment.glsl";
import vertexShader from "@/shaders/yarn/vertex.glsl";

export const yarnColorUniform = new Uniform(new Color("red"));
export const yarnWrapRadiusUniform = new Uniform(YARN_WRAP_RADIUS);
export const yarnStrandRadiusUniform = new Uniform(YARN_STRAND_RADIUS);
export const yarnTurnsPerUnitLengthUniform = new Uniform(
  YARN_TURNS_PER_UNIT_LENGTH,
);

const YarnMaterial = shaderMaterial(
  {
    uYarnColor: new Color(),
    uWrapRadius: 0,
    uStrandRadius: 0,
    uTurnsPerUnitLength: 0,
  },
  vertexShader,
  fragmentShader,
);

export function createYarnMaterial() {
  const material = new YarnMaterial();

  Object.assign(material.uniforms, UniformsUtils.clone(UniformsLib.fog));
  material.fog = true;

  material.uniforms.uYarnColor = yarnColorUniform;
  material.uniforms.uWrapRadius = yarnWrapRadiusUniform;
  material.uniforms.uStrandRadius = yarnStrandRadiusUniform;
  material.uniforms.uTurnsPerUnitLength = yarnTurnsPerUnitLengthUniform;

  return material;
}
