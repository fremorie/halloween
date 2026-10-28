import { useEffect } from "react";

import { useGameStore } from "@/store/gameStore";

export function useKnittingSound() {
  useEffect(
    () =>
      useGameStore.subscribe((state, previousState) => {
        const hasKnittingJustStarted =
          state.rewardBeat === "knit" && previousState.rewardBeat !== "knit";
        if (hasKnittingJustStarted) state.knittingSound?.play();
      }),
    [],
  );
}
