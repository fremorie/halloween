import { useEffect, useMemo } from "react";
import type { BufferGeometry } from "three";

import type { LanternFaceParams } from "@/types/lantern";
import { createLanternFaceMaterial } from "./lanternFaceMaterial";

export function useLanternFaceMaterial(
  faceGeometry: BufferGeometry,
  faceParams: LanternFaceParams,
) {
  const { emberColor, glowColor, glowIntensity, flickerSeed } = faceParams;

  const material = useMemo(
    () =>
      createLanternFaceMaterial({
        faceGeometry,
        emberColor,
        glowColor,
        glowIntensity,
        flickerSeed,
      }),
    [faceGeometry, emberColor, glowColor, glowIntensity, flickerSeed],
  );

  useEffect(() => () => material.dispose(), [material]);

  return material;
}
