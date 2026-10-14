import { type RefObject, useState } from "react";
import { type Group, Vector3 } from "three";
import { useKeyboardControls } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";

import type { ControlName } from "@/settings/controlsSettings";
import { CAT_WALK_SPEED, MAX_STEP_DURATION } from "@/settings/catSettings";
import { useGameStore } from "@/store/gameStore";
import { clampToRoamingArea } from "@/utils/journey/clampToRoamingArea";
import { getMoveDirection } from "@/utils/cat/getMoveDirection";
import { isInsideGroundEllipse } from "@/utils/journey/isInsideGroundEllipse";
import { getArrivalArea } from "@/utils/journey/getArrivalArea";

export function useCatMovement(
  rootRef: RefObject<Group | null>,
  stationCount: number,
) {
  const [, getKeys] = useKeyboardControls<ControlName>();
  const [direction] = useState(() => new Vector3());

  useFrame((_, delta) => {
    const root = rootRef.current;
    if (!root) return;

    const stepDuration = Math.min(delta, MAX_STEP_DURATION);
    const keys = getKeys();

    getMoveDirection(keys, direction);
    root.position.addScaledVector(direction, CAT_WALK_SPEED * stepDuration);
    clampToRoamingArea(root.position, stationCount);

    const { catPosition, currentStationIndex, isNearStation, setNearStation } =
      useGameStore.getState();
    catPosition.copy(root.position);

    const isNearStationNow = isInsideGroundEllipse(
      root.position,
      getArrivalArea(currentStationIndex),
    );

    if (isNearStationNow !== isNearStation) {
      setNearStation(isNearStationNow);
    }
  });
}
