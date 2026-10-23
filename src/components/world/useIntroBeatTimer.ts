import { useEffect } from "react";

import { useGameStore } from "@/store/gameStore";
import { INTRO_BEAT_DURATIONS } from "@/settings/introSettings";

export function useIntroBeatTimer() {
  const introBeat = useGameStore((state) => state.introBeat);

  useEffect(() => {
    if (introBeat === null || introBeat === "askForHelp") {
      return;
    }

    const timer = setTimeout(
      () => useGameStore.getState().advanceIntroBeat(),
      INTRO_BEAT_DURATIONS[introBeat] * 1000,
    );

    return () => clearTimeout(timer);
  }, [introBeat]);
}
