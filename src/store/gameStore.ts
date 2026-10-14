import { create } from "zustand";
import { Vector3 } from "three";

import type { Attempt } from "@/types/puzzle";
import { EMPTY_ATTEMPT, startAttemptAt } from "@/utils/puzzle/attempt";

export type PuzzleFeedback = {
  dragPoint: Vector3;
};

type GameState = {
  catPosition: Vector3;
  puzzleFeedback: PuzzleFeedback;
  activeLevelIndex: number | null;
  attempt: Attempt;
  pressNode: (levelIndex: number, nodeId: number) => void;
};

export const useGameStore = create<GameState>()((set) => ({
  catPosition: new Vector3(),
  puzzleFeedback: {
    dragPoint: new Vector3(),
  },
  activeLevelIndex: null,
  attempt: EMPTY_ATTEMPT,

  pressNode: (levelIndex, nodeId) => {
    set({ activeLevelIndex: levelIndex, attempt: startAttemptAt(nodeId) });
  },
}));
