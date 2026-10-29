import { useLayoutEffect } from "react";

import {
  clearStationReveal,
  startStationReveal,
} from "@/components/materials/revealUniforms";
import { levels } from "@/data/levels";

export function useFullyRevealedColors() {
  useLayoutEffect(() => {
    levels.forEach((_, stationIndex) => startStationReveal(stationIndex));

    return () => {
      levels.forEach((_, stationIndex) => clearStationReveal(stationIndex));
    };
  }, []);
}
