import { create } from "zustand";

import { createJourneySlice, type JourneySlice } from "@/store/journeySlice";
import { createPuzzleSlice, type PuzzleSlice } from "@/store/puzzleSlice";

export type GameState = JourneySlice & PuzzleSlice;

export const useGameStore = create<GameState>()((...storeApi) => ({
  ...createJourneySlice(...storeApi),
  ...createPuzzleSlice(...storeApi),
}));
