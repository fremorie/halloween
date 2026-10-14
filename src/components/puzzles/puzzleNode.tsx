import type { ThreeEvent } from "@react-three/fiber";
import type { MeshStandardMaterial } from "three";

import { YarnBallModel } from "@/components/models/yarnBall/yarnBallModel";
import { NODE_SCALE } from "@/settings/graphSettings";
import {
  CURRENT_NODE_SCALE,
  HIT_SPHERE_RADIUS,
  VISITED_NODE_SCALE,
} from "@/settings/puzzleSettings";
import { useGameStore } from "@/store/gameStore";
import type { GraphNode } from "@/types/graph";
import type { NodeState } from "@/types/puzzle";

const SCALE_BY_NODE_STATE: Record<NodeState, number> = {
  idle: 1,
  visited: VISITED_NODE_SCALE,
  current: CURRENT_NODE_SCALE,
};

type Props = {
  node: GraphNode;
  levelIndex: number;
  material: MeshStandardMaterial;
  state: NodeState;
  isActive: boolean;
};

export function PuzzleNode({
  node,
  levelIndex,
  material,
  state,
  isActive,
}: Props) {
  const pressNode = useGameStore((store) => store.pressNode);

  const handlePointerDown = (event: ThreeEvent<PointerEvent>) => {
    event.stopPropagation();
    pressNode(levelIndex, node.id);
  };

  return (
    <group position={node.position} scale={SCALE_BY_NODE_STATE[state]}>
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
