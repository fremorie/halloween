import { useEffect } from "react";

import { useGameStore } from "@/store/gameStore";
import { FINALE_BEAT_DURATIONS } from "@/settings/finaleSettings";

export function useFinaleBeatTimer() {
  const finaleBeat = useGameStore((state) => state.finaleBeat);

  useEffect(() => {
    if (finaleBeat === null || finaleBeat === "thankYou") {
      return;
    }

    const timer = setTimeout(
      () => useGameStore.getState().advanceFinaleBeat(),
      FINALE_BEAT_DURATIONS[finaleBeat] * 1000,
    );

    return () => clearTimeout(timer);
  }, [finaleBeat]);
}
