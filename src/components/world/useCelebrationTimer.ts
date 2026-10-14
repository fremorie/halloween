import { useEffect } from "react";

import { useGameStore } from "@/store/gameStore";
import { CELEBRATION_DURATION } from "@/settings/journeySettings";

export function useCelebrationTimer() {
  const puzzlePhase = useGameStore((state) => state.puzzlePhase);

  useEffect(() => {
    if (puzzlePhase !== "won") {
      return;
    }

    const timer = setTimeout(
      () => useGameStore.getState().advanceToNextStation(),
      CELEBRATION_DURATION * 1000,
    );

    return () => clearTimeout(timer);
  }, [puzzlePhase]);
}
