import { useControls } from "leva";
import { useEffect } from "react";

import { patchworkStitchProgressUniform } from "./patchworkMaterial";

export function usePatchworkControls() {
  const { stitchProgress } = useControls({
    stitchProgress: { value: 1, min: 0, max: 1, step: 0.01 },
  });

  useEffect(() => {
    patchworkStitchProgressUniform.value = stitchProgress;
  }, [stitchProgress]);
}
