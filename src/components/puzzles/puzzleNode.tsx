import type { ThreeEvent } from "@react-three/fiber";
import type { MeshStandardMaterial } from "three";

import { YarnBallModel } from "@/components/models/yarnBall/yarnBallModel";
import { NODE_SCALE } from "@/settings/graphSettings";
import { HIT_SPHERE_RADIUS } from "@/settings/puzzleSettings";
import { useGameStore } from "@/store/gameStore";
import type { GraphNode } from "@/types/graph";

type Props = {
  node: GraphNode;
  levelIndex: number;
  material: MeshStandardMaterial;
  isActive: boolean;
};

export function PuzzleNode({ node, levelIndex, material, isActive }: Props) {
  const pressNode = useGameStore((store) => store.pressNode);

  const handlePointerDown = (event: ThreeEvent<PointerEvent>) => {
    event.stopPropagation();
    pressNode(levelIndex, node.id);
  };

  return (
    <group position={node.position}>
      <YarnBallModel
        rotationY={node.id * 1.7}
        material={material}
        scale={NODE_SCALE}
      />

      {isActive && (
        <mesh visible={false} onPointerDown={handlePointerDown}>
          <sphereGeometry args={[HIT_SPHERE_RADIUS, 16, 12]} />
        </mesh>
      )}
    </group>
  );
}
