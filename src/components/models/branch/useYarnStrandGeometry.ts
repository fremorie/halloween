import { useEffect, useMemo } from "react";
import { CylinderGeometry } from "three";

import {
  YARN_STRAND_LENGTH_SEGMENTS,
  YARN_STRAND_RADIAL_SEGMENTS,
  YARN_STRAND_RADIUS,
  YARN_WRAP_RADIUS,
} from "@/settings/puzzleSettings";

export function useYarnStrandGeometry() {
  const yarnStrandGeometry = useMemo(
    () =>
      new CylinderGeometry(
        YARN_STRAND_RADIUS,
        YARN_STRAND_RADIUS,
        1,
        YARN_STRAND_RADIAL_SEGMENTS,
        YARN_STRAND_LENGTH_SEGMENTS,
      )
        .rotateZ(-Math.PI / 2)
        .translate(0.5, YARN_WRAP_RADIUS, 0),
    [],
  );

  useEffect(() => () => yarnStrandGeometry.dispose(), [yarnStrandGeometry]);

  return yarnStrandGeometry;
}
