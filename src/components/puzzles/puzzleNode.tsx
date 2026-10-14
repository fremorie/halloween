import { useFrame, type ThreeEvent } from "@react-three/fiber";
import { MathUtils, type MeshStandardMaterial, type Group } from "three";
import { useEffect, useRef } from "react";

import { YarnBallModel } from "@/components/models/yarnBall/yarnBallModel";
import { NODE_SCALE } from "@/settings/graphSettings";
import {
  CURRENT_NODE_PULSE_AMOUNT,
  CURRENT_NODE_PULSE_SPEED,
  CURRENT_NODE_SCALE,
  HIT_SPHERE_RADIUS,
  HOVER_EASING,
  HOVER_LEAN,
  HOVER_TURN,
  HOVER_WOBBLE_ANGLE,
  HOVER_WOBBLE_DECAY,
  HOVER_WOBBLE_DURATION,
  HOVER_WOBBLE_FREQUENCY,
  NODE_SCALE_EASING,
  REJECT_SHAKE_DISTANCE,
  REJECT_SHAKE_DURATION,
  REJECT_SHAKE_SPEED,
  VISITED_NODE_SCALE,
  WIN_HOP_DURATION,
  WIN_HOP_HEIGHT,
  WIN_HOP_STAGGER,
  WIN_NODE_SCALE,
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
  const animationRef = useRef({
    isHovered: false,
    hoveredAt: null as number | null,
    scale: 1,
    turn: 0,
    lean: 0,
  });

  const pressNode = useGameStore((store) => store.pressNode);
  const enterNode = useGameStore((store) => store.enterNode);

  useFrame((_, delta) => {
    const group = groupRef.current;
    if (!group) {
      return;
    }

    const animation = animationRef.current;
    const { wonAt, rejected } = useGameStore.getState().puzzleFeedback;
    const time = getNowSeconds();

    let targetScale = 1;
    if (state === "current") {
      targetScale =
        CURRENT_NODE_SCALE +
        CURRENT_NODE_PULSE_AMOUNT * Math.sin(time * CURRENT_NODE_PULSE_SPEED);
    } else if (state === "visited" || animation.isHovered) {
      targetScale = VISITED_NODE_SCALE;
    }

    let hop = 0;
    if (isCelebrating && wonAt !== null) {
      const sinceHopStart = time - wonAt - pathOrder * WIN_HOP_STAGGER;
      if (sinceHopStart > 0 && sinceHopStart < WIN_HOP_DURATION) {
        hop =
          Math.sin((Math.PI * sinceHopStart) / WIN_HOP_DURATION) *
          WIN_HOP_HEIGHT;
        targetScale = WIN_NODE_SCALE;
      } else {
        targetScale = VISITED_NODE_SCALE;
      }
    }

    let shake = 0;
    if (isActive && rejected?.nodeId === node.id) {
      const sinceRejected = time - rejected.at;
      if (sinceRejected < REJECT_SHAKE_DURATION) {
        shake =
          Math.sin(sinceRejected * REJECT_SHAKE_SPEED) *
          REJECT_SHAKE_DISTANCE *
          (1 - sinceRejected / REJECT_SHAKE_DURATION);
      }
    }

    animation.turn = MathUtils.damp(
      animation.turn,
      animation.isHovered ? HOVER_TURN : 0,
      HOVER_EASING,
      delta,
    );

    animation.lean = MathUtils.damp(
      animation.lean,
      animation.isHovered ? HOVER_LEAN : 0,
      HOVER_EASING,
      delta,
    );

    let wobble = 0;

    if (animation.hoveredAt !== null) {
      const sinceHovered = time - animation.hoveredAt;
      if (sinceHovered < HOVER_WOBBLE_DURATION) {
        wobble =
          Math.sin(sinceHovered * HOVER_WOBBLE_FREQUENCY) *
          HOVER_WOBBLE_ANGLE *
          Math.exp(-sinceHovered * HOVER_WOBBLE_DECAY);
      }
    }

    group.rotation.set(animation.lean, animation.turn, wobble);

    animation.scale = MathUtils.damp(
      animation.scale,
      targetScale,
      NODE_SCALE_EASING,
      delta,
    );

    group.scale.setScalar(animation.scale);
    group.position.set(
      node.position[0] + shake,
      node.position[1] + hop,
      node.position[2],
    );
  });

  useEffect(() => {
    if (isActive) {
      return;
    }

    animationRef.current.isHovered = false;
    document.body.style.cursor = "";
  }, [isActive]);

  const handlePointerDown = (event: ThreeEvent<PointerEvent>) => {
    event.stopPropagation();
    pressNode(levelIndex, node.id);
  };

  const handlePointerEnter = (event: ThreeEvent<PointerEvent>) => {
    event.stopPropagation();

    const animation = animationRef.current;
    if (!animation.isHovered) {
      animation.hoveredAt = getNowSeconds();
    }
    animation.isHovered = true;
    document.body.style.cursor = "pointer";

    enterNode(levelIndex, node.id);
  };

  const handlePointerLeave = () => {
    animationRef.current.isHovered = false;
    document.body.style.cursor = "";
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
          onPointerLeave={handlePointerLeave}
        >
          <sphereGeometry args={[HIT_SPHERE_RADIUS, 16, 12]} />
        </mesh>
      )}
    </group>
  );
}
