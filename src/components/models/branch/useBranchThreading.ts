import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { useMemo, useState, type RefObject } from "react";
import { Color, type InstancedMesh } from "three";

import {
  BRANCH_THREAD_DURATION,
  UNTHREADED_BRANCH_TINT,
} from "@/settings/puzzleSettings";
import { toGrayscale } from "@/utils/color/toGrayscale";
import { paintInstanceColors } from "@/utils/instances/paintInstanceColors";

const FULL_TINT = new Color("#ffffff");
const UNTHREADED_TINT = new Color(UNTHREADED_BRANCH_TINT);

type Options = {
  stemInstancesRef: RefObject<InstancedMesh | null>;
  leafInstancesRef: RefObject<InstancedMesh | null>;
  edgeThreading: boolean[];
  leavesPerEdge: number;
  threadedLeafColor: Color;
};

export function useBranchThreading({
  stemInstancesRef,
  leafInstancesRef,
  edgeThreading,
  leavesPerEdge,
  threadedLeafColor,
}: Options) {
  const edgeCount = edgeThreading.length;
  const edgeProgresses = useMemo(
    () => Array.from({ length: edgeCount }, () => ({ progress: 0 })),
    [edgeCount],
  );
  const [colors] = useState(() => ({
    unthreadedLeaf: toGrayscale(threadedLeafColor),
    stem: new Color(),
    leaf: new Color(),
  }));

  const paintBranches = () => {
    const stems = stemInstancesRef.current;
    const leaves = leafInstancesRef.current;
    if (!stems || !leaves) return;

    const progressOfEdge = (edgeIndex: number) =>
      edgeProgresses[edgeIndex].progress;
    const edgeOfLeaf = (leafIndex: number) =>
      Math.floor(leafIndex / leavesPerEdge);

    paintInstanceColors(stems, (edgeIndex) =>
      colors.stem
        .copy(UNTHREADED_TINT)
        .lerp(FULL_TINT, progressOfEdge(edgeIndex)),
    );
    paintInstanceColors(leaves, (leafIndex) =>
      colors.leaf
        .copy(colors.unthreadedLeaf)
        .lerp(threadedLeafColor, progressOfEdge(edgeOfLeaf(leafIndex))),
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
