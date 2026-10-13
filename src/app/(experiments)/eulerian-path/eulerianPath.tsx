import { YarnBallModel } from "@/components/models/yarnBall/yarnBallModel";
import { useYarnMaterials } from "@/components/models/yarnBall/materials";
import { NODE_RADIUS, NODE_SCALE } from "@/settings/graphSettings";
import { getGroundedGraph } from "@/utils/graph/getGroundedGraph";
import { hat } from "@/data/levels";
import { InstancedBranches } from "@/components/models/branch/instancedBranches";

const level = getGroundedGraph(hat);

const branchSegments = level.edges.map((edge) => ({
  from: level.nodes[edge.a].position,
  to: level.nodes[edge.b].position,
}));

export function EulerianPath() {
  const yarnMaterials = useYarnMaterials();

  return (
    <>
      {level.nodes.map((node) => {
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
    </>
  );
}
