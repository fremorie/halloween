import { useMemo } from "react";
import { FrontSide } from "three";

import type { BranchSegment } from "@/utils/graph/getBranchInstanceMatrices";
import { getBranchInstanceMatrices } from "@/utils/graph/getBranchInstanceMatrices";
import { useBranchGLTF } from "./useBranchGLTF";
import { useBranchThreading } from "./useBranchThreading";
import { useInstanceMatrices } from "./useInstanceMatrices";
import { useLeafMaterial } from "./useLeafMaterial";

type Props = {
  branchSegments: BranchSegment[];
  tuckDistance: number;
  edgeThreading: boolean[];
};

export function InstancedBranches({
  branchSegments,
  tuckDistance,
  edgeThreading,
}: Props) {
  const { nodes, materials } = useBranchGLTF();
  const leafNodes = useMemo(
    () => [nodes.Leaf001, nodes.Leaf002, nodes.Leaf003, nodes.Leaf004],
    [nodes],
  );
  const { stemMatrices, leafMatrices } = useMemo(
    () => getBranchInstanceMatrices(branchSegments, tuckDistance, leafNodes),
    [branchSegments, tuckDistance, leafNodes],
  );

  const stemInstancesRef = useInstanceMatrices(stemMatrices);
  const leafInstancesRef = useInstanceMatrices(leafMatrices);
  const leafMaterial = useLeafMaterial(materials.Leaf);
  useBranchThreading(
    stemInstancesRef,
    leafInstancesRef,
    edgeThreading,
    leafNodes.length,
    materials.Leaf.color,
  );

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
