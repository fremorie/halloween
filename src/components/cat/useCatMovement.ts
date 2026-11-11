import { type RefObject, useRef, useState } from "react";
import { type Group, MathUtils, Vector2, Vector3 } from "three";
import { useKeyboardControls } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";

import type { ControlName } from "@/settings/controlsSettings";
import {
  CAT_FREE_FLIGHT_SPEED,
  CAT_STEER_TURN_SPEED,
  CAT_TURN_SPEED,
  CAT_WALK_BACKWARD_SPEED_FACTOR,
  CAT_WALK_NATURAL_SPEED,
  CAT_WALK_SPEED,
  MAX_STEP_DURATION,
} from "@/settings/catSettings";
import { ROUTE_ARRIVAL_DISTANCE } from "@/settings/journeySettings";
import { useGameStore } from "@/store/gameStore";
import {
  clampToRoamingArea,
  getApproachDirection,
  getArrivalArea,
  getPedestalDetourArea,
  getStandSpot,
  isInsideGroundEllipse,
} from "@/utils/journey";
import {
  getForward,
  getFreeFlightProgress,
  getHeading,
  getSteeringInput,
} from "@/utils/cat";
import { joystickTilt } from "@/store/joystickTilt";
import { dampAngle } from "@/utils/animation";
import type {
  IsTurnBlockedByWings,
  LimitStepByObstacles,
} from "./useCatObstacleBlocking";

export function useCatMovement(
  rootRef: RefObject<Group | null>,
  stationCount: number,
  limitStepByObstacles: LimitStepByObstacles,
  isTurnBlockedByWings: IsTurnBlockedByWings,
) {
  const [, getKeys] = useKeyboardControls<ControlName>();
  const [direction] = useState(() => new Vector3());
  const [steeringInput] = useState(() => new Vector2());
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
      catForward,
      mode,
      currentStationIndex,
      isCatFreeFlying,
      isNearStation,
      setNearStation,
      arriveAtStation,
    } = useGameStore.getState();

    if (mode === "finale") {
      walkPaceRef.current = 0;

      return;
    }

    previousPosition.copy(root.position);

    const isSteeredByPlayer = mode === "walking" || mode === "done";

    if (isSteeredByPlayer) {
      getSteeringInput(getKeys(), joystickTilt, steeringInput);
      const steeredHeading =
        root.rotation.y - steeringInput.x * CAT_STEER_TURN_SPEED * stepDuration;

      if (
        steeringInput.x !== 0 &&
        !isTurnBlockedByWings(root, steeredHeading)
      ) {
        root.rotation.y = steeredHeading;
      }

      const walkSpeedFactor =
        steeringInput.y < 0 ? CAT_WALK_BACKWARD_SPEED_FACTOR : 1;
      const moveSpeed =
        MathUtils.lerp(
          CAT_WALK_SPEED,
          CAT_FREE_FLIGHT_SPEED,
          getFreeFlightProgress(root.position),
        ) * walkSpeedFactor;
      getForward(root.rotation.y, direction).multiplyScalar(steeringInput.y);
      walkStep.copy(direction).multiplyScalar(moveSpeed * stepDuration);
      root.position.add(limitStepByObstacles(root, walkStep));
      clampToRoamingArea(root.position);
    }

    if (mode === "approaching") {
      standSpot.set(...getStandSpot(currentStationIndex));
      const distanceToSpot = standSpot.distanceTo(root.position);

      if (distanceToSpot <= ROUTE_ARRIVAL_DISTANCE) {
        root.position.copy(standSpot);
        arriveAtStation();
      } else {
        getApproachDirection(
          root.position,
          standSpot,
          getPedestalDetourArea(currentStationIndex),
          direction,
        );
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
      stepDuration > 0 && !isCatFreeFlying
        ? movedDistance / stepDuration / CAT_WALK_NATURAL_SPEED
        : 0;

    if (!isSteeredByPlayer && direction.lengthSq() > 0) {
      const turnedHeading = dampAngle(
        root.rotation.y,
        getHeading(direction),
        CAT_TURN_SPEED,
        stepDuration,
      );

      if (!isTurnBlockedByWings(root, turnedHeading)) {
        root.rotation.y = turnedHeading;
      }
    }

    catPosition.copy(root.position);
    getForward(root.rotation.y, catForward);

    const isNearStationNow =
      mode === "walking" &&
      isInsideGroundEllipse(root.position, getArrivalArea(currentStationIndex));

    if (isNearStationNow !== isNearStation) {
      setNearStation(isNearStationNow);
    }
  });

  return walkPaceRef;
}
