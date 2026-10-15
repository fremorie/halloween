import { useControls } from "leva";

import type { EyeParams } from "@/types/eye";

export function useEyeControls(): EyeParams {
  return useControls("Eyes", {
    pupilRadius: { value: 0.8, min: 0, max: 2, step: 0.01 },
    highlightColor: "#ffffff",
    highlightSize: { value: 0.45, min: 0, max: 1, step: 0.01 },
  });
}
