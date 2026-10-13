import { useLayoutEffect, useMemo, useRef } from "react";
import * as THREE from "three";

import type { BranchSegment } from "@/utils/graph/getBranchInstanceMatrices";
import { getBranchInstanceMatrices } from "@/utils/graph/getBranchInstanceMatrices";
import { useBranchGLTF } from "./useBranchGLTF";
import { applyInstanceMatrices } from "@/utils/instances/applyInstanceMatrices";

type Props = {
  branchSegments: BranchSegment[];
  tuckDistance: number;
};

export function InstancedBranches({ branchSegments, tuckDistance }: Props) {
  const { nodes, materials } = useBranchGLTF();
  const stemInstancesRef = useRef<THREE.InstancedMesh>(null);
  const leafInstancesRef = useRef<THREE.InstancedMesh>(null);

  const leafNodes = useMemo(
    () => [nodes.Leaf001, nodes.Leaf002, nodes.Leaf003, nodes.Leaf004],
    [nodes],
  );

  const { stemMatrices, leafMatrices } = useMemo(
    () => getBranchInstanceMatrices(branchSegments, tuckDistance, leafNodes),
    [branchSegments, tuckDistance, leafNodes],
  );

  useLayoutEffect(() => {
    applyInstanceMatrices(stemInstancesRef.current, stemMatrices);
    applyInstanceMatrices(leafInstancesRef.current, leafMatrices);
  }, [stemMatrices, leafMatrices]);

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
      />
      <instancedMesh
        key={`leaves-${leafMatrices.length}`}
        ref={leafInstancesRef}
        args={[leafNodes[0].geometry, materials.Leaf, leafMatrices.length]}
        castShadow
        receiveShadow
      />
    </>
  );
}
