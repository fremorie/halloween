import { create } from "zustand";

import { createJourneySlice, type JourneySlice } from "@/store/journeySlice";
import { createPuzzleSlice, type PuzzleSlice } from "@/store/puzzleSlice";
import { createRewardSlice, type RewardSlice } from "@/store/rewardSlice";
import { createIntroSlice, type IntroSlice } from "@/store/introSlice";
import { createSoundSlice, type SoundSlice } from "@/store/soundSlice";

export type GameState = JourneySlice &
  PuzzleSlice &
  RewardSlice &
  IntroSlice &
  SoundSlice;

export const useGameStore = create<GameState>()((...storeApi) => ({
  ...createJourneySlice(...storeApi),
  ...createPuzzleSlice(...storeApi),
  ...createRewardSlice(...storeApi),
  ...createIntroSlice(...storeApi),
  ...createSoundSlice(...storeApi),
}));
