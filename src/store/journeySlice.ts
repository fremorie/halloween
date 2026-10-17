import type { StateCreator } from "zustand";
import { Vector3 } from "three";

import { levels } from "@/data/levels";
import type { GameState } from "@/store/gameStore";
import type { GameMode } from "@/types/game";

export type JourneySlice = {
  mode: GameMode;
  runCount: number;
  catPosition: Vector3;
  currentStationIndex: number;
  isNearStation: boolean;
  setNearStation: (isNearStation: boolean) => void;
  beginApproach: () => void;
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
  mode: "walking",
  runCount: 0,
  catPosition: new Vector3(),
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
    set((state) => ({
      mode: "walking",
      runCount: state.runCount + 1,
      currentStationIndex: 0,
      isNearStation: false,
    }));
  },
});
