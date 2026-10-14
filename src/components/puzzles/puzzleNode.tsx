import { useRef } from "react";
import type { Group, MeshStandardMaterial } from "three";

import { YarnBallModel } from "@/components/models/yarnBall/yarnBallModel";
import { NODE_SCALE } from "@/settings/graphSettings";
import { HIT_SPHERE_RADIUS } from "@/settings/puzzleSettings";
import { useGameStore } from "@/store/gameStore";
import type { GraphNode } from "@/types/graph";
import type { NodeState } from "@/types/puzzle";
import { useCelebrationHop } from "./useCelebrationHop";
import { useHoverAnimation } from "./useHoverAnimation";
import { usePointerHover } from "./usePointerHover";
import { useRejectShake } from "./useRejectShake";
import { useScaleAnimation } from "./useScaleAnimation";

type Props = {
  node: GraphNode;
  levelIndex: number;
  material: MeshStandardMaterial;
  state: NodeState;
  pathOrder: number;
  isActive: boolean;
  isCelebrating: boolean;
};

export function PuzzleNode({
  node,
  levelIndex,
  material,
  state,
  pathOrder,
  isActive,
  isCelebrating,
}: Props) {
  const groupRef = useRef<Group>(null);
  const pressNode = useGameStore((store) => store.pressNode);
  const enterNode = useGameStore((store) => store.enterNode);
  const { isHovered, startHover, endHover } = usePointerHover(isActive);

  const [restingX, restingY] = node.position;

  useHoverAnimation(groupRef, isHovered);
  useScaleAnimation(groupRef, state, isHovered);
  useCelebrationHop(groupRef, isCelebrating, pathOrder, restingY);
  useRejectShake(groupRef, levelIndex, node.id, restingX);

  const handlePointerEnter = () => {
    startHover();
    enterNode(levelIndex, node.id);
  };

  return (
    <group ref={groupRef} position={node.position}>
      <YarnBallModel
        rotationY={node.id * 1.7}
        material={material}
        scale={NODE_SCALE}
      />

      {isActive && (
        <mesh
          visible={false}
          onPointerDown={() => pressNode(levelIndex, node.id)}
          onPointerEnter={handlePointerEnter}
          onPointerLeave={endHover}
        >
          <sphereGeometry args={[HIT_SPHERE_RADIUS, 16, 12]} />
        </mesh>
      )}
    </group>
  );
}
