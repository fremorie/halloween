import { YarnBallModel } from "@/components/yarnBall/yarnBallModel";
import { useYarnMaterials } from "@/components/yarnBall/materials";
import { BranchModel } from "@/components/branch/branchModel";
import { level, NODE_SCALE } from "./utils/graph";

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
        />
      ))}
    </>
  );
}
