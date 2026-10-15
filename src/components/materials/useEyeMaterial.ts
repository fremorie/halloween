import { useEffect, useMemo } from "react";
import type { Texture } from "three";

import type { EyeParams } from "@/types/eye";
import { createEyeMaterial } from "./eyeMaterial";

export function useEyeMaterial(
  irisTexture: Texture | null,
  eyeParams: EyeParams = {},
) {
  const { pupilRadius, highlightColor, highlightSize } = eyeParams;

  const material = useMemo(
    () =>
      createEyeMaterial({
        irisTexture,
        pupilRadius,
        highlightColor,
        highlightSize,
      }),
    [irisTexture, pupilRadius, highlightColor, highlightSize],
  );

  useEffect(() => () => material.dispose(), [material]);

  return material;
}
