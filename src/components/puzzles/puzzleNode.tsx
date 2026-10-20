import type { ThreeEvent } from "@react-three/fiber";
import { useRef } from "react";
import { type Group, type MeshStandardMaterial, SphereGeometry } from "three";
import { BallCollider, RapierRigidBody, RigidBody } from "@react-three/rapier";

import { YarnBallModel } from "@/components/models/yarnBall/yarnBallModel";
import { NODE_SCALE } from "@/settings/graphSettings";
import { HIT_SPHERE_RADIUS } from "@/settings/puzzleSettings";
import { useGameStore } from "@/store/gameStore";
import { YARN_BALL_COLLIDER_RADIUS } from "@/settings/physicsSettings";
import type { GraphNode } from "@/types/graph";
import type { NodeState } from "@/types/puzzle";
import { useHoverAnimation } from "./useHoverAnimation";
import { usePointerHover } from "./usePointerHover";
import { useRejectShake } from "./useRejectShake";
import { useScaleAnimation } from "./useScaleAnimation";
import { useRewardWiggle } from "./useRewardWiggle";
import { useBallScatter } from "./useBallScatter";

const HIT_SPHERE_GEOMETRY = new SphereGeometry(HIT_SPHERE_RADIUS, 8, 6);

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
  const groupRef = useRef<Group>(null);
  const ballBodyRef = useRef<RapierRigidBody>(null);

  const pressNode = useGameStore((store) => store.pressNode);
  const enterNode = useGameStore((store) => store.enterNode);
  const { isHovered, startHover, endHover } = usePointerHover(isActive);

  useHoverAnimation(groupRef, isHovered);
  useScaleAnimation(groupRef, state, isHovered);
  useRejectShake(groupRef, levelIndex, node.id);
  useRewardWiggle(groupRef, levelIndex);
  useBallScatter(ballBodyRef, levelIndex);

  const handlePointerEnter = (event: ThreeEvent<PointerEvent>) => {
    startHover();
    const isPointerHeld = event.buttons !== 0;
    if (isPointerHeld) {
      enterNode(levelIndex, node.id);
    }
  };

  return (
    <RigidBody
      ref={ballBodyRef}
      type="fixed"
      colliders={false}
      position={node.position}
    >
      <BallCollider args={[YARN_BALL_COLLIDER_RADIUS]} />
      <group ref={groupRef}>
        <YarnBallModel
          rotationY={node.id * 1.7}
          material={material}
          scale={NODE_SCALE}
        />

        {isActive && (
          <mesh
            geometry={HIT_SPHERE_GEOMETRY}
            visible={false}
            onPointerDown={() => pressNode(levelIndex, node.id)}
            onPointerEnter={handlePointerEnter}
            onPointerLeave={endHover}
          />
        )}
      </group>
    </RigidBody>
  );
}
