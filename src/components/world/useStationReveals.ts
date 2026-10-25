import { useEffect } from "react";

import { levels } from "@/data/levels";
import {
  clearStationReveal,
  isStationRevealStarted,
  startStationReveal,
} from "@/components/materials/revealUniforms";
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
  }, [solvedAttempts]);
}
