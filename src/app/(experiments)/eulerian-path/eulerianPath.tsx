import { YarnBallModel } from "@/components/yarnBall/yarnBallModel";
import { useYarnMaterials } from "@/components/yarnBall/materials";
import { BranchModel } from "@/components/branch/branchModel";
import { NODE_RADIUS, NODE_SCALE } from "@/settings/graphSettings";
import { getGroundedGraph } from "@/utils/graph/getGroundedGraph";
import { hat } from "@/data/levels";

const level = getGroundedGraph(hat);

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

      {level.edges.map(({ a, b }, i) => (
        <BranchModel
          key={i}
          from={level.nodes[a].position}
          to={level.nodes[b].position}
          tuckDistance={NODE_RADIUS * 0.8}
        />
      ))}
    </>
  );
}
