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
  YARN_GROUND_LIGHT,
  YARN_PLY_COUNT,
  YARN_PLY_GROOVE_DARKNESS,
  YARN_PLY_TWISTS_PER_UNIT_LENGTH,
  YARN_SKY_LIGHT,
  YARN_STRAND_RADIUS,
  YARN_SUN_STRENGTH,
  YARN_TURNS_PER_UNIT_LENGTH,
  YARN_WRAP_GAP,
} from "@/settings/puzzleSettings";
import { STEM_PROFILE } from "@/components/models/branch/constants";
import { SUN_LIGHT_SETTINGS } from "@/settings/lightSettings";
import fragmentShader from "@/shaders/yarn/fragment.glsl";
import vertexShader from "@/shaders/yarn/vertex.glsl";

export const yarnUniforms = {
  uWrapGap: new Uniform(YARN_WRAP_GAP),
  uStrandRadius: new Uniform(YARN_STRAND_RADIUS),
  uTurnsPerUnitLength: new Uniform(YARN_TURNS_PER_UNIT_LENGTH),
  uPlyCount: new Uniform(YARN_PLY_COUNT),
  uPlyTwistsPerUnitLength: new Uniform(YARN_PLY_TWISTS_PER_UNIT_LENGTH),
  uPlyGrooveDarkness: new Uniform(YARN_PLY_GROOVE_DARKNESS),
  uSkyLight: new Uniform(new Color(YARN_SKY_LIGHT)),
  uGroundLight: new Uniform(new Color(YARN_GROUND_LIGHT)),
  uSunStrength: new Uniform(YARN_SUN_STRENGTH),
  uSunDirection: new Uniform(
    new Vector3(...SUN_LIGHT_SETTINGS.offsetFromTarget).normalize(),
  ),
  uStemProfile: new Uniform(
    STEM_PROFILE.map(
      ([centerY, centerZ, radius]) => new Vector3(centerY, centerZ, radius),
    ),
  ),
};

const YarnMaterial = shaderMaterial({}, vertexShader, fragmentShader);

export function createYarnMaterial() {
  const material = new YarnMaterial();

  Object.assign(
    material.uniforms,
    UniformsUtils.clone(UniformsLib.fog),
    yarnUniforms,
  );
  material.fog = true;
  material.side = DoubleSide;
  material.defines.STEM_PROFILE_SAMPLE_COUNT = STEM_PROFILE.length;

  return material;
}
