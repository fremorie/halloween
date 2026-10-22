import { useControls } from "leva";
import { useEffect } from "react";

import { patchworkRowCountUniform } from "./patchworkMaterial";

export function usePatchworkControls() {
  const { rowCount } = useControls({
    rowCount: { value: 8, min: 2, max: 30, step: 1 },
  });

  useEffect(() => {
    patchworkRowCountUniform.value = rowCount;
  }, [rowCount]);
}
