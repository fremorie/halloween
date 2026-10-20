import { type RapierRigidBody, useRapier } from "@react-three/rapier";
import { type RefObject, useEffect } from "react";

import { useGameStore } from "@/store/gameStore";

export function useBallScatter(
  ballBodyRef: RefObject<RapierRigidBody | null>,
  levelIndex: number,
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
  }, [ballBodyRef, isScattering, rapier]);
}
