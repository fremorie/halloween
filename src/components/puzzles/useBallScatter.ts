import { type RapierRigidBody, useRapier } from "@react-three/rapier";
import { type RefObject, useEffect } from "react";
import { MathUtils } from "three";

import { useGameStore } from "@/store/gameStore";
import {
  SCATTER_MAX_SPIN_SPEED,
  SCATTER_OUTWARD_SPEED_PER_UNIT,
  SCATTER_SPEED_JITTER,
  SCATTER_TOWARD_CAMERA_SPEED,
  SCATTER_UPWARD_SPEED,
} from "@/settings/physicsSettings";

function getRandomSpin() {
  return MathUtils.randFloatSpread(2 * SCATTER_MAX_SPIN_SPEED);
}

function getJitteredSpeed(speed: number) {
  return speed + MathUtils.randFloatSpread(2 * SCATTER_SPEED_JITTER);
}

export function useBallScatter(
  ballBodyRef: RefObject<RapierRigidBody | null>,
  levelIndex: number,
  horizontalOffsetFromPuzzleCenter: number,
) {
  const { rapier } = useRapier();
  const isScattering = useGameStore(
    (store) =>
      store.rewardBeat === "scatter" &&
      store.currentStationIndex === levelIndex,
  );

  useEffect(() => {
    const ballBody = ballBodyRef.current;
    if (!ballBody || !isScattering) return;

    ballBody.setBodyType(rapier.RigidBodyType.Dynamic, true);

    ballBody.setLinvel(
      {
        x: getJitteredSpeed(
          horizontalOffsetFromPuzzleCenter * SCATTER_OUTWARD_SPEED_PER_UNIT,
        ),
        y: getJitteredSpeed(SCATTER_UPWARD_SPEED),
        z: getJitteredSpeed(SCATTER_TOWARD_CAMERA_SPEED),
      },
      true,
    );
    ballBody.setAngvel(
      {
        x: getRandomSpin(),
        y: getRandomSpin(),
        z: getRandomSpin(),
      },
      true,
    );
  }, [ballBodyRef, isScattering, rapier, horizontalOffsetFromPuzzleCenter]);
}
