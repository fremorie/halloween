import type { StateCreator } from "zustand";

import type { GameState } from "@/store/gameStore";
import type { IntroBeat } from "@/types/intro";
import { INTRO_BEAT_ORDER } from "@/settings/introSettings";

export type IntroSlice = {
  introBeat: IntroBeat | null;
  startIntro: () => void;
  advanceIntroBeat: () => void;
};

export const createIntroSlice: StateCreator<GameState, [], [], IntroSlice> = (
  set,
  get,
) => ({
  introBeat: null,

  startIntro: () => set({ introBeat: "flyIn" }),

  advanceIntroBeat: () => {
    const { introBeat } = get();
    if (introBeat === null) {
      return;
    }
    const nextBeat = INTRO_BEAT_ORDER[INTRO_BEAT_ORDER.indexOf(introBeat) + 1];
    if (nextBeat === undefined) {
      return;
    }

    set({ introBeat: nextBeat });
  },
});
