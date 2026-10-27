import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { useMemo, useState } from "react";
import {
  Color,
  type BufferGeometry,
  type InstancedBufferAttribute,
} from "three";

import { YARN_WRAP_DURATION, YARN_WRAP_EASE } from "@/settings/puzzleSettings";
import type { GraphEdge } from "@/types/graph";
import { getNodeYarnColor } from "@/utils/puzzle";

export function useYarnWrapping(
  yarnStrandGeometry: BufferGeometry,
  edges: GraphEdge[],
  edgeThreadStartNodeIds: (number | null)[],
) {
  const edgeCount = edges.length;
  const edgeWrapProgresses = useMemo(
    () => Array.from({ length: edgeCount }, () => ({ progress: 0 })),
    [edgeCount],
  );
  const [scratchYarnColor] = useState(() => new Color());

  useGSAP(() => {
    const wrapProgressAttribute = yarnStrandGeometry.getAttribute(
      "aWrapProgress",
    ) as InstancedBufferAttribute;
    const wrapsFromEndAttribute = yarnStrandGeometry.getAttribute(
      "aWrapsFromEnd",
    ) as InstancedBufferAttribute;
    const yarnColorAttribute = yarnStrandGeometry.getAttribute(
      "aYarnColor",
    ) as InstancedBufferAttribute;

    edgeThreadStartNodeIds.forEach((startNodeId, edgeIndex) => {
      if (startNodeId === null) return;

      const wrapsFromEnd = startNodeId === edges[edgeIndex].b;
      wrapsFromEndAttribute.setX(edgeIndex, wrapsFromEnd ? 1 : 0);

      scratchYarnColor.set(getNodeYarnColor(startNodeId));
      yarnColorAttribute.setXYZ(
        edgeIndex,
        scratchYarnColor.r,
        scratchYarnColor.g,
        scratchYarnColor.b,
      );
    });
    wrapsFromEndAttribute.needsUpdate = true;
    yarnColorAttribute.needsUpdate = true;

    const writeWrapProgresses = () => {
      edgeWrapProgresses.forEach(({ progress }, edgeIndex) =>
        wrapProgressAttribute.setX(edgeIndex, progress),
      );
      wrapProgressAttribute.needsUpdate = true;
    };

    gsap.to(edgeWrapProgresses, {
      progress: (edgeIndex: number) =>
        edgeThreadStartNodeIds[edgeIndex] === null ? 0 : 1,
      duration: YARN_WRAP_DURATION,
      ease: YARN_WRAP_EASE,
      overwrite: "auto",
      onUpdate: writeWrapProgresses,
    });
  }, [edges, edgeThreadStartNodeIds, edgeWrapProgresses, yarnStrandGeometry]);
}
