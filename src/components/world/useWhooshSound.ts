import { useEffect } from "react";

import { useGameStore } from "@/store/gameStore";

export function useWhooshSound() {
  useEffect(
    () =>
      useGameStore.subscribe((state, previousState) => {
        const hasCameraJustStartedFlyingToCat =
          state.rewardBeat === "zoomIn" &&
          previousState.rewardBeat !== "zoomIn";
        if (hasCameraJustStartedFlyingToCat) state.whooshSound?.play();
      }),
    [],
  );
}
