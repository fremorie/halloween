import { useEffect, useRef, useState } from "react";
import { type Object3D, Vector3 } from "three";

import { CAT_FACE_NEXT_STATION_TURN_SPEED } from "@/settings/catSettings";
import { useGameStore } from "@/store/gameStore";
import { dampAngle, getShortestAngleDifference } from "@/utils/animation";
import { getHeading } from "@/utils/cat";
import { getStationOrigin } from "@/utils/journey";

const NEXT_STATION_FACED_ANGLE = 0.01;

export function useNextStationFacing() {
  const isFacingNextStationRef = useRef(
    useGameStore.getState().mode === "walking",
  );
  const [nextStationDirection] = useState(() => new Vector3());

  useEffect(
    () =>
      useGameStore.subscribe((state, previousState) => {
        if (state.mode === "walking" && previousState.mode !== "walking") {
          isFacingNextStationRef.current = true;
        }
      }),
    [],
  );

  const turnTowardNextStation = (
    catRoot: Object3D,
    nextStationIndex: number,
    stepDuration: number,
  ) => {
    if (!isFacingNextStationRef.current) {
      return false;
    }

    const [stationX, , stationZ] = getStationOrigin(nextStationIndex);
    nextStationDirection.set(
      stationX - catRoot.position.x,
      0,
      stationZ - catRoot.position.z,
    );
    const nextStationHeading = getHeading(nextStationDirection);

    catRoot.rotation.y = dampAngle(
      catRoot.rotation.y,
      nextStationHeading,
      CAT_FACE_NEXT_STATION_TURN_SPEED,
      stepDuration,
    );

    const remainingTurn = getShortestAngleDifference(
      catRoot.rotation.y,
      nextStationHeading,
    );

    if (Math.abs(remainingTurn) < NEXT_STATION_FACED_ANGLE) {
      isFacingNextStationRef.current = false;
    }

    return true;
  };

  const stopFacingNextStation = () => {
    isFacingNextStationRef.current = false;
  };

  return { turnTowardNextStation, stopFacingNextStation };
}
