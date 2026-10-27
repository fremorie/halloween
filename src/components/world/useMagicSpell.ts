import { useEffect } from "react";

import { useGameStore } from "@/store/gameStore";

export function useMagicSpell() {
  useEffect(
    () =>
      useGameStore.subscribe((state, previousState) => {
        const hasKnittingJustStarted =
          state.rewardBeat === "knit" && previousState.rewardBeat !== "knit";
        if (hasKnittingJustStarted) state.magicSpellSound?.play();
      }),
    [],
  );
}
