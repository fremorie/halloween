import type { StateCreator } from "zustand";

import type { GameState } from "@/store/gameStore";
import type { FinaleBeat } from "@/types/finale";
import { FINALE_BEAT_ORDER } from "@/settings/finaleSettings";

export type FinaleSlice = {
  finaleBeat: FinaleBeat | null;
  startFinale: () => void;
  advanceFinaleBeat: () => void;
};

export const createFinaleSlice: StateCreator<GameState, [], [], FinaleSlice> = (
  set,
  get,
) => ({
  finaleBeat: null,

  startFinale: () => {
    get().resetCurrentPuzzle();
    set({ mode: "finale", finaleBeat: FINALE_BEAT_ORDER[0] });
  },

  advanceFinaleBeat: () => {
    const { finaleBeat } = get();

    if (finaleBeat === null) {
      return;
    }

    const nextBeat =
      FINALE_BEAT_ORDER[FINALE_BEAT_ORDER.indexOf(finaleBeat) + 1];

    if (nextBeat === undefined) {
      return;
    }

    set({ finaleBeat: nextBeat });
  },
});
