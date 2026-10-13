import { type RefObject, useRef, useState } from "react";
import { type Group, MathUtils, Vector3 } from "three";
import { useKeyboardControls } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";

import type { ControlName } from "@/settings/controlsSettings";
import {
  CAT_RUN_EASE,
  CAT_RUN_SPEED,
  CAT_WALK_SPEED,
  MAX_STEP_DURATION,
} from "@/settings/catSettings";
import { useGameStore } from "@/store/gameStore";
import { clampToRoamingArea } from "@/utils/journey/clampToRoamingArea";
import { getMoveDirection } from "@/utils/cat/getMoveDirection";

export function useCatMovement(
  rootRef: RefObject<Group | null>,
  stationCount: number,
) {
  const [, getKeys] = useKeyboardControls<ControlName>();
  const runFactorRef = useRef(0);
  const [direction] = useState(() => new Vector3());

  useFrame((_, delta) => {
    const root = rootRef.current;
    if (!root) return;

    const stepDuration = Math.min(delta, MAX_STEP_DURATION);
    const keys = getKeys();

    runFactorRef.current = MathUtils.damp(
      runFactorRef.current,
      keys.run ? 1 : 0,
      CAT_RUN_EASE,
      stepDuration,
    );
    const speed = MathUtils.lerp(
      CAT_WALK_SPEED,
      CAT_RUN_SPEED,
      runFactorRef.current,
    );
    getMoveDirection(keys, direction);
    root.position.addScaledVector(direction, speed * stepDuration);
    clampToRoamingArea(root.position, stationCount);

    useGameStore.getState().catPosition.copy(root.position);
  });
}
