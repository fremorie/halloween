import { YarnBallModel } from "@/components/yarnBall/yarnBallModel";
import { useYarnMaterials } from "@/components/yarnBall/materials";

export function YarnBalls() {
  const yarnMaterials = useYarnMaterials();

  return (
    <>
      <YarnBallModel
        position={[0, 1.5, 0]}
        rotationY={1}
        material={yarnMaterials[0]}
      />
      <YarnBallModel
        position={[0, 2.5, -2]}
        rotationY={2}
        material={yarnMaterials[1]}
      />
      <YarnBallModel
        position={[0, 2, 2]}
        rotationY={3}
        material={yarnMaterials[2]}
      />
    </>
  );
}
