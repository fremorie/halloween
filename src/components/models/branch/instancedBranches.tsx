import { useMemo } from "react";
import { FrontSide } from "three";

import { BRANCH_TUCK_DISTANCE } from "@/settings/graphSettings";
import type { Graph } from "@/types/graph";
import {
  getBranchInstanceMatrices,
  getBranchSegments,
  getBranchThickness,
} from "@/utils/graph";
import { useBranchGLTF } from "./useBranchGLTF";
import { useBranchThreading } from "./useBranchThreading";
import { useInstanceMatrices } from "./useInstanceMatrices";
import { useLeafMaterial } from "./useLeafMaterial";
import { YarnWrap } from "./yarnWrap";

type Props = {
  graph: Graph;
  edgeThreading: boolean[];
};

export function InstancedBranches({ graph, edgeThreading }: Props) {
  const { nodes, materials } = useBranchGLTF();
  const leafNodes = useMemo(
    () => [nodes.Leaf001, nodes.Leaf002, nodes.Leaf003, nodes.Leaf004],
    [nodes],
  );
  const branchThickness = getBranchThickness();
  const { stemMatrices, leafMatrices } = useMemo(
    () =>
      getBranchInstanceMatrices(
        getBranchSegments(graph),
        BRANCH_TUCK_DISTANCE,
        branchThickness,
        leafNodes,
      ),
    [graph, branchThickness, leafNodes],
  );

  const stemInstancesRef = useInstanceMatrices(stemMatrices);
  const leafInstancesRef = useInstanceMatrices(leafMatrices);
  const leafMaterial = useLeafMaterial(materials.Leaf);
  useBranchThreading({
    stemInstancesRef,
    leafInstancesRef,
    edgeThreading,
    leavesPerEdge: leafNodes.length,
    threadedStemColor: materials["branch.001"].color,
    threadedLeafColor: materials.Leaf.color,
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
      <YarnWrap stemMatrices={stemMatrices} edgeThreading={edgeThreading} />
    </>
  );
}
