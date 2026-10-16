import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { useMemo, useState, type RefObject } from "react";
import { Color, type InstancedMesh } from "three";

import {
  BRANCH_THREAD_DURATION,
  UNTHREADED_BRANCH_TINT,
} from "@/settings/puzzleSettings";
import { toGrayscale } from "@/utils/color";
import { paintInstanceColors } from "@/utils/instances";

const UNTHREADED_TINT = new Color(UNTHREADED_BRANCH_TINT);

function getUnthreadedColor(threadedColor: Color) {
  return toGrayscale(threadedColor).multiply(UNTHREADED_TINT);
}

type Options = {
  stemInstancesRef: RefObject<InstancedMesh | null>;
  leafInstancesRef: RefObject<InstancedMesh | null>;
  edgeThreading: boolean[];
  leavesPerEdge: number;
  threadedStemColor: Color;
  threadedLeafColor: Color;
};

export function useBranchThreading({
  stemInstancesRef,
  leafInstancesRef,
  edgeThreading,
  leavesPerEdge,
  threadedStemColor,
  threadedLeafColor,
}: Options) {
  const edgeCount = edgeThreading.length;
  const edgeProgresses = useMemo(
    () => Array.from({ length: edgeCount }, () => ({ progress: 0 })),
    [edgeCount],
  );
  const [colors] = useState(() => ({
    unthreadedStem: getUnthreadedColor(threadedStemColor),
    unthreadedLeaf: getUnthreadedColor(threadedLeafColor),
    scratch: new Color(),
  }));

  const paintThreading = (
    instances: InstancedMesh,
    unthreadedColor: Color,
    threadedColor: Color,
    edgeOfInstance: (instanceIndex: number) => number,
  ) =>
    paintInstanceColors(instances, (instanceIndex) =>
      colors.scratch
        .copy(unthreadedColor)
        .lerp(
          threadedColor,
          edgeProgresses[edgeOfInstance(instanceIndex)].progress,
        ),
    );

  const paintBranches = () => {
    const stems = stemInstancesRef.current;
    const leaves = leafInstancesRef.current;
    if (!stems || !leaves) return;

    paintThreading(
      stems,
      colors.unthreadedStem,
      threadedStemColor,
      (edgeIndex) => edgeIndex,
    );
    paintThreading(
      leaves,
      colors.unthreadedLeaf,
      threadedLeafColor,
      (leafIndex) => Math.floor(leafIndex / leavesPerEdge),
    );
  };

  useGSAP(() => {
    paintBranches();
    gsap.to(edgeProgresses, {
      progress: (edgeIndex: number) => (edgeThreading[edgeIndex] ? 1 : 0),
      duration: BRANCH_THREAD_DURATION,
      ease: "none",
      overwrite: "auto",
      onUpdate: paintBranches,
    });
  }, [edgeThreading, edgeProgresses]);
}
