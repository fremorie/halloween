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
import { FINALE_BEAT_ORDER } from "@/settings/finaleSettings";
import { useGameStore } from "@/store/gameStore";

const WORLD_REVEAL_FIRST_BEAT_INDEX = FINALE_BEAT_ORDER.indexOf("flight");

export function useStationReveals() {
  const solvedAttempts = useGameStore((state) => state.solvedAttempts);
  const isWorldRevealing = useGameStore(
    (state) =>
      state.mode === "done" ||
      (state.mode === "finale" &&
        state.finaleBeat !== null &&
        FINALE_BEAT_ORDER.indexOf(state.finaleBeat) >=
          WORLD_REVEAL_FIRST_BEAT_INDEX),
  );

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

  useEffect(() => {
    gsap.to(revealUniforms.uRevealMaxRadius, {
      value: isWorldRevealing ? WORLD_REVEAL_MAX_RADIUS : REVEAL_MAX_RADIUS,
      duration: isWorldRevealing ? WORLD_REVEAL_GROW_DURATION : 0,
      ease: "power1.in",
      overwrite: true,
    });
  }, [isWorldRevealing]);
}
