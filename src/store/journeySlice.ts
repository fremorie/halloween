import type { StateCreator } from "zustand";
import { Vector3 } from "three";

import { levels } from "@/data/levels";
import type { GameState } from "@/store/gameStore";
import type { GameMode } from "@/types/game";

export type JourneySlice = {
  mode: GameMode;
  runCount: number;
  catPosition: Vector3;
  catForward: Vector3;
  currentStationIndex: number;
  isNearStation: boolean;
  setNearStation: (isNearStation: boolean) => void;
  beginApproach: () => void;
  finishIntro: () => void;
  arriveAtStation: () => void;
  advanceToNextStation: () => void;
  restartGame: () => void;
};

export const createJourneySlice: StateCreator<
  GameState,
  [],
  [],
  JourneySlice
> = (set, get) => ({
  mode: "intro",
  runCount: 0,
  catPosition: new Vector3(),
  catForward: new Vector3(0, 0, -1),
  currentStationIndex: 0,
  isNearStation: false,

  setNearStation: (isNearStation) => set({ isNearStation }),

  beginApproach: () => {
    const { mode, isNearStation } = get();

    if (mode !== "walking" || !isNearStation) {
      return;
    }

    set({ mode: "approaching", isNearStation: false });
  },

  finishIntro: () => {
    if (get().mode !== "intro") {
      return;
    }

    set({ mode: "walking", introBeat: null });
  },

  arriveAtStation: () => {
    if (get().mode !== "approaching") {
      return;
    }

    set({ mode: "solving" });
  },

  advanceToNextStation: () => {
    const { currentStationIndex } = get();
    const isLastStation = currentStationIndex === levels.length - 1;

    get().resetCurrentPuzzle();
    set({
      mode: isLastStation ? "done" : "walking",
      currentStationIndex: isLastStation
        ? currentStationIndex
        : currentStationIndex + 1,
    });
  },

  restartGame: () => {
    get().resetAllPuzzles();
    get().resetRewards();
    get().resetFinale();
    set((state) => ({
      mode: "walking",
      runCount: state.runCount + 1,
      currentStationIndex: 0,
      isNearStation: false,
    }));
  },
});
