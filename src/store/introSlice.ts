import type { StateCreator } from "zustand";

import type { GameState } from "@/store/gameStore";
import type { IntroBeat } from "@/types/intro";

export type IntroSlice = {
  introBeat: IntroBeat | null;
  startIntro: () => void;
};

export const createIntroSlice: StateCreator<GameState, [], [], IntroSlice> = (
  set,
) => ({
  introBeat: null,

  startIntro: () => set({ introBeat: "flyIn" }),
});
