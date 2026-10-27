import { useControls } from "leva";
import { useLayoutEffect } from "react";

import {
  YARN_COLOR,
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
import { yarnUniforms } from "./yarnMaterial";

export function useYarnControls() {
  const {
    yarnColor,
    wrapGap,
    strandRadius,
    turnsPerUnitLength,
    plyCount,
    plyTwistsPerUnitLength,
    plyGrooveDarkness,
    skyLight,
    groundLight,
    sunStrength,
  } = useControls("Yarn", {
    yarnColor: YARN_COLOR,
    wrapGap: { value: YARN_WRAP_GAP, min: -0.03, max: 0.05, step: 0.002 },
    strandRadius: {
      value: YARN_STRAND_RADIUS,
      min: 0.01,
      max: 0.08,
      step: 0.002,
    },
    turnsPerUnitLength: {
      value: YARN_TURNS_PER_UNIT_LENGTH,
      min: 2,
      max: 20,
      step: 0.5,
    },
    plyCount: { value: YARN_PLY_COUNT, min: 1, max: 6, step: 1 },
    plyTwistsPerUnitLength: {
      value: YARN_PLY_TWISTS_PER_UNIT_LENGTH,
      min: 0,
      max: 30,
      step: 0.5,
    },
    plyGrooveDarkness: {
      value: YARN_PLY_GROOVE_DARKNESS,
      min: 0,
      max: 1,
      step: 0.05,
    },
    skyLight: YARN_SKY_LIGHT,
    groundLight: YARN_GROUND_LIGHT,
    sunStrength: { value: YARN_SUN_STRENGTH, min: 0, max: 2, step: 0.05 },
  });

  useLayoutEffect(() => {
    yarnUniforms.uYarnColor.value.set(yarnColor);
    yarnUniforms.uWrapGap.value = wrapGap;
    yarnUniforms.uStrandRadius.value = strandRadius;
    yarnUniforms.uTurnsPerUnitLength.value = turnsPerUnitLength;
    yarnUniforms.uPlyCount.value = plyCount;
    yarnUniforms.uPlyTwistsPerUnitLength.value = plyTwistsPerUnitLength;
    yarnUniforms.uPlyGrooveDarkness.value = plyGrooveDarkness;
    yarnUniforms.uSkyLight.value.set(skyLight);
    yarnUniforms.uGroundLight.value.set(groundLight);
    yarnUniforms.uSunStrength.value = sunStrength;
  }, [
    yarnColor,
    wrapGap,
    strandRadius,
    turnsPerUnitLength,
    plyCount,
    plyTwistsPerUnitLength,
    plyGrooveDarkness,
    skyLight,
    groundLight,
    sunStrength,
  ]);
}
