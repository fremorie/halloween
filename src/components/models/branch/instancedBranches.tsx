import { useEffect, useLayoutEffect, useMemo, useRef } from "react";
import { Color, FrontSide, type InstancedMesh, MathUtils } from "three";
import { useFrame } from "@react-three/fiber";

import {
  BRANCH_THREAD_DURATION,
  UNTHREADED_BRANCH_TINT,
} from "@/settings/puzzleSettings";
import type { EdgeThreading } from "@/types/puzzle";
import type { BranchSegment } from "@/utils/graph/getBranchInstanceMatrices";
import { getBranchInstanceMatrices } from "@/utils/graph/getBranchInstanceMatrices";
import { applyInstanceMatrices } from "@/utils/instances/applyInstanceMatrices";
import { useBranchGLTF } from "./useBranchGLTF";

const FULL_TINT = new Color("#ffffff");

type Props = {
  branchSegments: BranchSegment[];
  tuckDistance: number;
  edgeThreading?: EdgeThreading[];
};

export function InstancedBranches({
  branchSegments,
  tuckDistance,
  edgeThreading,
}: Props) {
  const { nodes, materials } = useBranchGLTF();
  const stemInstancesRef = useRef<InstancedMesh>(null);
  const leafInstancesRef = useRef<InstancedMesh>(null);

  const leafNodes = useMemo(
    () => [nodes.Leaf001, nodes.Leaf002, nodes.Leaf003, nodes.Leaf004],
    [nodes],
  );

  const { stemMatrices, leafMatrices } = useMemo(
    () => getBranchInstanceMatrices(branchSegments, tuckDistance, leafNodes),
    [branchSegments, tuckDistance, leafNodes],
  );

  const leafMaterial = useMemo(() => {
    const material = materials.Leaf.clone();
    material.color.set("#ffffff");
    return material;
  }, [materials.Leaf]);

  useEffect(() => () => leafMaterial.dispose(), [leafMaterial]);

  const leafColors = useMemo(() => {
    const threaded = materials.Leaf.color.clone();
    const luminance =
      0.299 * threaded.r + 0.587 * threaded.g + 0.114 * threaded.b;
    return { threaded, unthreaded: new Color().setScalar(luminance) };
  }, [materials.Leaf]);

  const threadingRef = useRef({
    progressByEdge: [] as number[],
    unthreadedTint: new Color(UNTHREADED_BRANCH_TINT),
    stemColor: new Color(),
    leafColor: new Color(),
  });

  useLayoutEffect(() => {
    applyInstanceMatrices(stemInstancesRef.current, stemMatrices);
    applyInstanceMatrices(leafInstancesRef.current, leafMatrices);
  }, [stemMatrices, leafMatrices]);

  useFrame((_, delta) => {
    const stems = stemInstancesRef.current;
    const leaves = leafInstancesRef.current;
    if (!stems || !leaves) return;

    const threading = threadingRef.current;
    const progressStep = delta / BRANCH_THREAD_DURATION;

    for (let edgeIndex = 0; edgeIndex < stemMatrices.length; edgeIndex += 1) {
      const isThreaded = edgeThreading?.[edgeIndex]?.isThreaded ?? true;
      const previousProgress = threading.progressByEdge[edgeIndex] ?? 0;
      const progress = MathUtils.clamp(
        previousProgress + (isThreaded ? progressStep : -progressStep),
        0,
        1,
      );
      threading.progressByEdge[edgeIndex] = progress;

      threading.stemColor
        .copy(threading.unthreadedTint)
        .lerp(FULL_TINT, progress);
      stems.setColorAt(edgeIndex, threading.stemColor);

      threading.leafColor
        .copy(leafColors.unthreaded)
        .lerp(leafColors.threaded, progress);
      for (let leafIndex = 0; leafIndex < leafNodes.length; leafIndex += 1) {
        leaves.setColorAt(
          edgeIndex * leafNodes.length + leafIndex,
          threading.leafColor,
        );
      }
    }

    if (stems.instanceColor) stems.instanceColor.needsUpdate = true;
    if (leaves.instanceColor) leaves.instanceColor.needsUpdate = true;
  });

  return (
    <>
      <instancedMesh
        key={`stems-${stemMatrices.length}`}
        ref={stemInstancesRef}
        args={[
          nodes.Branch.geometry,
          materials["branch.001"],
          stemMatrices.length,
        ]}
        castShadow
        receiveShadow
        material-shadowSide={FrontSide}
      />
      <instancedMesh
        key={`leaves-${leafMatrices.length}`}
        ref={leafInstancesRef}
        args={[leafNodes[0].geometry, leafMaterial, leafMatrices.length]}
        castShadow
        receiveShadow
        material-shadowSide={FrontSide}
      />
    </>
  );
}
