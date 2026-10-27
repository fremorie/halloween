import { useEffect, useMemo } from "react";
import { CylinderGeometry } from "three";

import {
  YARN_STRAND_LENGTH_SEGMENTS,
  YARN_STRAND_RADIAL_SEGMENTS,
} from "@/settings/puzzleSettings";

export function useYarnStrandGeometry() {
  const yarnStrandGeometry = useMemo(
    () =>
      new CylinderGeometry(
        1,
        1,
        1,
        YARN_STRAND_RADIAL_SEGMENTS,
        YARN_STRAND_LENGTH_SEGMENTS,
      )
        .rotateZ(-Math.PI / 2)
        .translate(0.5, 0, 0),
    [],
  );

  useEffect(() => () => yarnStrandGeometry.dispose(), [yarnStrandGeometry]);

  return yarnStrandGeometry;
}
