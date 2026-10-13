import { useControls } from "leva";

import type { LanternFaceParams } from "@/types/lantern";

export function useLanternControls(): LanternFaceParams {
  return useControls("Lantern", {
    emberColor: "#c96e52",
    glowColor: "#ffb648",
    glowIntensity: { value: 1.5, min: 0, max: 4, step: 0.1 },
    flickerSeed: { value: 0, min: 0, max: 100, step: 1 },
  });
}
