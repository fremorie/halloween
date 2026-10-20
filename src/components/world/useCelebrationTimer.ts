import { useEffect } from "react";

import { useGameStore } from "@/store/gameStore";
import { CELEBRATION_DURATION } from "@/settings/journeySettings";
import { REWARDED_COSTUME_PIECES } from "@/settings/rewardSettings";
import { levels } from "@/data/levels";

export function useCelebrationTimer() {
  const puzzlePhase = useGameStore((state) => state.puzzlePhase);

  useEffect(() => {
    if (puzzlePhase !== "won") {
      return;
    }

    const { currentStationIndex } = useGameStore.getState();
    const isRewardedLevel = REWARDED_COSTUME_PIECES.includes(
      levels[currentStationIndex].piece,
    );

    if (isRewardedLevel) {
      useGameStore.getState().startReward();

      return;
    }

    const timer = setTimeout(
      () => useGameStore.getState().advanceToNextStation(),
      CELEBRATION_DURATION * 1000,
    );

    return () => clearTimeout(timer);
  }, [puzzlePhase]);
}
