import { useEffect } from "react";

import { useGameStore } from "@/store/gameStore";
import { REWARD_BEAT_DURATIONS } from "@/settings/rewardSettings";

export function useRewardBeatTimer() {
  const rewardBeat = useGameStore((state) => state.rewardBeat);

  useEffect(() => {
    if (rewardBeat === null || rewardBeat === "speech") {
      return;
    }

    const timer = setTimeout(
      () => useGameStore.getState().advanceRewardBeat(),
      REWARD_BEAT_DURATIONS[rewardBeat] * 1000,
    );

    return () => clearTimeout(timer);
  }, [rewardBeat]);
}
