import { useEffect, useMemo } from "react";
import { CylinderGeometry, InstancedBufferAttribute } from "three";

import {
  YARN_STRAND_LENGTH_SEGMENTS,
  YARN_STRAND_RADIAL_SEGMENTS,
} from "@/settings/puzzleSettings";

export function useYarnStrandGeometry(instanceCount: number) {
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
        .translate(0.5, 0, 0)
        .setAttribute(
          "aWrapProgress",
          new InstancedBufferAttribute(new Float32Array(instanceCount), 1),
        ),
    [instanceCount],
  );

  useEffect(() => () => yarnStrandGeometry.dispose(), [yarnStrandGeometry]);

  return yarnStrandGeometry;
}
