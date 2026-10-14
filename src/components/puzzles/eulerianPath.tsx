import { useMemo } from "react";

import { YarnBallModel } from "@/components/models/yarnBall/yarnBallModel";
import { useYarnMaterials } from "@/components/models/yarnBall/materials";
import { NODE_RADIUS, NODE_SCALE } from "@/settings/graphSettings";
import { InstancedBranches } from "@/components/models/branch/instancedBranches";
import type { Graph } from "@/types/graph";
import type { Vec3 } from "@/types/math";
import { DragLine } from "./dragLine";

const THREAD_TEST_POINT: Vec3 = [0, 2.5, 1];

type Props = {
  graph: Graph;
};

export function EulerianPath({ graph }: Props) {
  const yarnMaterials = useYarnMaterials();

  const branchSegments = useMemo(
    () =>
      graph.edges.map((edge) => ({
        from: graph.nodes[edge.a].position,
        to: graph.nodes[edge.b].position,
      })),
    [graph],
  );

  return (
    <group>
      {graph.nodes.map((node) => {
        const materialIndex = node.id % yarnMaterials.length;

        return (
          <YarnBallModel
            key={node.id}
            position={node.position}
            rotationY={node.id * 1.7}
            material={yarnMaterials[materialIndex]}
            scale={NODE_SCALE}
          />
        );
      })}

      <InstancedBranches
        branchSegments={branchSegments}
        tuckDistance={NODE_RADIUS * 0.8}
      />

      <DragLine graph={graph} currentNodeId={0} toPoint={THREAD_TEST_POINT} />
    </group>
  );
}
