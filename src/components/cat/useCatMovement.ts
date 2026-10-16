import { type RefObject, useRef, useState } from "react";
import { type Group, Vector3 } from "three";
import { useKeyboardControls } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";

import type { ControlName } from "@/settings/controlsSettings";
import {
  CAT_TURN_SPEED,
  CAT_WALK_NATURAL_SPEED,
  CAT_WALK_SPEED,
  MAX_STEP_DURATION,
} from "@/settings/catSettings";
import { ROUTE_ARRIVAL_DISTANCE } from "@/settings/journeySettings";
import { useGameStore } from "@/store/gameStore";
import { clampToRoamingArea } from "@/utils/journey/clampToRoamingArea";
import { getMoveDirection } from "@/utils/cat/getMoveDirection";
import { getArrivalArea } from "@/utils/journey/getArrivalArea";
import { getStandSpot } from "@/utils/journey/getStandSpot";
import { isInsideGroundEllipse } from "@/utils/journey/isInsideGroundEllipse";
import { dampAngle } from "@/utils/animation/dampAngle";
import { getHeading } from "@/utils/cat/getHeading";

export function useCatMovement(
  rootRef: RefObject<Group | null>,
  stationCount: number,
) {
  const [, getKeys] = useKeyboardControls<ControlName>();
  const [direction] = useState(() => new Vector3());
  const [standSpot] = useState(() => new Vector3());
  const [previousPosition] = useState(() => new Vector3());
  const walkPaceRef = useRef(0);

  useFrame((_, delta) => {
    const root = rootRef.current;
    if (!root) return;

    const stepDuration = Math.min(delta, MAX_STEP_DURATION);
    const {
      catPosition,
      mode,
      currentStationIndex,
      isNearStation,
      setNearStation,
      arriveAtStation,
    } = useGameStore.getState();

    previousPosition.copy(root.position);

    if (mode === "walking" || mode === "done") {
      getMoveDirection(getKeys(), direction);
      root.position.addScaledVector(direction, CAT_WALK_SPEED * stepDuration);
      clampToRoamingArea(root.position, stationCount);
    }

    if (mode === "approaching") {
      standSpot.set(...getStandSpot(currentStationIndex));
      direction.copy(standSpot).sub(root.position);
      const distanceToSpot = direction.length();

      if (distanceToSpot <= ROUTE_ARRIVAL_DISTANCE) {
        root.position.copy(standSpot);
        arriveAtStation();
      } else {
        direction.normalize();
        root.position.addScaledVector(
          direction,
          Math.min(distanceToSpot, CAT_WALK_SPEED * stepDuration),
        );
      }
    }

    const movedDistance = root.position.distanceTo(previousPosition);
    walkPaceRef.current =
      stepDuration > 0
        ? movedDistance / stepDuration / CAT_WALK_NATURAL_SPEED
        : 0;

    if (direction.lengthSq() > 0) {
      root.rotation.y = dampAngle(
        root.rotation.y,
        getHeading(direction),
        CAT_TURN_SPEED,
        stepDuration,
      );
    }

    catPosition.copy(root.position);

    const isNearStationNow =
      mode === "walking" &&
      isInsideGroundEllipse(root.position, getArrivalArea(currentStationIndex));

    if (isNearStationNow !== isNearStation) {
      setNearStation(isNearStationNow);
    }
  });

  return walkPaceRef;
}
