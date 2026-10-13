import { useRef } from "react";
import { type Group, MathUtils } from "three";
import { useFrame } from "@react-three/fiber";
import { useKeyboardControls } from "@react-three/drei";

import {
  CAT_RADIUS,
  CAT_RUN_EASE,
  CAT_RUN_SPEED,
  CAT_WALK_SPEED,
  MAX_STEP_DURATION,
} from "@/settings/catSettings";
import type { ControlName } from "@/settings/controlsSettings";
import { useGameStore } from "@/store/gameStore";
import { clampToRoamingArea } from "@/utils/journey/clampToRoamingArea";
import { CAT_START } from "@/settings/journeySettings";

export function Cat({ stationCount }: { stationCount: number }) {
  const rootRef = useRef<Group>(null);
  const runFactorRef = useRef(0);
  const [, getKeys] = useKeyboardControls<ControlName>();

  useFrame((_, delta) => {
    const root = rootRef.current;
    if (!root) return;

    const stepDuration = Math.min(delta, MAX_STEP_DURATION);
    const { forward, backward, left, right, run } = getKeys();
    const directionX = (right ? 1 : 0) - (left ? 1 : 0);
    const directionZ = (backward ? 1 : 0) - (forward ? 1 : 0);
    const directionLength = Math.hypot(directionX, directionZ);

    runFactorRef.current = MathUtils.damp(
      runFactorRef.current,
      run ? 1 : 0,
      CAT_RUN_EASE,
      stepDuration,
    );
    const speed = MathUtils.lerp(
      CAT_WALK_SPEED,
      CAT_RUN_SPEED,
      runFactorRef.current,
    );

    if (directionLength > 0) {
      const step = speed * stepDuration;
      root.position.x += (directionX / directionLength) * step;
      root.position.z += (directionZ / directionLength) * step;
      clampToRoamingArea(root.position, stationCount);
    }

    useGameStore.getState().catPosition.copy(root.position);
  });

  return (
    <group ref={rootRef} position={CAT_START}>
      <mesh castShadow position-y={CAT_RADIUS}>
        <sphereGeometry args={[CAT_RADIUS, 24, 16]} />
        <meshStandardMaterial color="#111111" />
      </mesh>
    </group>
  );
}
