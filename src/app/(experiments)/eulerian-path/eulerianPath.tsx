import { YarnBallModel } from "@/components/models/yarnBall/yarnBallModel";
import { useYarnMaterials } from "@/components/models/yarnBall/materials";
import { NODE_SCALE } from "@/settings/graphSettings";
import { getGroundedGraph } from "@/utils/graph";
import { hat } from "@/data/levels";
import { InstancedBranches } from "@/components/models/branch/instancedBranches";

const level = getGroundedGraph(hat);

const allThreaded = level.edges.map(() => true);
const allThreadedFromStart = level.edges.map((edge) => edge.a);

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
        graph={level}
        edgeThreading={allThreaded}
        edgeThreadStartNodeIds={allThreadedFromStart}
      />
    </>
  );
}
