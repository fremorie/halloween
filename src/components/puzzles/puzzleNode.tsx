import { useFrame, type ThreeEvent } from "@react-three/fiber";
import { MathUtils, type MeshStandardMaterial, type Group } from "three";
import { useRef } from "react";

import { YarnBallModel } from "@/components/models/yarnBall/yarnBallModel";
import { NODE_SCALE } from "@/settings/graphSettings";
import {
  CURRENT_NODE_PULSE_AMOUNT,
  CURRENT_NODE_PULSE_SPEED,
  CURRENT_NODE_SCALE,
  HIT_SPHERE_RADIUS,
  NODE_SCALE_EASING,
  VISITED_NODE_SCALE,
} from "@/settings/puzzleSettings";
import { useGameStore } from "@/store/gameStore";
import type { GraphNode } from "@/types/graph";
import type { NodeState } from "@/types/puzzle";
import { getNowSeconds } from "@/utils/time/getNowSeconds";

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
  const animationRef = useRef({ scale: 1 });
  const pressNode = useGameStore((store) => store.pressNode);
  const enterNode = useGameStore((store) => store.enterNode);

  useFrame((_, delta) => {
    const group = groupRef.current;
    if (!group) {
      return;
    }

    const animation = animationRef.current;
    const time = getNowSeconds();

    let targetScale = 1;
    if (state === "current") {
      targetScale =
        CURRENT_NODE_SCALE +
        CURRENT_NODE_PULSE_AMOUNT * Math.sin(time * CURRENT_NODE_PULSE_SPEED);
    } else if (state === "visited") {
      targetScale = VISITED_NODE_SCALE;
    }

    animation.scale = MathUtils.damp(
      animation.scale,
      targetScale,
      NODE_SCALE_EASING,
      delta,
    );

    group.scale.setScalar(animation.scale);
  });

  const handlePointerDown = (event: ThreeEvent<PointerEvent>) => {
    event.stopPropagation();
    pressNode(levelIndex, node.id);
  };

  const handlePointerEnter = (event: ThreeEvent<PointerEvent>) => {
    event.stopPropagation();
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
          onPointerDown={handlePointerDown}
          onPointerEnter={handlePointerEnter}
        >
          <sphereGeometry args={[HIT_SPHERE_RADIUS, 16, 12]} />
        </mesh>
      )}
    </group>
  );
}
