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
import {
  clampToRoamingArea,
  getArrivalArea,
  getStandSpot,
  isInsideGroundEllipse,
} from "@/utils/journey";
import { getMoveDirection, getHeading } from "@/utils/cat";
import { dampAngle } from "@/utils/animation";
import type { LimitStepByObstacles } from "./useCatObstacleBlocking";

export function useCatMovement(
  rootRef: RefObject<Group | null>,
  stationCount: number,
  limitStepByObstacles: LimitStepByObstacles,
) {
  const [, getKeys] = useKeyboardControls<ControlName>();
  const [direction] = useState(() => new Vector3());
  const [standSpot] = useState(() => new Vector3());
  const [previousPosition] = useState(() => new Vector3());
  const [walkStep] = useState(() => new Vector3());
  const walkPaceRef = useRef(0);

  useFrame(({ camera }, delta) => {
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
      walkStep.copy(direction).multiplyScalar(CAT_WALK_SPEED * stepDuration);
      root.position.add(limitStepByObstacles(root, walkStep));
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
        walkStep
          .copy(direction)
          .multiplyScalar(
            Math.min(distanceToSpot, CAT_WALK_SPEED * stepDuration),
          );
        root.position.add(limitStepByObstacles(root, walkStep));
      }
    }

    if (mode === "solving" || mode === "rewarding") {
      direction.copy(camera.position).sub(root.position).setY(0).normalize();
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
