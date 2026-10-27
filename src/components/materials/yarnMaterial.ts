import { shaderMaterial } from "@react-three/drei";
import {
  Color,
  Uniform,
  UniformsLib,
  UniformsUtils,
  Vector3,
  DoubleSide,
} from "three";

import {
  YARN_STRAND_RADIUS,
  YARN_TURNS_PER_UNIT_LENGTH,
  YARN_WRAP_GAP,
} from "@/settings/puzzleSettings";
import { STEM_PROFILE } from "@/components/models/branch/constants";
import { YARN_PALETTE } from "@/settings/yarnPalette";
import { SUN_LIGHT_SETTINGS } from "@/settings/lightSettings";
import fragmentShader from "@/shaders/yarn/fragment.glsl";
import vertexShader from "@/shaders/yarn/vertex.glsl";

export const yarnColorUniform = new Uniform(new Color(YARN_PALETTE[1]));
export const yarnWrapGapUniform = new Uniform(YARN_WRAP_GAP);
export const yarnStrandRadiusUniform = new Uniform(YARN_STRAND_RADIUS);
export const yarnTurnsPerUnitLengthUniform = new Uniform(
  YARN_TURNS_PER_UNIT_LENGTH,
);
const stemProfileUniform = new Uniform(
  STEM_PROFILE.map(
    ([centerY, centerZ, radius]) => new Vector3(centerY, centerZ, radius),
  ),
);
const sunDirectionUniform = new Uniform(
  new Vector3(...SUN_LIGHT_SETTINGS.offsetFromTarget).normalize(),
);

const YarnMaterial = shaderMaterial(
  {
    uYarnColor: new Color(),
    uWrapGap: 0,
    uStrandRadius: 0,
    uTurnsPerUnitLength: 0,
    uStemProfile: [],
    uSunDirection: new Vector3(),
  },
  vertexShader,
  fragmentShader,
);

export function createYarnMaterial() {
  const material = new YarnMaterial();

  Object.assign(material.uniforms, UniformsUtils.clone(UniformsLib.fog));
  material.fog = true;

  material.defines.STEM_PROFILE_SAMPLE_COUNT = STEM_PROFILE.length;

  material.uniforms.uYarnColor = yarnColorUniform;
  material.uniforms.uWrapGap = yarnWrapGapUniform;
  material.uniforms.uStrandRadius = yarnStrandRadiusUniform;
  material.uniforms.uTurnsPerUnitLength = yarnTurnsPerUnitLengthUniform;
  material.uniforms.uStemProfile = stemProfileUniform;
  material.side = DoubleSide;
  material.uniforms.uSunDirection = sunDirectionUniform;

  return material;
}
