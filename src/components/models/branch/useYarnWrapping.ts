import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { useMemo } from "react";
import type { BufferGeometry, InstancedBufferAttribute } from "three";

import { YARN_WRAP_DURATION, YARN_WRAP_EASE } from "@/settings/puzzleSettings";

export function useYarnWrapping(
  yarnStrandGeometry: BufferGeometry,
  edgeThreading: boolean[],
) {
  const edgeCount = edgeThreading.length;
  const edgeWrapProgresses = useMemo(
    () => Array.from({ length: edgeCount }, () => ({ progress: 0 })),
    [edgeCount],
  );

  useGSAP(() => {
    const wrapProgressAttribute = yarnStrandGeometry.getAttribute(
      "aWrapProgress",
    ) as InstancedBufferAttribute;

    const writeWrapProgresses = () => {
      edgeWrapProgresses.forEach(({ progress }, edgeIndex) =>
        wrapProgressAttribute.setX(edgeIndex, progress),
      );
      wrapProgressAttribute.needsUpdate = true;
    };

    gsap.to(edgeWrapProgresses, {
      progress: (edgeIndex: number) => (edgeThreading[edgeIndex] ? 1 : 0),
      duration: YARN_WRAP_DURATION,
      ease: YARN_WRAP_EASE,
      overwrite: "auto",
      onUpdate: writeWrapProgresses,
    });
  }, [edgeThreading, edgeWrapProgresses, yarnStrandGeometry]);
}
