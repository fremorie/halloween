import { gsap } from "gsap";
import { useEffect } from "react";

import { levels } from "@/data/levels";
import {
  clearStationReveal,
  isStationRevealStarted,
  revealUniforms,
  startStationReveal,
} from "@/components/materials/revealUniforms";
import {
  REVEAL_MAX_RADIUS,
  WORLD_REVEAL_GROW_DURATION,
  WORLD_REVEAL_MAX_RADIUS,
} from "@/settings/revealSettings";
import { useGameStore } from "@/store/gameStore";

export function useStationReveals() {
  const solvedAttempts = useGameStore((state) => state.solvedAttempts);

  useEffect(() => {
    levels.forEach((_, stationIndex) => {
      const isSolved = solvedAttempts[stationIndex] !== undefined;

      if (!isSolved) {
        clearStationReveal(stationIndex);

        return;
      }

      if (!isStationRevealStarted(stationIndex)) {
        startStationReveal(stationIndex);
      }
    });

    const areAllStationsSolved = levels.every(
      (_, stationIndex) => solvedAttempts[stationIndex] !== undefined,
    );

    gsap.to(revealUniforms.uRevealMaxRadius, {
      value: areAllStationsSolved ? WORLD_REVEAL_MAX_RADIUS : REVEAL_MAX_RADIUS,
      duration: areAllStationsSolved ? WORLD_REVEAL_GROW_DURATION : 0,
      ease: "power1.in",
      overwrite: true,
    });
  }, [solvedAttempts]);
}
