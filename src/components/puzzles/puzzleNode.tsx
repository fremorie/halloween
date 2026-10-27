import type { ThreeEvent } from "@react-three/fiber";
import { useRef } from "react";
import { type Group, type MeshStandardMaterial, SphereGeometry } from "three";

import { YarnBallModel } from "@/components/models/yarnBall/yarnBallModel";
import { NODE_SCALE } from "@/settings/graphSettings";
import { HIT_SPHERE_RADIUS } from "@/settings/puzzleSettings";
import { useGameStore } from "@/store/gameStore";
import type { GraphNode } from "@/types/graph";
import type { NodeState } from "@/types/puzzle";
import { useHoverAnimation } from "./useHoverAnimation";
import { usePointerHover } from "./usePointerHover";
import { useRejectShake } from "./useRejectShake";
import { useScaleAnimation } from "./useScaleAnimation";
import { useBallKnitting } from "./useBallKnitting";

const HIT_SPHERE_GEOMETRY = new SphereGeometry(HIT_SPHERE_RADIUS, 8, 6);

type Props = {
  node: GraphNode;
  levelIndex: number;
  material: MeshStandardMaterial;
  state: NodeState;
  isActive: boolean;
  onHoverStart: (nodeId: number) => void;
  onHoverEnd: (nodeId: number) => void;
};

export function PuzzleNode({
  node,
  levelIndex,
  material,
  state,
  isActive,
  onHoverStart,
  onHoverEnd,
}: Props) {
  const groupRef = useRef<Group>(null);
  const knittingBallRef = useRef<Group>(null);

  const pressNode = useGameStore((store) => store.pressNode);
  const enterNode = useGameStore((store) => store.enterNode);
  const { isHovered, startHover, endHover } = usePointerHover(isActive);

  useHoverAnimation(groupRef, isHovered);
  useScaleAnimation(groupRef, state, isHovered);
  useRejectShake(groupRef, levelIndex, node.id);
  useBallKnitting(knittingBallRef, levelIndex);

  const handlePointerEnter = (event: ThreeEvent<PointerEvent>) => {
    startHover();
    onHoverStart(node.id);
    const isPointerHeld = event.buttons !== 0;
    if (isPointerHeld) {
      enterNode(levelIndex, node.id);
    }
  };

  const handlePointerLeave = () => {
    endHover();
    onHoverEnd(node.id);
  };

  return (
    <group position={node.position}>
      <group ref={groupRef}>
        <group ref={knittingBallRef}>
          <YarnBallModel
            rotationY={node.id * 1.7}
            material={material}
            scale={NODE_SCALE}
          />
        </group>

        {isActive && (
          <mesh
            geometry={HIT_SPHERE_GEOMETRY}
            visible={false}
            onPointerDown={() => pressNode(levelIndex, node.id)}
            onPointerEnter={handlePointerEnter}
            onPointerLeave={handlePointerLeave}
          />
        )}
      </group>
    </group>
  );
}
