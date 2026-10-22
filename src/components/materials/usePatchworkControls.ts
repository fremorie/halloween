import { useControls } from "leva";
import { useEffect } from "react";

import {
  patchworkRowCountUniform,
  patchworkStitchProgressUniform,
} from "./patchworkMaterial";

export function usePatchworkControls() {
  const { stitchProgress, rowCount } = useControls({
    stitchProgress: { value: 1, min: 0, max: 1, step: 0.01 },
    rowCount: { value: 8, min: 2, max: 30, step: 1 },
  });

  useEffect(() => {
    patchworkStitchProgressUniform.value = stitchProgress;
  }, [stitchProgress]);

  useEffect(() => {
    patchworkRowCountUniform.value = rowCount;
  }, [rowCount]);
}
